import {Injectable} from '@angular/core';

export interface CommonMenuItem {
  title?: string;
  icon?: string;
  handler?: (...args) => any;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor() {
  }

  create(menus: CommonMenuItem[]) {
    return menus;
  }
}
