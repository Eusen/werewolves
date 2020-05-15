import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Platform} from "@angular/cdk/platform";

@Injectable({
  providedIn: 'root'
})
export class RouterInterceptor implements CanActivateChild {
  constructor(
    private matDialog: MatDialog,
    private platform: Platform,
    ) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.platform.isBrowser && childRoute.component) {
      this.matDialog.open(childRoute.component as any, {
        hasBackdrop: false,
        autoFocus: false,
        disableClose: false,
        data: {
          childRoute,
          state,
        },
        maxHeight: '100vh',
        minHeight: '100vh',
        maxWidth: '100vw',
        minWidth: '100vw',
        panelClass: 'full-screen'
      });
      return false;
    }
    return true;
  }
}
