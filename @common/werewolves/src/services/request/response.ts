import {InjectionToken} from "@angular/core";

export const WebsocketRequestToken = new InjectionToken<string>('WebsocketRequestToken');
export const WebsocketResponseToken = new InjectionToken<string>('WebsocketResponseToken');

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

