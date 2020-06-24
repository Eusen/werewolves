import {SequelizeModel} from "../../../../../orm";

export class OAuthUserModel extends SequelizeModel {
  id: number;
  username: string;
  password: string;
}

OAuthUserModel.setModelName('UserModel');
