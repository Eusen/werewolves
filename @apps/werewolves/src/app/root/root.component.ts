import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CoreService} from "@common/werewolves";

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RootComponent implements OnInit {

  constructor(public core: CoreService) {
    const login = this.core.createLoading([
      {
        name: '正在检查登录状态',
        handler: () => new Promise<any>(resolve => {
          this.core.utils.delay(1500, () => {
            this.core.user.autoLogin().then(isLogin => {
              if (isLogin) {
              } else {
                this.core.router.forward(this.core.R.routes.login);
              }
              resolve();
            });
          });
        }),
      }
    ]);

    login.run(false);
  }

  ngOnInit() {
  }
}
