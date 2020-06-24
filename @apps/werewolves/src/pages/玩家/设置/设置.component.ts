import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CoreService, DialogProxy} from "@common/werewolves";

@Component({
  selector: 'player-settings-page',
  templateUrl: './设置.component.html',
  styleUrls: ['./设置.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerSettings extends DialogProxy implements OnInit {

  constructor(public core: CoreService) {
    super();
  }

  ngOnInit() {
  }

}
