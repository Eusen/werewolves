import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {Requester, RequestMethod, RequestOptions} from "../request";
import {CommonResponse} from "../response";

export type HttpObserve = 'body' | 'events' | 'response';

export interface HttpRequestOptions extends RequestOptions {
  observe?: HttpObserve;
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  withCredentials?: boolean;
  asFormUrlencoded?: boolean;
  asFormData?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class HttpRequester<UniType = any> extends Requester<HttpRequestOptions> {
  constructor(private httpClient: HttpClient) {
    super();
  }

  createSubRequester<SubType = any>(host: string) {
    const requester = new HttpRequester<SubType>(this.httpClient);
    requester.host = host;
    return requester;
  }

  request<T = UniType>(opts: HttpRequestOptions): Promise<CommonResponse<T>> {
    return new Promise<CommonResponse<T>>((resolve, reject) => {
      if (opts.endpoint.startsWith('/')) {
        opts.endpoint = opts.endpoint.substring(1);
      }

      opts = this.runRequestInterceptors(opts);
      const host = opts.host || this.host || '';

      if (opts.asFormUrlencoded) {
        opts.headers = Object.assign(opts.headers || {}, {
          'Content-Type': 'application/x-www-form-urlencoded',
        });
      }

      this.httpClient.request(opts.method, `${host}/${opts.endpoint}`, {
        ...shuntData(opts.method, opts.data, opts.asFormUrlencoded, opts.asFormData),
        headers: opts.headers,
        responseType: opts.responseType,
        reportProgress: opts.reportProgress,
        withCredentials: opts.withCredentials,
      }).pipe(catchError(err => {
        this.runErrorHandlers(err);
        return throwError(err);
      })).subscribe((value) => {
        resolve(value);
      }, err => {
        reject(err);
      });
    });
  }

  delete<T = UniType>(endpoint: string, params?, options?: HttpRequestOptions) {
    return this.request<T>({
      method: "DELETE",
      data: params,
      endpoint,
      ...options,
    });
  };

  get<T = UniType>(endpoint: string, params?, options?: HttpRequestOptions) {
    return this.request<T>({
      method: "GET",
      data: params,
      endpoint,
      ...options,
    });
  };

  head<T = UniType>(endpoint: string, params?, options?: HttpRequestOptions) {
    return this.request<T>({
      method: "HEAD",
      data: params,
      endpoint,
      ...options,
    });
  };

  options<T = UniType>(endpoint: string, params?, options?: HttpRequestOptions) {
    return this.request<T>({
      method: "DELETE",
      data: params,
      endpoint,
      ...options,
    });
  };

  patch<T = UniType>(endpoint: string, body?, options?: HttpRequestOptions) {
    return this.request<T>({
      method: "PATCH",
      data: body,
      endpoint,
      ...options,
    });
  };

  post<T = UniType>(endpoint: string, body?, options?: HttpRequestOptions) {
    return this.request<T>({
      method: "POST",
      data: body,
      endpoint,
      ...options,
    });
  };

  put<T = UniType>(endpoint: string, body?, options?: HttpRequestOptions) {
    return this.request<T>({
      method: "PUT",
      data: body,
      endpoint,
      ...options,
    });
  };
}

function shuntData(method: RequestMethod, data, asFormUrlencoded: boolean, asFormData: boolean) {
  if (!data) return {};

  switch (method) {
    case "POST":
    case "PUT":
    case "PATCH":

      if (asFormUrlencoded) {
        data = Object.keys(data).reduce((values, key) => {
          values.push(`${key}=${data[key]}`);
          return values;
        }, []).join('&');
      } else if (asFormData) {
        data = Object.keys(data).reduce((formData, key) => {
          formData.append(key, data[key]);
          return formData;
        }, new FormData());
      }

      return {
        body: data
      };
    default:
      return {
        params: data
      }
  }
}
