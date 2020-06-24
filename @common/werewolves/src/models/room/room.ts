import {Table} from "../../orm-table/table";
import {User} from "../user/user";

export class Room extends Table<Room> {
  name: string;
  creater: User;
  no: string;
  password: string;
  is_game_started: boolean;
}

Room.setTableName('rooms');
