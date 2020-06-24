import {Inject, Injectable, NgZone} from '@angular/core';
import {Platform} from '@ionic/angular'
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class PlatformService extends Platform {
  constructor(@Inject(DOCUMENT) doc, ngZone: NgZone) {
    super(doc, ngZone);
  }

  height() {
    return document.body.clientHeight;
  }

  width() {
    return document.body.clientWidth;
  }
}
