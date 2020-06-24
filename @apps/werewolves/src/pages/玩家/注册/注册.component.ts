import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DialogProxy} from "@common/werewolves";

@Component({
  selector: 'player-logon-page',
  templateUrl: './注册.component.html',
  styleUrls: ['./注册.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerLogonPage extends DialogProxy implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
