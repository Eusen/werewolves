import {Table} from '../../../../orm-table/table';
import {Room} from "../../../room/room";

export enum GameType {
  UWK, // 一夜终极狼人杀
}

export class WerewolvesGame extends Table<WerewolvesGame> {
  name: string;
  type: GameType;
  room: Room;
  started_at: Date;
  ended_at: Date;
}

WerewolvesGame.setTableName('werewolves_game');
