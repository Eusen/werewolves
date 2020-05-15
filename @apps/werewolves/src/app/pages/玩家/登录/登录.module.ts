import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayerLoginPage} from './登录.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [PlayerLoginPage],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PlayerLoginPage,
      }
    ])
  ]
})
export class PlayerLoginPageModule {
}
