import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {MatButtonModule} from "@angular/material/button";
import {PlayerLoginPage} from './登录.component';
import {DialogShellModule, PlayerLoginModule} from "@common/werewolves";

@NgModule({
  declarations: [PlayerLoginPage],
  imports: [
    CommonModule,
    DialogShellModule,
    RouterModule.forChild([
      {
        path: '',
        component: PlayerLoginPage,
      }
    ]),
    MatButtonModule,
    PlayerLoginModule,
  ],
})
export class PlayerLoginPageModule {
}
