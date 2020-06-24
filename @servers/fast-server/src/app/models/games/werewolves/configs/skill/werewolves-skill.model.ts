import {SequelizeModel} from "../../../../../../orm";
import {WerewolvesSkill} from "../../../../../../common";

export class WerewolvesSkillModel extends SequelizeModel implements WerewolvesSkill {
  id: number;
  name: string;
  desc: string;
  is_passive: boolean;
  created_at: Date;
  deleted_at: Date;
  updated_at: Date;
}

WerewolvesSkillModel.config(Types => {
  return {
    tableName: WerewolvesSkill.getTableName(),
    attributes: {
      name: {
        type: Types.STRING({length: 48}),
        comment: '技能名称'
      },
      desc: {
        type: Types.TEXT,
        comment: '技能描述'
      },
      is_passive: {
        type: Types.BOOLEAN,
        comment: '是否为被动技能'
      },
    },
  }
})
