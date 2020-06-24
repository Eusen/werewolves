import OAuthServer = require("oauth2-server");
import KoaRouter = require("koa-router");
import {SequelizeAgent} from "../../../orm";
import {OAuthTokenModel} from "./models/token/token.model";
import {OAuthUserModel} from "./models/user/user.model";
import {OAuthAuthorizationCodeModel} from "./models/authorization-code/authorization-code.model";
import {Responser} from '../response/response.def';

export class OAuthServerProxy {
  context;
  model: OAuthServerModel;

  static create(sequelize: SequelizeAgent) {
    return new OAuthServerProxy(sequelize);
  }

  constructor(private sequelize: SequelizeAgent) {
    this.model = new OAuthServerModel(sequelize);
    this.context = new OAuthServer({
      model: this.model,
      debug: true,
      requireClientAuthentication: {
        refresh_token: false,
      }
    });
  }

  authorise = async (context, next?) => {
    try {
      context.state.token = await this.context.authenticate(
        new OAuthServer.Request({
          body: context.request.body,
          headers: context.request.headers,
          method: context.request.method,
          query: context.request.query || {},
        }),
        new OAuthServer.Response(context.res),
      );

      await next();
    } catch (err) {
      Responser.throw(context, {
        statusCode: err.statusCode,
        message: '无效的令牌'
      });
    }
  }

  getRouter() {
    const router = new KoaRouter();
    router.prefix('/oauth');

    router.post('/authorise/', async (context) => {
      await this.authorise(context, async () => {
        const token = context.state.token;
        // 返回用户信息
        context.body = Responser.success({
          data: {
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            user: token.user.toJSON(),
          }
        });
      });
    });

    router.post('/token/', async (context) => {
      try {
        const token = await this.context.token(
          new OAuthServer.Request({
            body: context.request.body,
            headers: context.request.headers,
            method: context.request.method,
            query: context.request.query || {},
          }),
          new OAuthServer.Response(context.res),
        );

        Responser.ok(context, {
          data: {
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            user: token.user.toJSON(),
          }
        });
      } catch (err) {
        Responser.throw(context, {
          message: err.message,
          statusCode: err.statusCode,
        });
      }
    });
    return router;
  }
}

export class OAuthServerModel {
  constructor(private sequelize: SequelizeAgent) {
  }

  /**
   * 保存授权码
   * @param code 授权码
   * @param client 客户端
   * @param user 用户
   */
  async saveAuthorizationCode(code, client, user) {
    const authorizationCodeModel = this.sequelize.getModel(OAuthAuthorizationCodeModel);
    return authorizationCodeModel.create({
      user: user.id,
      client: client.id,
      authorization_code: code.authorizationCode,
      redirect_uri: code.redirectUri,
      expires_at: code.expiresAt,
    });
  }

  /**
   * 获取访问令牌
   * @param bearerToken
   */
  async getAccessToken(bearerToken: string) {
    if (!bearerToken) throw new Error('未授权');

    const tokenModel = this.sequelize.getModel(OAuthTokenModel);
    const userModel = this.sequelize.getModel(OAuthUserModel)

    const token = await tokenModel.findOne({
      where: {
        access_token: bearerToken
      }
    });

    if (!token) throw new Error('无效的Token');

    const user = await userModel.findOne({
      where: { id: token.user }
    });

    if (!user) throw new Error('该用户不存在');

    return {
      accessToken: token.access_token,
      accessTokenExpiresAt: new Date(token.access_token_expires_at),
      refreshToken: token.refresh_token,
      user,
    };
  }

  /**
   * 获取刷新令牌
   * @param bearerToken
   */
  async getRefreshToken(bearerToken: string) {
    const tokenModel = this.sequelize.getModel(OAuthTokenModel);
    const userModel = this.sequelize.getModel(OAuthUserModel);

    const token = await tokenModel.findOne({
      where: {
        refresh_token: bearerToken
      }
    });

    if (!token)  throw new Error('无效的刷新令牌');

    const user = await userModel.findOne({
      where: {
        id: token.user,
      }
    });

    if (!user) throw new Error('该用户不存在');

    return {
      id: token.id,
      user,
      client: user,
      refreshToken: token.refresh_token,
      refreshTokenExpiresAt: new Date(token.refresh_token_expires_at),
      accessToken: token.access_token,
      accessTokenExpiresAt: new Date(token.access_token_expires_at),
    }
  }

  /**
   * 获取客户端
   * @param clientId 同 username
   * @param clientSecret 同 password
   */
  async getClient(clientId: string, clientSecret: string) {
    const user = await this.getUser(clientId, clientSecret);

    if (!user) return;

    return {
      id: user.id,
      clientId: user.username,
      clientSecret: user.password,
      grants: ['password', 'refresh_token'],
    };
  }

  /**
   * 获取用户
   * @param username 用户名
   * @param password 密码
   */
  async getUser(username: string, password: string) {
    const userModel = this.sequelize.getModel(OAuthUserModel);
    const where = {} as any;
    if (username) where.username = username;
    if (password) where.password = password;

    return userModel.findOne({where});
  }

  /**
   * 从逻辑上看，revokeToken 应该是用来让token失效的，
   * 那我们直接将其删除就可以了。
   */
  async revokeToken(token) {
    const tokenModel = this.sequelize.getModel(OAuthTokenModel);
    return tokenModel.destroy({where: {id: token.id}});
  }

  /**
   * saveToken 与 saveAccessToken 从逻辑上看似乎没有本质区别
   * @param token 令牌
   * @param client 客户端
   * @param user 用户
   */
  async saveToken(token, client, user) {
    return await this.saveAccessToken(token, client, user);
  }

  async saveAccessToken(token, client, user) {
    const tokenModel = this.sequelize.getModel(OAuthTokenModel);

    await tokenModel.create({
      access_token: token.accessToken,
      access_token_expires_at: token.accessTokenExpiresAt,
      refresh_token: token.refreshToken,
      refresh_token_expires_at: token.refreshTokenExpiresAt,
      client: client.id,
      user: user.id,
    });

    return {
      ...token,
      client: client,
      user,
    };
  }
}
