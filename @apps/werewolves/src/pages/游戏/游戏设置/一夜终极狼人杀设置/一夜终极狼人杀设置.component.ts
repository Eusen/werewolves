import {Component, ViewEncapsulation} from '@angular/core';
import {CoreService, DialogProxy} from "@common/werewolves";

@Component({
  selector: 'game-uwk-settings-page',
  templateUrl: './一夜终极狼人杀设置.component.html',
  styleUrls: ['./一夜终极狼人杀设置.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UwkSettingsComponent extends DialogProxy {

  constructor(public core: CoreService) {
    super();
  }

  pageInit() {
  }

}
