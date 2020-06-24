import {SequelizeModel} from "../../../../../../orm";
import {User, WerewolvesGame, WerewolvesPlayer, WerewolvesRole} from "../../../../../../common";
import {WerewolvesRoleModel} from "../../configs/role/werewolves-role.model";
import {RoomModel} from "../../../../room/room.model";
import {UserModel} from "../../../../user/user.model";

export class WerewolvesPlayerModel extends SequelizeModel implements WerewolvesPlayer {
  id: number;
  index: number;
  role: WerewolvesRole;
  game: WerewolvesGame;
  user: User;
  updated_at: Date;
  created_at: Date;
  deleted_at: Date;
}

WerewolvesPlayerModel.config(Types => {
  return {
    tableName: WerewolvesPlayer.getTableName(),
    attributes: {
      index: {
        type: Types.INTEGER,
        comment: '玩家索引'
      },
      role: {
        type: Types.INTEGER,
        comment: '玩家角色',
        references:{
          model: WerewolvesRoleModel.configTableName,
        },
      },
      room: {
        type: Types.INTEGER,
        comment: '玩家所在房间',
        references: {
          model: RoomModel.configTableName,
        }
      },
      user: {
        type: Types.INTEGER,
        comment: '玩家对应的用户',
        references: {
          model: UserModel.configTableName,
        }
      }
    },
  };
});
