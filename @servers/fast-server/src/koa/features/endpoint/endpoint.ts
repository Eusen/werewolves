import {CommonResponse} from "../response/response.def";
import KoaRouter = require("koa-router");
import * as Validate from 'validate.js';
import {KoaContext} from "../../koa.server";

export type KoaEndpointClass<T extends Endpoint> = typeof Endpoint & { new(): T };

export abstract class Endpoint {
  static instance: Endpoint;
  abstract path: string | RegExp;
  isAuthRequired = true;

  validate(values, validates, options?) {
    return Validate.validate(values, validates, options);
  }

  async all?(context: KoaContext): Promise<CommonResponse<any>>;

  async post?(context: KoaContext): Promise<CommonResponse<any>>;

  async put?(context: KoaContext): Promise<CommonResponse<any>>;

  async get?(context: KoaContext): Promise<CommonResponse<any>>;

  async patch?(context: KoaContext): Promise<CommonResponse<any>>;

  async delete?(context: KoaContext): Promise<CommonResponse<any>>;

  async head?(context: KoaContext): Promise<CommonResponse<any>>;

  async options?(context: KoaContext): Promise<CommonResponse<any>>;

  async link?(context: KoaContext): Promise<CommonResponse<any>>;

  async unlink?(context: KoaContext): Promise<CommonResponse<any>>;
}

export class EndpointManager {
  static HttpMethods = [
    "all",
    "post",
    "put",
    "get",
    "patch",
    "delete",
    "head",
    "options",
    "link",
    "unlink",
  ];

  endpoints: KoaEndpointClass<any>[];

  constructor() {
  }

  getRouter(authorise) {
    const router = new KoaRouter();
    router.prefix('/api');

    this.endpoints.forEach(EndpointClass => {
      if (!EndpointClass.instance) {
        const instance = EndpointClass.instance = new EndpointClass();
        EndpointManager.HttpMethods.forEach(method => {
          if (instance[method]) {
            if (instance.isAuthRequired) {
              router.post('', (context, next) => {
                context.throw();
              })
              router[method](instance.path, authorise, async context => {
                context.body = await EndpointClass.instance[method](context);
                context.status = context.body.statusCode;
              });
            } else {
              router[method](instance.path, async context => {
                context.body = await EndpointClass.instance[method](context);
                context.status = context.body.statusCode;
              });
            }
          }
        })
      }
    });

    return router;
  }

  appendEndpoints(endpoints: KoaEndpointClass<any>[]) {
    this.endpoints = endpoints;
  }
}
