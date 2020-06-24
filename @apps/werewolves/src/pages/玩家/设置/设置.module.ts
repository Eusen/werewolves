import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";

import {PlayerSettings} from './设置.component';
import {DialogShellModule} from "@common/werewolves";

@NgModule({
  declarations: [PlayerSettings],
  imports: [
    CommonModule,
    DialogShellModule,
    RouterModule.forChild([
      {
        path: '',
        component: PlayerSettings,
      }
    ])
  ]
})
export class PlayerSettingsPageModule {
}
