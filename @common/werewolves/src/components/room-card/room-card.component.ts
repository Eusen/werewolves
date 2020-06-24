import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CoreService} from '../../services-game/core.service';
import {Room} from "../../models";

@Component({
  selector: 'wolf-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RoomCardComponent implements OnInit {
  @Input() room: Room;
  status: string;

  constructor(public core: CoreService) {
  }

  ngOnInit() {
    if (this.room.is_game_started) {
      this.status = '游戏已开始';
    } else {
      this.status = '正在招募...';
    }
  }

}
