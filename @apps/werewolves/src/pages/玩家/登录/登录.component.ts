import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {CoreService, DialogProxy} from '@common/werewolves';

@Component({
  selector: 'player-login-page',
  templateUrl: './登录.component.html',
  styleUrls: ['./登录.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlayerLoginPage extends DialogProxy implements OnInit, AfterViewInit {
  @ViewChild('actionsTemplateRef') actionsTemplateRef: TemplateRef<any>;

  constructor(public core: CoreService) {
    super();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.core.cover.setTemplateRef(this.actionsTemplateRef);
    });
  }

  async login() {
    await this.core.cover.open();
  }

  async logon() {
    await this.core.cover.open();
    this.dismiss();
  }

  loginSuccess() {
    this.dismiss();
  }
}
