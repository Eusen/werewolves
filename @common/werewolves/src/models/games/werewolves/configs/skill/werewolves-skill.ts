import {Table} from '../../../../../orm-table/table';

export class WerewolvesSkill extends Table<WerewolvesSkill> {
  name: string;
  desc: string;
  is_passive: boolean;
}

Table.setTableName('werewolves_skills');
