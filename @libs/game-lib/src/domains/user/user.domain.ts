import {UserModel} from "./user/user.model";

@Domian({
  name: 'user',
  rootModel: UserModel,
  subdomin: [

  ],
})
export class UserDomain {
}
