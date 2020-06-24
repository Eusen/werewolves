import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatSnackBarConfig} from "@angular/material/snack-bar/snack-bar-config";

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  constructor(
    private snackBar: MatSnackBar,
  ) {
  }

  tip(message: string, action?: string, config?: MatSnackBarConfig) {
    return this.snackBar.open(message, action, Object.assign({
      duration: 3000,
      verticalPosition: 'top',
    }, config));
  }
}
