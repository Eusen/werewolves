import * as Router from "koa-router";
import {Responser} from "../..";

export class RouterDefiner {
  static create(router: Router) {
    return new RouterDefiner(router);
  }

  protected constructor(private router: Router) {
  }

  all(path: (string | RegExp | (string | RegExp)[]), middleware: Router.IMiddleware) {
    this.router.all(path, Responser.try(middleware));
    return this;
  }

  delete(path: (string | RegExp | (string | RegExp)[]), middleware: Router.IMiddleware) {
    this.router.delete(path, Responser.try(middleware));
    return this;
  }

  get(path: (string | RegExp | (string | RegExp)[]), middleware: Router.IMiddleware) {
    this.router.get(path, Responser.try(middleware));
    return this;
  }

  head(path: (string | RegExp | (string | RegExp)[]), middleware: Router.IMiddleware) {
    this.router.head(path, Responser.try(middleware));
    return this;
  }

  link(path: (string | RegExp | (string | RegExp)[]), middleware: Router.IMiddleware) {
    this.router.link(path, Responser.try(middleware));
    return this;
  }

  options(path: (string | RegExp | (string | RegExp)[]), middleware: Router.IMiddleware) {
    this.router.options(path, Responser.try(middleware));
    return this;
  }

  patch(path: (string | RegExp | (string | RegExp)[]), middleware: Router.IMiddleware) {
    this.router.patch(path, Responser.try(middleware));
    return this;
  }

  post(path: (string | RegExp | (string | RegExp)[]), middleware: Router.IMiddleware) {
    this.router.post(path, Responser.try(middleware));
    return this;
  }

  put(path: (string | RegExp | (string | RegExp)[]), middleware: Router.IMiddleware) {
    this.router.put(path, Responser.try(middleware));
    return this;
  }

  unlink(path: (string | RegExp | (string | RegExp)[]), middleware: Router.IMiddleware<any, {}>) {
    this.router.unlink(path, Responser.try(middleware));
    return this;
  }
}
