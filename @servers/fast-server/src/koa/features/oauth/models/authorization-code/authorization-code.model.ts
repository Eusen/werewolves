import {SequelizeModel} from "../../../../../orm";
import {OAuthAuthorizationCode} from "./authorization-code";

export class OAuthAuthorizationCodeModel<T> extends SequelizeModel implements OAuthAuthorizationCode<T> {
  id: number;
  user: T;
  authorization_code: string;
  redirect_uri: string;
  expires_at: Date;

  updated_at: Date;
  created_at: Date;
  deleted_at: Date;
}

OAuthAuthorizationCodeModel.config(Types => {
  return {
    tableName: OAuthAuthorizationCode.getTableName(),
    attributes: {
      user: {
        type: Types.INTEGER,
        references: {
          model: "users",
        }
      },
      authorization_code: {
        type: Types.TEXT,
        comment: '授权码'
      },
      redirect_uri: {
        type: Types.TEXT,
        comment: '重定向uri',
      },
      expires_at: {
        type: Types.DATE,
        comment: '过期于',
      }
    }
  }
})
