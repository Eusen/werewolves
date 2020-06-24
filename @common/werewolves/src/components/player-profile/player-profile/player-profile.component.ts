import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'wolf-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlayerProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
