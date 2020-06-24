import {AfterViewInit, Component, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CoreService} from '../../services-game/core.service';
import {CoverService} from "./cover.service";

@Component({
  selector: 'wolf-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CoverComponent implements OnInit, AfterViewInit {
  @Input() coverImg: string;
  @Input() coverBackImg: string;
  @Input() openVoice: string;
  @Input() closeVoice: string;

  coverDisplayClassCtrl;
  isDisableAnimation = true;

  @HostBinding('class.disappear') get isDisappear() {
    return this.$.isDisappear;
  }

  constructor(
    public core: CoreService,
    public $: CoverService,
  ) {
  }

  ngOnInit() {
    const isIOS = this.core.plt.is("ios");
    this.coverDisplayClassCtrl = buildDisplayClassController(isIOS, () => this.$.isOpened.getValue());

    this.$.isOpened.subscribe(isOpened => {
      if (!this.isDisableAnimation) {
        const voices = isOpened ? this.openVoice : this.closeVoice;
        if (voices) this.core.assets.playAudio(voices);
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isDisableAnimation = false;
    }, 1000);
  }
}


function buildDisplayClassController(isIOS: boolean, getOpen: () => boolean) {
  return {
    get closed() {
      return !isIOS && !getOpen();
    },
    get opened() {
      return !isIOS && getOpen();
    },
    get closed_ios() {
      return isIOS && !getOpen();
    },
    get opened_ios() {
      return isIOS && getOpen();
    },
  }
}
