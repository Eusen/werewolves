import {Table} from '../../../../../orm-table/table';
import {WerewolvesPlayer} from "../player/werewolves-player";
import {WerewolvesSkill} from "../../configs/skill/werewolves-skill";
import {WerewolvesGame} from "../werewolves";

export class WerewolvesActionRecord extends Table<WerewolvesActionRecord> {
  game: WerewolvesGame;
  state: string;
  day_on: number;
  is_night: boolean;
  skill_trigger: WerewolvesPlayer;
  skill: WerewolvesSkill;
  targets: string;
}

WerewolvesActionRecord.setTableName('werewolves_action_records');
