import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {PlayerIncarnation} from '../../../services/game/player/player.incarnation.service';


@Component({
  selector: 'player-incarnation',
  templateUrl: './player-incarnation.component.html',
  styleUrls: ['./player-incarnation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerIncarnationComponent implements OnInit {
  @Input() incarnation: PlayerIncarnation;

  constructor() { }

  ngOnInit(): void {
  }

}
