import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CoreService, GameType} from "@common/werewolves";

@Component({
  selector: 'game-home',
  templateUrl: './主页.component.html',
  styleUrls: ['./主页.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePageComponent implements OnInit {
  constructor(
    public core: CoreService,
  ) {
  }

  ngOnInit(): void {
  }

  toRoomList(type: GameType) {
    const {router, R} = this.core;
    return router.forward(R.routes.room_list(type));
  }

  toPlayerProfile() {
    const {router, user, R} = this.core;
    return router.forward(R.routes.player_profile(user.get().id));
  }

  toSysSettings() {
    const {router, R} = this.core;
    return router.forward(R.routes.settings);
  }
}
