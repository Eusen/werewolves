import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {PlatformAgent} from '../../../services/platform/platform.service';

@Component({
  selector: 'app-root',
  templateUrl: './主页.component.html',
  styleUrls: ['./主页.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePageComponent implements OnInit {
  constructor(public plt: PlatformAgent, public router: Router) {
  }

  ngOnInit(): void {
  }

  navTo(where: '玩家设置' | '预备大厅') {
    let url = '';
    const params = {};

    switch (where) {
      case '玩家设置':
        url = '/game-player/settings';
        break;
      case '预备大厅':
    }
    this.router.navigateByUrl(url, {
      queryParams: params
    });
  }
}
