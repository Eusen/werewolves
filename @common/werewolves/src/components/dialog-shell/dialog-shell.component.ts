import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CoreService} from '../../services-game/core.service';
import {DialogProxy} from '../../services/router/router.interceptor';
import {CommonMenuItem} from '../../services/menu/menu.service';

@Component({
  selector: 'wolf-dialog-shell',
  templateUrl: './dialog-shell.component.html',
  styleUrls: ['./dialog-shell.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogShellComponent implements OnInit {
  @Input() title: string;
  @Input() dialog: DialogProxy;
  @Input() disableHeaderClose: boolean;
  @Input() disableHeader: boolean;
  @Input() menus: CommonMenuItem[];

  constructor(public core: CoreService) {
  }

  ngOnInit(): void {
  }

}
