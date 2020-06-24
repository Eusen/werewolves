import {Injectable} from '@angular/core';
import {UtilsService} from "../../services/utils/utils.service";
import {HttpRequester, RequestInterceptor, HttpRequestOptions} from "../../services/request";

@Injectable({
  providedIn: 'root'
})
export class TokenService implements RequestInterceptor {
  readonly id = this.utils.generateRandomToken();
  readonly priority = 0;

  accessToken: string;
  refreshToken: string;

  private clientId: string;

  constructor(
    private http: HttpRequester,
    private utils: UtilsService,
  ) {
    // 因为本服务实现了请求拦截的功能，所以直接将服务注入即可
    this.http.setRequestInterceptor(this);
  }

  intercept(opts: HttpRequestOptions): HttpRequestOptions {
    if (this.accessToken) {
      opts.headers = opts.headers || {};
      opts.headers['Authorization'] = `Bearer ${this.accessToken}`;
    }
    return opts;
  }

  async verify(callback?: (resp) => void) {
    if (!this.load()) return false;

    try {
      const token = await this.http.post('/oauth/authorise/', null, {asFormUrlencoded: true});
      callback && callback(token);
      return true;
    } catch (err1) {
      try {
        const newToken = await this.http.post('/oauth/token/', {
          grant_type: 'refresh_token',
          client_id: this.clientId,
          refresh_token: this.refreshToken,
        }, {asFormUrlencoded: true});
        callback && callback(newToken);
        return true;
      } catch (err2) {
        // 这里不需要处理什么，直接让下面 return false 就可以了
      }
    }

    return false;
  }

  setToken(token) {
    this.accessToken = token.accessToken;
    this.refreshToken = token.refreshToken;
    localStorage.setItem('tokens', JSON.stringify({
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      clientId: token.user.username,
    }));
  }

  load() {
    const tokenStr = localStorage.getItem('tokens');
    if (tokenStr) {
      const token = JSON.parse(tokenStr);
      this.accessToken = token.accessToken;
      this.refreshToken = token.refreshToken;
      this.clientId = token.clientId;
    }
    return !!tokenStr;
  }

}
