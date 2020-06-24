import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "./token.service";
import {HttpRequester} from "../../services/request";
import {NotifyService} from "../../services/notify/notify.service";
import {CoverService} from '../../components/cover/cover.service';
import {User} from '../../models/user/user';

let isLogin = false;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isFromAutoLogin: boolean;

  get isLogin() {
    return isLogin;
  }

  get isNewUser() {
    return !this.user.nickname;
  }

  protected user: User;

  constructor(
    private cover: CoverService,
    private token: TokenService,
    private http: HttpRequester,
    private notify: NotifyService,
    private router: Router,
  ) {
  }

  get() {
    return this.user;
  }

  set(user: User) {
    this.user = user;
  }

  async autoLogin() {
    this.isFromAutoLogin = true;
    return this.token.verify(this.handleLoginSuccess);
  }

  handleLoginSuccess = (resp) => {
    isLogin = true;

    this.token.setToken(resp.data);
    this.user = resp.data.user;

    if (this.isFromAutoLogin) {
      this.cover.open();
    }

    setTimeout(() => {
      if (this.isNewUser) {
        this.router.navigateByUrl('/auth/logon');
      } else {
        this.router.navigateByUrl('/game/home');
      }
    });

    return resp;
  };

  handleLoginError = (resp) => {
    this.notify.tip(resp.error.message);
    throw resp;
  };

  login(username: string, password: string) {
    this.isFromAutoLogin = false;
    return this.http.post('/api/login/', {username, password}, {
      asFormUrlencoded: true,
    }).then(this.handleLoginSuccess, this.handleLoginError);
  }

  logon(username: string, password: string) {
    this.isFromAutoLogin = false;
    return this.http.post('/api/logon/', {username, password}, {
      asFormUrlencoded: true,
    }).then(this.handleLoginSuccess, this.handleLoginError);
  }

  logout() {
    localStorage.removeItem('tokens');
    location.reload();
  }
}

export class UserExp {
  constructor(public lv: number, public exp: number) {
  }
}
