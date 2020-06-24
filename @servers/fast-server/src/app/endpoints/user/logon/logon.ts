import {CommonResponse, Endpoint, KoaContext, Responser} from "../../../../koa";
import {UserModel} from "../../../models";
import {LoginEndpoint} from '../login/login';

export class LogonEndpoint extends Endpoint {
  path: string | RegExp = '/logon/';
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
    const result = this.validate(params, this.paramsValidates);

    if (result) {
      console.log('result', result);
      return Responser.error({data: result, statusCode: 401});
    }

    try {
      const userModel = context.model.getModel(UserModel);

      const user = await userModel.findOne({
        where: {
          username: params.username,
        },
      });

      // 如果不存在，则创建一个新的，注册可以当成登录
      if (!user) {
        await userModel.create({
          username: params.username,
          password: params.password,
        });
      }

      return await new LoginEndpoint().post(context);
    } catch (err) {
      return Responser.error({data: err.message, statusCode: 401});
    }
  }
}
