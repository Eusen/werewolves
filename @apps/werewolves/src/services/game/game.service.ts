import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  player;

  constructor(private router: Router) {
  }

  navToLogin() {
    this.router.navigateByUrl('/game-player/login');
  }

  navToLogon() {
    this.router.navigateByUrl('/game-player/logon');
  }

  setting() {
  }
}
