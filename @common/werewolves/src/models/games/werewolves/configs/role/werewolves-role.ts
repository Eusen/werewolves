import {WerewolvesSkill} from "../skill/werewolves-skill";
import {Table} from '../../../../../orm-table/table';

export class WerewolvesRole extends Table<WerewolvesRole> {
  name: string;
  desc: string;
  portrait: string;
  action_order: number;
}

WerewolvesRole.setTableName('werewolves_roles');

export class WerewolvesRoleSkillLink extends Table<WerewolvesRoleSkillLink> {
  role: WerewolvesRole;
  skill: WerewolvesSkill;
}

WerewolvesRoleSkillLink.setTableName('werewolves_role_skill_links')
