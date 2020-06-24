import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../services-game/user/user.service";
import {UtilsService} from "../utils/utils.service";
import {CoverService} from "../../components/cover/cover.service";

let WantedRoutes: string[] = [];

export class DialogProxy {
  title: string;

  dismiss: (result?: any) => void;
  getParam: (key: string) => string;

  pageInit() {}
}

@Injectable({
  providedIn: 'root'
})
export class RouterInterceptor implements CanActivateChild, CanDeactivate<any> {
  protected canDeactivateFn: (currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot) => boolean;

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private user: UserService,
    private utils: UtilsService,
    private cover: CoverService,
  ) {
  }

  forward(path: string, queryParams?: any) {
    return this.router.navigateByUrl(path, {queryParams});
  }

  backward() {
    history.back();
  }

  wantedForward(path: string) {
    WantedRoutes.push(path);
  }

  wantedBackward(fn: (currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot) => boolean) {
    this.canDeactivateFn = fn;
  }

  release(path: string) {
    WantedRoutes = WantedRoutes.filter(r => r !== path);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!state.url.startsWith('/auth') && !this.user.isLogin) {
      this.utils.doc.defaultView.location.href = '';
      return false;
    }

    const component = childRoute.component as any;
    const route = !!component && (WantedRoutes.filter(r => state.url.startsWith(r))[0]);

    if (route) {
      const ref = this.matDialog.open(childRoute.component as any, {
        hasBackdrop: false,
        autoFocus: false,
        disableClose: false,
        closeOnNavigation: false,
        panelClass: 'dialog-page',
        data: {
          childRoute,
          state,
        },
      });

      ref.updateSize(this.utils.width, this.utils.height);

      const dialog = ref.componentInstance as DialogProxy;

      dialog.dismiss = (result) => {
        ref.close(result);
      };

      dialog.getParam = (key) => {
        return childRoute.params[key];
      }

      dialog.pageInit();
    }

    return !route;
  }

  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isBackAble = true;
    if (this.canDeactivateFn) isBackAble = this.canDeactivateFn(currentRoute, currentState, nextState);
    return isBackAble;
  }
}
