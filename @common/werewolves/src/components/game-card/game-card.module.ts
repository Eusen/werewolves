import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameCardComponent} from "./game-card.component";

@NgModule({
  declarations: [
    GameCardComponent
  ],
  exports: [
    GameCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GameCardModule {
}
