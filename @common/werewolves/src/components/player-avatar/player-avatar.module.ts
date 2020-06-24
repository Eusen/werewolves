import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayerAvatarComponent} from './player-avatar.component';

@NgModule({
  declarations: [PlayerAvatarComponent],
  exports: [PlayerAvatarComponent],
  imports: [
    CommonModule,
  ]
})
export class PlayerAvatarModule {
}
