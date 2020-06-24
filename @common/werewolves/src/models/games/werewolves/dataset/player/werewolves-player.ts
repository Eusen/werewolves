import {Table} from '../../../../../orm-table/table';
import {User} from "../../../../user/user";
import {WerewolvesRole} from "../../configs/role/werewolves-role";
import {WerewolvesGame} from "../werewolves";

export class WerewolvesPlayer extends Table {
  index: number;
  user: User;
  game: WerewolvesGame;
  role: WerewolvesRole;
}

WerewolvesPlayer.setTableName('werewolves_players');
