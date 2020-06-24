import {CommonResponse} from "./response";

export type RequestMethod = 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT';

export interface RequestOptions {
  host?: string;
  endpoint?: string
  data?: any;
  method?: RequestMethod;
}

export enum RequestInterceptorPriority {
  High,
  Normal,
  Low
}

export interface RequestInterceptor<Opts = RequestOptions> {
  id: string | number;
  priority: RequestInterceptorPriority;

  intercept(opts: Opts): Opts;
}

export interface ErrorHandler<ResponseType> {
  id: number;

  (resp: ResponseType): void;
}

export abstract class Requester<Opts = RequestOptions> {
  protected static interceptors: { [priority: string]: RequestInterceptor<any>[] } = {};
  protected static errorHandlers: ErrorHandler<any>[] = [];
  protected _host: string;

  get host() {
    return this._host;
  }

  set host(host: string) {
    this._host = host.endsWith('/') ? host.substring(0, host.length - 1) : host;
  }

  abstract createSubRequester(host: string): Requester;

  abstract request<T>(opts: Opts): Promise<CommonResponse<T>>;

  delete?<T>(endpoint: string, params?, opts?: Opts): Promise<CommonResponse<T>>;

  get?<T>(endpoint: string, params?, opts?: Opts): Promise<CommonResponse<T>>;

  head?<T>(endpoint: string, params?, opts?: Opts): Promise<CommonResponse<T>>;

  options?<T>(endpoint: string, params?, opts?: Opts): Promise<CommonResponse<T>>;

  patch?<T>(endpoint: string, body?, opts?: Opts): Promise<CommonResponse<T>>;

  post?<T>(endpoint: string, body?, opts?: Opts): Promise<CommonResponse<T>>;

  put?<T>(endpoint: string, body?, opts?: Opts): Promise<CommonResponse<T>>;

  protected runRequestInterceptors(resp: Opts) {
    const {interceptors} = Requester;
    Object.keys(interceptors).forEach(priority => {
      const _interceptors = interceptors[priority];
      _interceptors.forEach(interceptor => {
        resp = interceptor.intercept(resp);
      });
    });
    return resp;
  }

  setRequestInterceptor(interceptor: RequestInterceptor<Opts>, priority: RequestInterceptorPriority = RequestInterceptorPriority.Normal) {
    if (!interceptor.id) throw new Error('RequestInterceptor 必须填充一个唯一的 id');

    const {interceptors} = Requester;
    let _interceptors = interceptors[priority];

    if (!_interceptors) _interceptors = interceptors[priority] = [];

    interceptor.priority = priority;

    if (_interceptors.filter(i => i.id === interceptor.id).length === 0) {
      _interceptors.push(interceptor);
    }

    return interceptor;
  }

  clearRequestInterceptor(interceptor: RequestInterceptor) {
    const {interceptors} = Requester;
    interceptors[interceptor.priority] = interceptors[interceptor.priority].filter(i => i.id !== interceptor.id);
  }

  protected runErrorHandlers(err) {
    const {errorHandlers} = Requester;
    errorHandlers.forEach(errorHandler => {
      errorHandler(err);
    });
  }

  setErrorHandler<ResponseType>(errorHandler: ErrorHandler<ResponseType>) {
    if (!errorHandler.id) throw new Error('ErrorHandler 必须填充一个唯一的 id');

    const {errorHandlers} = Requester;

    if (errorHandlers.filter(eh => eh.id === errorHandler.id).length === 0) {
      errorHandlers.push(errorHandler);
    }
    return errorHandler;
  }

  clearErrorHandler(errorHandler: ErrorHandler<any>) {
    let {errorHandlers} = Requester;
    Requester.errorHandlers = errorHandlers.filter(e => e.id === errorHandler.id);
  }
}
