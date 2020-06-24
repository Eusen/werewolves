import {OAuthUserModel} from "../../../koa/features/oauth";
import {User} from "../../../common";

export class UserModel extends OAuthUserModel implements User {
  id: number;
  nickname: string;
  phone: string;
  gender: boolean;
  email: string;
  avatar: string;
  birthday: Date;
  real_name: string;
  id_code: string;

  diamond: number;
  experience: number;
  gold_coin: number;
  level: number;
  portrait: string;

  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

UserModel.config(Types => {
  return {
    tableName: User.getTableName(),
    attributes: {
      username: {
        type: Types.STRING({length: 128}),
        unique: true,
        comment: '用户名',
      },
      password: {
        type: Types.TEXT,
        comment: '密码'
      },
      phone: {
        type: Types.STRING({length: 128}),
        unique: true,
        comment: '手机号',
      },
      nickname: {
        type: Types.STRING({length: 128}),
        comment: '昵称',
      },
      avatar: {
        type: Types.STRING({length: 256}),
        comment: '头像',
      },
      gender: {
        type: Types.BOOLEAN,
        comment: '性别'
      },
      email: {
        type: Types.STRING({length: 128}),
        comment: '邮箱'
      },
      birthday: {
        type: Types.DATE,
        comment: '生日'
      },
      real_name: {
        type: Types.STRING({length: 128}),
        comment: '真实姓名',
      },
      id_code: {
        type: Types.STRING({length: 128}),
        comment: '身份证号',
      },
      diamond: {
        type: Types.INTEGER,
        comment: '钻石',
      },
      experience: {
        type: Types.INTEGER,
        comment: '经验'
      },
      gold_coin: {
        type: Types.INTEGER,
        comment: '金币',
      },
      level: {
        type: Types.INTEGER,
        comment: '等级',
      },
      portrait: {
        type: Types.STRING({length: 512}),
        comment: '形象',
      }
    },
    options: {
      hooks: {}
    }
  }
});
