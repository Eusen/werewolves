import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'wolf-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GameCardComponent implements OnInit {
  @Input() title: string;
  @Input() desc: string;
  @Input() cover: string;

  constructor() { }

  ngOnInit() {
  }

}
