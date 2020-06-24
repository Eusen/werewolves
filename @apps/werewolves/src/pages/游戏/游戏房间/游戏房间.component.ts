import {Component, ViewEncapsulation} from '@angular/core';
import {CoreService, DialogProxy, User} from "@common/werewolves";

class GameRoomConfig {
  private _playerCountArray: any[];
  name: string;
  playerCount = 8;
  number: any;

  constructor() {
  }

  get playerCountArray() {
    if (!this._playerCountArray || this._playerCountArray.length !== this.playerCount) {
      this._playerCountArray = new Array(this.playerCount).fill(0);
    }
    return this._playerCountArray;
  }
}

export class Roommate extends User {
  isMaster: boolean
  isReady: boolean;

  constructor(user: User) {
    super();
    Object.assign(this, user);
  }
}

@Component({
  selector: 'game-room',
  templateUrl: './游戏房间.component.html',
  styleUrls: ['./游戏房间.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GameRoomComponent extends DialogProxy {
  config = new GameRoomConfig();
  players: Roommate[] = [];
  audiences: Roommate[] = [];
  me: Roommate;

  constructor(public core: CoreService) {
    super();
    this.config.number = core.utils.generateNumber();
  }

  pageInit() {
    const {model, utils, user} = this.core;
    const userData = user.get();
    this.me = new Roommate(userData);

    if (this.getParam('id') === '0') {
      // this.isMaster = true;
      this.config.name = userData.nickname + '的房间';
      this.me.isMaster = true;
      this.me.isReady = true;
      this.players.push(this.me);
      // 创建房间
      // model.Room.create({
      //   name: this.roomName,
      //   no: utils.generateNumber(),
      // } as any).then(resp => {
      //
      // });
    } else {
      // 获取房间
    }
  }

  toGameConfig() {
    const {router, R} = this.core;
    const type = this.getParam('type');
    console.log(type);
    router.forward([
      R.routes.settings_uwk
    ][type]);
  }

  toRoomConfig() {
  }

  ready() {
    if (this.me.isMaster) {
      // 开始游戏
    } else {
      this.me.isReady = !this.me.isReady;
    }

    // 这里需要通知房间里的其他人
  }
}
