import {Component, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from '../../models/user/user';
import { CoreService } from '../../services-game/core.service';

@Component({
  selector: 'wolf-player-avatar',
  templateUrl: './player-avatar.component.html',
  styleUrls: ['./player-avatar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerAvatarComponent implements OnInit {
  @HostBinding('style.height.px')
  @HostBinding('style.width.px')
  @Input() size = 100;

  @Input() user: User;
  @Input() status: string;

  constructor(public core: CoreService) {
  }

  ngOnInit(): void {
  }

}
