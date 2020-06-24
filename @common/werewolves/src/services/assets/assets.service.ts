import {Injectable} from '@angular/core';

export interface AssetsOptions {
  isUrl?: boolean;
  basePath?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  protected _host = '';
  protected _imgRoot = '/assets/imgs/';
  protected _audioRoot = '/assets/audios/';
  protected _fontRoot = '/assets/fonts/';

  get host() {
    return this._host;
  }

  set host(host: string) {
    this._host = host.endsWith('/') ? host.substring(0, host.length - 1) : host;
  }

  createAssets(host: string, options?: {imgRoot: string; audioRoot: string; fontRoot: string;}) {
    const assets = new AssetsService();
    assets.host = host;
    if (options) {
      assets._audioRoot = options.audioRoot;
      assets._imgRoot = options.imgRoot;
      assets._fontRoot = options.fontRoot;
    }
    return assets;
  }

  setImgRoot(path: string) {
    this._imgRoot = path;
  }

  setAudioRoot(path: string) {
    this._audioRoot = path;
  }

  setFontRoot(path: string) {
    this._fontRoot = path;
  }

  playAudio(audio: string) {
    this.playAudios([audio]);
  }

  playAudios(audios: string[]) {
    const randomIndex = audios.length > 1 ? (Math.random() * (audios.length - 1)).toFixed(0) : 0;
    const voice = document.createElement('audio');
    voice.src = audios[randomIndex];
    voice.muted = false;
    voice.play();
  }

  wrapUrl(path: string) {
    return `url(${path})`;
  }

  uri(path: string, options?: AssetsOptions) {
    const uri = [this.host, options?.basePath, path].filter(p => !!p).map(p => removeUnnecessary(p)).join('/')
    return options?.isUrl ? this.wrapUrl(uri) : uri;
  }

  audio(path: string, basePath = this._audioRoot) {
    return this.uri(path, {basePath});
  }

  img(path: string, isUrl?: boolean, basePath = this._imgRoot) {
    return this.uri(path, {isUrl, basePath});
  }

  imgPair(path, basePath = this._imgRoot) {
    return {
      origin: this.img(path, false, basePath),
      url: this.img(path, true, basePath),
    }
  }

  font(path: string, basePath = this._fontRoot) {
    return this.uri(path, {basePath});
  }
}

function removeUnnecessary(url: string) {
  if (url.startsWith('/')) url = url.substring(1);
  if (url.endsWith('/')) url = url.substring(0, url.length - 1);
  return url;
}
