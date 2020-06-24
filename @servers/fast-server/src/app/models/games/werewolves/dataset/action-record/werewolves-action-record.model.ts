import {SequelizeModel} from "../../../../../../orm";
import {WerewolvesActionRecord, WerewolvesGame, WerewolvesPlayer, WerewolvesSkill} from "../../../../../../common";
import {WerewolvesGameModel} from "../werewolves.model";
import {WerewolvesSkillModel} from "../../configs/skill/werewolves-skill.model";
import {WerewolvesPlayerModel} from "../player/werewolves-player.model";

export class WerewolvesActionRecordModel extends SequelizeModel implements WerewolvesActionRecord {
  id: number;
  state: string;
  targets: string;
  day_on: number;
  is_night: boolean;
  game: WerewolvesGame;
  skill: WerewolvesSkill;
  skill_trigger: WerewolvesPlayer;
  updated_at: Date;
  deleted_at: Date;
  created_at: Date;
}

WerewolvesActionRecordModel.config(Types => {
  return {
    tableName: WerewolvesActionRecord.getTableName(),
    attributes: {
      state: {
        type: Types.TEXT,
        comment: '当前状态'
      },
      targets: {
        type: Types.TEXT,
        comment: '目标玩家列表'
      },
      day_on: {
        type: Types.INTEGER,
        comment: '当前天数',
      },
      is_night: {
        type: Types.BOOLEAN,
        comment: '是否是晚上',
      },
      game: {
        type: Types.INTEGER,
        comment: '关联的游戏',
        references: {
          model: WerewolvesGameModel.configTableName,
        }
      },
      skill: {
        type: Types.INTEGER,
        comment: '释放的技能',
        references: {
          model: WerewolvesSkillModel.configTableName,
        }
      },
      skill_trigger: {
        type: Types.INTEGER,
        comment: '技能释放者',
        references: {
          model: WerewolvesPlayerModel.configTableName,
        }
      },
    },
  }
})
