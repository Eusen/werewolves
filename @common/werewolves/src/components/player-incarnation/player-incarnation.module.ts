import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayerIncarnationComponent} from './player-incarnation.component';

@NgModule({
  declarations: [
    PlayerIncarnationComponent
  ],
  exports: [
    PlayerIncarnationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PlayerIncarnationModule {
}
