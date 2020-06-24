import {Table} from "../../orm-table/table";
import {UserDetail} from "./user-detail";
import {UserComposition} from "./user-composition";

export class User extends Table<User> implements UserComposition, UserDetail {
  avatar: string;
  gender: boolean;
  username: string;
  password: string;
  nickname: string;
  phone: string;
  portrait: string;

  level: number;
  experience: number;
  diamond: number;
  gold_coin: number;

  email: string;
  birthday: Date;
  real_name: string;
  id_code: string;
}

User.setTableName('users');
