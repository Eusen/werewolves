import {Injectable} from '@angular/core';
import {UtilsService} from "../utils/utils.service";

@Injectable({
  providedIn: 'root'
})
export class HeadService {
  private get headEl() {
    return this.utils.doc.head;
  }

  private readonly titleEl: HTMLTitleElement;
  private readonly baseEl: HTMLBaseElement;
  private readonly metaElMapping: { [key: string]: HTMLMetaElement } = {};

  get base() {
    return this.baseEl.href;
  }

  constructor(
    private utils: UtilsService,
  ) {
    for (let i = 0; i < this.headEl.children.length; i++) {
      const el = this.headEl.children.item(i);
      if (el instanceof HTMLTitleElement) {
        this.titleEl = el;
      } else if (el instanceof HTMLMetaElement) {
        this.metaElMapping[el.name] = el;
      } else if (el instanceof HTMLBaseElement) {
        this.baseEl = el;
      }
    }
  }

  setTitle(title: string) {
    this.titleEl.innerText = title;
  }

  getMeta(name: string) {
    return this.metaElMapping[name];
  }

  getMetaContent(name: string) {
    const meta = this.getMeta(name);
    return meta && meta.content;
  }

  setMetaContent(name: string, content: string) {
    const meta = this.metaElMapping[name] || this.utils.doc.createElement('meta');
    this.metaElMapping[name] = meta;
    meta.content = content;
  }
}
