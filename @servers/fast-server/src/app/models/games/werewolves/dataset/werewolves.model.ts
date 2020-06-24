import {SequelizeModel} from "../../../../../orm";
import {GameType, Room, WerewolvesGame} from "../../../../../common";
import {RoomModel} from "../../../room/room.model";

export class WerewolvesGameModel extends SequelizeModel implements WerewolvesGame {
  id: number;
  name: string;
  type: GameType;
  room: Room;
  started_at: Date;
  ended_at: Date;

  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

WerewolvesGameModel.config(Types => {
  return {
    tableName: WerewolvesGame.getTableName(),
    attributes: {
      name: {
        type: Types.STRING({length: 128}),
        comment: '游戏名称'
      },
      type: {
        type: Types.ENUM,
        choices: GameType,
        comment: '游戏类型'
      },
      room: {
        type: Types.INTEGER,
        comment: '关联房间',
        references: {
          model: RoomModel.configTableName,
        }
      },
      started_at: {
        type: Types.DATE,
        comment: '开始时间',
      },
      ended_at: {
        type: Types.DATE,
        comment: '结束时间',
      }
    },
    options: {},
  }
})
