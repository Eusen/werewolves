import {Injectable} from '@angular/core';
import {HttpRequester} from "../../services/request";
import {TableClient} from "../../orm-table/table.client";
import {User} from '../../models/user/user';
import {Room} from '../../models/room/room';
import {WerewolvesRole} from '../../models/games/werewolves/configs/role/werewolves-role';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  User = TableClient.create<User>(User.getTableName());
  Room = TableClient.create<Room>(Room.getTableName());
  Role = TableClient.create<Room>(WerewolvesRole.getTableName());

  constructor(private http: HttpRequester) {
    Object.keys(this).forEach(key => {
      const client = this[key];
      if (client instanceof TableClient) {
        client.setRequester(http);
      }
    })
  }
}
