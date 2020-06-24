import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {RoomCardComponent} from './room-card.component';
import {PlayerAvatarModule} from "../player-avatar";
import {PlayerGenderModule} from "../player-gender";
import {PlayerIncarnationModule} from "../player-incarnation";

@NgModule({
  declarations: [RoomCardComponent],
  exports: [RoomCardComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    PlayerAvatarModule,
    PlayerGenderModule,
    PlayerIncarnationModule,
  ]
})
export class RoomCardModule {
}
