import {Inject, Injectable} from '@angular/core';
import {PlatformService} from "../platform/platform.service";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  get width() {
    return this.plt.is('mobileweb') ? `${this.plt.width()}px` : '500px';
  }

  get height() {
    return this.plt.height() < 568 ? '568px' : `${this.plt.height()}px`;
  }

  constructor(public plt: PlatformService, @Inject(DOCUMENT) public doc: Document) {
  }

  generateRandomToken(length = 32, radix = 16) {
    return new Array(length).fill(radix).map(num => {
      return parseInt((num * Math.random()).toFixed(0), 10).toString(radix).toUpperCase();
    }).join('');
  }

  delay(ms: number, callback?) {
    return new Promise(resolve => {
      setTimeout(() => {
        const isFunction = typeof callback === "function";
        isFunction && callback();
        resolve(isFunction ? null : callback);
      }, ms);
    })
  }

  generateNumber(length = 5, radix = 10) {
    let num = '';
    for (let i = 0; i < length; i++) {
      num += parseInt(`${Math.random() * (radix - 1)}`).toString(radix);
    }
    return num;
  }
}
