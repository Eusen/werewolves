import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { CoreService } from '../../services-game/core.service';

@Component({
  selector: 'wolf-player-gender',
  templateUrl: './player-gender.component.html',
  styleUrls: ['./player-gender.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerGenderComponent implements OnInit {
  @Input() size = 16;
  @Input() gender: boolean;

  constructor(public core: CoreService) { }

  ngOnInit(): void {
  }

}
