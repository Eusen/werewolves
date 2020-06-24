import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {CoreService} from '../../services-game/core.service';
import {FormGroupProxy} from '../../services/form/form.service';

@Component({
  selector: 'wolf-player-login',
  templateUrl: './player-login.component.html',
  styleUrls: ['./player-login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlayerLoginComponent implements OnInit {
  @Output() success = new EventEmitter();

  isShowLogon = false;
  isHidePassword = [true, true];
  loginGroup: FormGroupProxy;

  constructor(public core: CoreService) {
    this.loginGroup = this.core.form.group({
      username: {
        defaultValue: '13639442690',
        pattern: /^1\d{10}$/,
      },
      password: {
        defaultValue: '123456',
        minLength: 6,
      },
      confirmPassword: {
        defaultValue: '',
        customUpdateOnChange: ['password'],
        custom: (control: AbstractControl) => {
          if (this.loginGroup) {
            const isNotSame = this.loginGroup.get('password').value !== control.value;
            if (isNotSame) return '两次密码不相同';
          }
        },
      },
    });
  }

  ngOnInit() {
  }

  togglePassword(event: Event, index: number) {
    event.stopPropagation();
    event.preventDefault();
    this.isHidePassword[index] = !this.isHidePassword[index];
  }

  submit() {
    if (this.isShowLogon) {
      if (this.loginGroup.hasErrors()) return;
    } else {
      if (this.loginGroup.hasErrors(['username', 'password'])) return;
    }

    (() => {
      const value = this.loginGroup.getRawValue();
      if (this.isShowLogon) {
        return this.core.user.logon(value.username, value.password);
      } else {
        return this.core.user.login(value.username, value.password);
      }
    })().then(resp => {
      this.core.notify.tip('欢迎回来');
      this.success.emit();
    }, err => {
      // 无需处理
    });
  }

  toggleLogonDisplay() {
    this.isShowLogon = !this.isShowLogon;
    if (this.isShowLogon) {
      this.loginGroup.patchValue({password: '', confirmPassword: ''});
    }
  }
}
