import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CoreService} from '../../services-game/core.service';

@Component({
  selector: 'wolf-player-incarnation',
  templateUrl: './player-incarnation.component.html',
  styleUrls: ['./player-incarnation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlayerIncarnationComponent implements OnInit {
  @Input() portrait: string;
  @Input() gender: boolean;

  get portraitImg() {
    if (this.portrait) return this.portrait;
    if (this.gender) {
      return this.core.R.img.portrait_pm_m.origin;
    } else {
      return this.core.R.img.portrait_pm_f.origin;
    }
  }

  constructor(
    public core: CoreService,
  ) {
  }

  ngOnInit(): void {
  }

}
