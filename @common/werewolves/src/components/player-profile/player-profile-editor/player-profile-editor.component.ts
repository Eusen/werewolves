import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {CoreService} from '../../../services-game/core.service';
import {FormGroupProxy} from '@common/werewolves';

@Component({
  selector: 'wolf-player-profile-editor',
  templateUrl: './player-profile-editor.component.html',
  styleUrls: ['./player-profile-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerProfileEditorComponent implements OnInit {
  @Input() mode: 'init' | 'edit' = "edit";
  @Output() finished = new EventEmitter();

  form: FormGroupProxy;

  constructor(
    public core: CoreService,
  ) {
    this.form = this.core.form.group({
      nickname: {
        required: true,
      },
      gender: {
        required: true,
      },
      avatar: {
        required: true,
      }
    })
  }

  ngOnInit() {
  }

  selectAvatar() {
    const {form, http, notify} = this.core;
    form.selectImage().then(files => {
      http.post('/upload', {file: files.item(0)}, {
        asFormData: true
      }).then(resp => {
        this.form.patchValue({
          avatar: resp.data[0]
        });
      }, err => {
        notify.tip('图片不得大于5mb');
      });
    });
  }

  setGender(gender) {
    this.form.patchValue({gender});
  }

  submit() {
    const {model, notify, user, cover} = this.core;
    const value = this.form.getRawValue();

    if (this.form.hasErrors(['avatar', 'gender', 'nickname'])) {
      if (!value.avatar) return notify.tip('请选择一个头像');
      if (![0, 1].includes(value.gender)) return notify.tip('请选择您的性别');
      if (!value.nickname) return notify.tip('请设置一个昵称');
    }

    if (this.mode === "init") {
      model.User.update({
        id: user.get().id,
        avatar: value.avatar,
        gender: !!value.gender,
        nickname: value.nickname,
        portrait: !!value.gender ? 'portrait_pm_m' : 'portrait_pm_f',
      } as any).then(resp => {
        user.set(resp);
        this.finished.emit();
      });
    } else {

    }
  }
}
