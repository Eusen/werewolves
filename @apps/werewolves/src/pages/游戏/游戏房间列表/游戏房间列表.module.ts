import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameRoomListComponent} from './游戏房间列表.component';
import {RouterModule} from "@angular/router";
import {DialogShellModule, RoomCardModule} from "@common/werewolves";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    GameRoomListComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: GameRoomListComponent,
      }
    ]),
    CommonModule,
    DialogShellModule,
    RoomCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
})
export class GameRoomListModule {
}
