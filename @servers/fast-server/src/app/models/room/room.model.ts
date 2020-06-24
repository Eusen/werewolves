import {SequelizeModel} from "../../../orm";
import {UserModel} from "../user/user.model";
import {User, Room} from "../../../common";

export class RoomModel extends SequelizeModel implements Room {
  id: number;

  no: string;
  name: string;
  creater: User;
  password: string;

  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

RoomModel.config(Types => {
  return {
    tableName: Room.getTableName(),
    attributes: {
      no: {
        type: Types.STRING({length: 32}),
        comment: '编号',
      },
      name: {
        type: Types.STRING({length: 24}),
        comment: '房间名称',
      },
      password: {
        type: Types.STRING({length: 128}),
        comment: '房间密码',
      },
      creater: {
        type: Types.INTEGER,
        comment: '创建人',
        references: {
          model: UserModel.configTableName,
        }
      },
    },
    options: {
      hooks: {}
    }
  }
});
