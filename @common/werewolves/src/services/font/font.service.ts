import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FontService {
  private readonly fontStyle: HTMLStyleElement;
  private styles: {root: string[]; [key: string]: string[]} = {} as any;

  constructor() {
    if (!this.fontStyle) {
      this.fontStyle = document.createElement("style");
      document.head.appendChild(this.fontStyle);
    }
  }

  private refreshFontStyle() {
    let style = [];
    Object.keys(this.styles).forEach(key => {
      const family = buildFontFamily(this.styles[key]);
      if (key === 'root') {
        style.push(`body {font-family: ${family}; --root-font-family: ${family};`);
      } else {
        style.push(`${key} {font-family: ${family};}`);
      }
    });
    this.fontStyle.innerHTML = style.join('\n');
  }

  setRootFontFamily(...fonts: string[]) {
    this.styles.root = fonts;
    this.refreshFontStyle();
  }

  setFontFamily(classOrElement: string | HTMLElement, ...fonts: string[]) {
    if (typeof classOrElement === "string") {
      this.styles[classOrElement] = fonts;
      this.refreshFontStyle();
    } else {
      classOrElement.style.fontFamily = buildFontFamily(fonts);
    }
  }

  installPair(pair: {name?: string; url?: string}) {
    this.install(pair.name, pair.url);
  }

  install(id: string, fontPath: string) {
    let link: HTMLLinkElement = document.querySelector(`#${id}`);
    if (link) {
      link.href = fontPath;
    } else {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.id = id;
      link.href = fontPath;
      document.head.appendChild(link);
    }
  }

  uninstall(id: string) {
    const link: HTMLLinkElement = document.querySelector(`#${id}`);
    link.parentNode.removeChild(link);
  }
}

function buildFontFamily(fontNames: string[]) {
  return [...fontNames, 'serif'].map(name => {
    // 有些名字是全大写的
    if (buildFontFamily.uppers.includes(name)) return name.toUpperCase();

    if (name.includes('_')) {
      name = name.split('_').map(chuck => Aa(chuck)).join(' ');
    }

    return Aa(name);
  }).join(', ');
}

buildFontFamily.uppers = ['sc', 'zcool'];

function Aa(chuck: string) {
  return chuck[0].toUpperCase() + chuck.substring(1).toLowerCase();
}
