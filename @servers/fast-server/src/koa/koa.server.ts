import * as Koa from "koa";
import {ParameterizedContext} from "koa";
import * as KoaRouter from "koa-router";
import * as KoaCORS from "@koa/cors";

import * as Http from 'http';
import {WebsocketServer} from "../webscoket/websocket.server";
import {ServerOptions as WSOptions} from "socket.io";
import {ListenOptions} from "net";
import {SequelizeAgent, SequelizeOptions} from "../orm";
import {EndpointManager, KoaEndpointClass} from "./features/endpoint/endpoint";
import {OAuthServerProxy} from "./features/oauth";
import {KoaBodyOptions, KoaBodyProxy} from "./features/body/body";
import {Responser} from "./features/response/response.def";

export interface KoaServerOptions {
  endpoints?: KoaEndpointClass<any>[],
  sequelize?: SequelizeOptions;
  websocket?: WSOptions;
  body?: KoaBodyOptions;
}

export interface KoaServerStartOptions extends ListenOptions {
  disableTip?: boolean;
}

export interface KoaDefaultState {
}

export interface KoaDefaultContext {
  model: SequelizeAgent;
  oauth2: OAuthServerProxy;
  ws: WebsocketServer;
}

export type KoaContext = ParameterizedContext<KoaDefaultState, KoaDefaultContext>;

export class KoaServer {
  koa: Koa<KoaDefaultState, KoaDefaultContext>;
  http: Http.Server;
  websocket: WebsocketServer;
  endpointManager = new EndpointManager();

  protected sequelize: SequelizeAgent;
  protected oauth2: OAuthServerProxy;
  protected body: KoaBodyProxy;

  static create(opts: KoaServerOptions) {
    return new KoaServer(opts);
  }

  protected constructor(private opts: KoaServerOptions) {
    this.init();
  }

  protected async init() {
    this.koa = new Koa();
    // 处理意外错误
    this.koa.use(async function (context, next) {
      try {
        await next();
      } catch (err) {
        Responser.throw(context, {
          statusCode: 500,
          message: err.message
        });
      }
    });

    this.koa.use(KoaCORS({
      allowMethods: ['GET','HEAD','POST','DELETE','PATCH'],
    }));

    this.http = Http.createServer(this.koa.callback());
    this.body = KoaBodyProxy.create(this.koa, this.opts.body);
    this.endpointManager.appendEndpoints(this.opts.endpoints);

    this.koa.context.model = this.sequelize = SequelizeAgent.create(this.opts.sequelize);
    this.koa.context.oauth2 = this.oauth2 = OAuthServerProxy.create(this.sequelize);
    this.koa.context.ws = this.websocket = WebsocketServer.create(this.http, this.opts.websocket);

    await this.sequelize.init();

    const bodyRouter = this.body.getRouter();
    this.setRouter(bodyRouter);

    const oauth2Router = this.oauth2.getRouter();
    this.setRouter(oauth2Router);

    const modelRouter = this.sequelize.getRouter(this.oauth2.authorise);
    this.setRouter(modelRouter);

    const endpointRouter = this.endpointManager.getRouter(this.oauth2.authorise);
    this.setRouter(endpointRouter);
  }

  setRouter(router: KoaRouter) {
    this.koa.use(router.routes());
    this.koa.use(router.allowedMethods());
  }

  start(options: KoaServerStartOptions = {}) {
    return new Promise<void>(resolve => {
      options.host = options.host || '0.0.0.0';
      options.port = options.port || 9621;
      this.http.listen(options, resolve);
    }).then(() => {
      if (!options.disableTip) {
        console.log(`Koa server start at http://${options.host}:${options.port}`);
      }
    });
  }
}
