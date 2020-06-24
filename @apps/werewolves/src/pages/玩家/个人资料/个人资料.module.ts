import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayerProfileComponent} from './个人资料.component';
import {RouterModule} from "@angular/router";
import {DialogShellModule} from "@common/werewolves";

@NgModule({
  declarations: [
    PlayerProfileComponent
  ],
  imports: [
    CommonModule,
    DialogShellModule,
    RouterModule.forChild([
      {
        path: '',
        component: PlayerProfileComponent,
      }
    ])
  ]
})
export class PlayerProfileModule {
}
