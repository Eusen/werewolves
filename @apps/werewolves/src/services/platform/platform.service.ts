import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Platform} from '@angular/cdk/platform';

@Injectable({
  providedIn: 'root'
})
export class PlatformAgent {
  isServerSide: boolean;
  isClientSide: boolean;
  width: number;
  height: number;

  get body() {
    return this.document.body;
  }

  get window() {
    return this.document.defaultView;
  }

  get isMobileWeb() {
    return this.plt.isBrowser && (this.plt.ANDROID || this.plt.IOS);
  }

  constructor(
    @Inject(DOCUMENT) public document: Document,
    private plt: Platform
  ) {
    this.isClientSide = this.plt.isBrowser;
    this.isServerSide = !this.isClientSide;

    if (this.isClientSide) {
      this.initClientSide();
    } else {
      this.initServerSide();
    }
  }

  private initClientSide() {
    const resize = () => {
      this.width = this.body.clientWidth;
      this.height = this.body.clientHeight;

      console.log(this.plt);
    };

    resize();

    this.window.addEventListener('resize', resize);

    // 注入字体样式
    const fontLinks = ['/assets/fonts/fonts.css'];

    if (this.window.navigator.onLine) {
      fontLinks.push('https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap');
      fontLinks.push('https://fonts.googleapis.com/icon?family=Material+Icons');
    } else {
      fontLinks.push('/assets/google-fonts/google-fonts.css');
    }

    fontLinks.forEach(fontLink => {
      const link = this.document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontLink;
      this.document.head.appendChild(link);
    });
  }

  private initServerSide() {
  }
}
