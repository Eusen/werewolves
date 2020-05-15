import { Injectable } from '@angular/core';

export interface Player {
  name?: string;
}


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  currentUser;

  constructor() { }
}
