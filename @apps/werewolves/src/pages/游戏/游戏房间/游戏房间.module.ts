import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameRoomComponent} from './游戏房间.component';
import {RouterModule} from "@angular/router";
import {DialogShellModule, PlayerAvatarModule} from "@common/werewolves";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    GameRoomComponent
  ],
  imports: [
    CommonModule,
    DialogShellModule,
    PlayerAvatarModule,
    RouterModule.forChild([
      {
        path: '',
        component: GameRoomComponent,
      }
    ]),
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule
  ]
})
export class GameRoomModule {
}
