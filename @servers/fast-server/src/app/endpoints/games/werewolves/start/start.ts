import {CommonResponse, Endpoint, KoaContext, Responser} from "../../../../../koa";

export class StartEndpoint extends Endpoint {
  path: string | RegExp = '/werewolves-start/';

  async get(context: KoaContext): Promise<CommonResponse<any>> {
    return Responser.success({message: '游戏已启动成功'});
  }
}
