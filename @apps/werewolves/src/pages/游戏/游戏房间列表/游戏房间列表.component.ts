import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonMenuItem, CoreService, DialogProxy, Room} from "@common/werewolves";

@Component({
  selector: 'game-room-list-page',
  templateUrl: './游戏房间列表.component.html',
  styleUrls: ['./游戏房间列表.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GameRoomListComponent extends DialogProxy implements OnInit {
  roomList: Room[];
  hasNextPage: boolean;
  currentPageIndex = 0;
  menus: CommonMenuItem[];

  constructor(public core: CoreService) {
    super();
  }

  ngOnInit() {
    this.title = [
      '一夜终极 擂场'
    ][this.getParam('type')];

    this.menus = this.core.menu.create([
      {
        icon: 'refresh',
        title: '刷新列表',
      },
      {
        icon: 'add',
        title: '新建房间',
        handler: () => this.toRoom(),
      }
    ]);

    this.refreshList();
  }

  refreshList(pageIndex = this.currentPageIndex) {
    this.currentPageIndex = pageIndex;
    const {model} = this.core;
    model.Room.list({
      pageIndex
    }).then(resp => {
      this.roomList = resp.results;
    });
  }

  toRoom() {
    const {router, R} = this.core;
    router.forward(R.routes.room(this.getParam('type'), 0));
  }
}
