import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {PlayerProfileModule} from "@common/werewolves";
import {PlayerLogonPage} from './注册.component';

@NgModule({
  declarations: [
    PlayerLogonPage
  ],
  imports: [
    CommonModule,
    PlayerProfileModule,
    RouterModule.forChild([
      {
        path: '',
        component: PlayerLogonPage,
      }
    ]),
  ]
})
export class PlayerLogonPageModule {
}
