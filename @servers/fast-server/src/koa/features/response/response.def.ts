import {ParameterizedContext} from "koa";
import * as Router from "koa-router";
import * as Koa from "koa";

export interface CommonResponseList<T> {
  count?: number;
  pageIndex?: number;
  pageSize?: number;
  results?: T[];
}

export interface CommonResponse<T> {
  state?: boolean;
  statusCode?: number;
  message?: string;
  dataset?: CommonResponseList<T>;
  data?: T;
}

export class Responser {
  static try(callback: Router.IMiddleware<any, any>) {
    return async (context: ParameterizedContext, next?: Koa.Next) => {
      try {
        await callback(context, next);
      } catch (err) {
        this.throw(context, {statusCode: 500, message: err.message});
      }
    }
  }

  static throw(context: ParameterizedContext, opts: {
    statusCode?: number;
    message?: string;
    data?: any;
  }) {
    context.body = {
      state: false,
      ...opts,
    };
    context.status = context.body.statusCode;
  }

  static error<T = any>(opts: {
    statusCode: number;
    message?: string;
    data?: any;
  }): CommonResponse<T> {
    return {
      state: false,
      ...opts,
    }
  }

  static ok(context: ParameterizedContext, opts: {
    statusCode?: number;
    message?: string;
    dataset?: CommonResponseList<any>;
    data?: any;
  }) {
    context.body = {
      state: true,
      statusCode: 200,
      message: 'success',
      ...opts,
    };
    context.status = context.body.statusCode;
  }

  static success<T = any>(opts: {
    statusCode?: number;
    message?: string;
    dataset?: CommonResponseList<any>;
    data?: any;
  } = {}): CommonResponse<T> {
    return {
      state: true,
      statusCode: 200,
      message: 'success',
      ...opts,
    }
  }
}
