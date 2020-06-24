import {CommonResponse, Endpoint, KoaContext, Responser} from "../../../../koa";
import OAuthServer = require("oauth2-server");
import {UserModel} from "../../../models";

export class LoginEndpoint extends Endpoint {
  path: string | RegExp = '/login/';
  isAuthRequired = false;
  paramsValidates = {
    username: {
      presence: true,
      length: {
        minimum: 6,
        message: "用户名至少6个字符"
      }
    },
    password: {
      presence: true,
      length: {
        minimum: 6,
        message: "密码至少6个字符"
      }
    }
  };

  async post(context: KoaContext): Promise<CommonResponse<any>> {
    const params = context.request.body;
    const validateResults = this.validate(params, this.paramsValidates);

    if (validateResults) {
      return Responser.error({data: validateResults, statusCode: 401});
    }

    const userModel = context.model.getModel(UserModel);
    const user = await userModel.findOne({
      where: {
        username: params.username,
        password: params.password,
      }
    });

    if (user) {
      // 创建 token 并返回 user
      const resp = await context.oauth2.context.token(
        new OAuthServer.Request({
          body: Object.assign(context.request.body, {
            client_id: params.username,
            client_secret: params.password,
            grant_type: 'password'
          }),
          headers: context.request.headers,
          method: context.request.method,
          query: context.request.query || {},
        }),
        new OAuthServer.Response(context.res),
      );

      return Responser.success({
        statusCode: 200,
        data: {
          accessToken: resp.accessToken,
          refreshToken: resp.refreshToken,
          user: user.toJSON(),
        },
      });
    } else {
      // 返回未注册
      return Responser.error({
        statusCode: 401,
        message: '该账户尚未注册'
      });
    }
  }
}
