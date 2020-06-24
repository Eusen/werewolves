import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CoreService, DialogProxy} from "@common/werewolves";

@Component({
  selector: 'player-profile-page',
  templateUrl: './个人资料.component.html',
  styleUrls: ['./个人资料.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerProfileComponent extends DialogProxy implements OnInit {

  constructor(public core: CoreService) {
    super();
  }

  ngOnInit() {
  }

}
