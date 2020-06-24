import {SequelizeModel} from "../../../../../../orm";
import {WerewolvesGame, WerewolvesRole, WerewolvesRoleSkillLink, WerewolvesSkill} from "../../../../../../common";
import {WerewolvesGameModel} from "../../dataset/werewolves.model";
import {WerewolvesSkillModel} from "../skill/werewolves-skill.model";

export class WerewolvesRoleModel extends SequelizeModel implements WerewolvesRole {
  id: number;
  name: string;
  desc: string;
  portrait: string;
  action_order: number;
  game: WerewolvesGame;

  updated_at: Date;
  created_at: Date;
  deleted_at: Date;
}

WerewolvesRoleModel.config(Types => {
  return {
    tableName: WerewolvesRole.getTableName(),
    attributes: {
      name: {
        type: Types.STRING({length: 48}),
        comment: '角色名称',
      },
      desc: {
        type: Types.TEXT,
        comment: '角色描述'
      },
      portrait: {
        type: Types.STRING({length: 256}),
        comment: '角色画像'
      },
      action_order: {
        type: Types.INTEGER,
        comment: '行动顺序'
      },
      game: {
        type: Types.INTEGER,
        references: {
          model: WerewolvesGameModel.configTableName,
        }
      }
    },
  }
});

export class WerewolvesRoleSkillLinkModel extends SequelizeModel implements WerewolvesRoleSkillLink {
  id: number;
  role: WerewolvesRole;
  skill: WerewolvesSkill;

  updated_at: Date;
  created_at: Date;
  deleted_at: Date;
}

WerewolvesRoleSkillLinkModel.config(Types => {
  return {
    tableName: WerewolvesRoleSkillLink.getTableName(),
    attributes: {
      role: {
        type: Types.INTEGER,
        comment: '角色',
        references: {
          model: WerewolvesRoleModel.configTableName,
        },
      },
      skill: {
        type: Types.INTEGER,
        comment: '技能',
        references: {
          model: WerewolvesSkillModel.configTableName,
        }
      }
    },
  }
})
