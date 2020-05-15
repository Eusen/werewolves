import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'game-player-settings',
  templateUrl: './设置.component.html',
  styleUrls: ['./设置.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerSettings implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
