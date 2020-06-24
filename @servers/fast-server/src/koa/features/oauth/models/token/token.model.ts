import {SequelizeModel} from "../../../../../orm";
import {OAuthToken} from "./token";

export class OAuthTokenModel<T = any> extends SequelizeModel implements OAuthToken<T> {
  id: number;
  access_token: string;
  access_token_expires_at: Date;
  refresh_token: string;
  refresh_token_expires_at: Date;
  user: T;

  created_at: Date;
  deleted_at: Date;
  updated_at: Date;
}

OAuthTokenModel.config(Types => {
  return {
    tableName: OAuthToken.getTableName(),
    attributes: {
      access_token: {
        type: Types.TEXT,
        comment: '访问令牌',
      },
      access_token_expires_at: {
        type: Types.DATE,
        comment: '访问令牌过期于',
      },
      refresh_token: {
        type: Types.TEXT,
        comment: '刷新令牌'
      },
      refresh_token_expires_at: {
        type: Types.DATE,
        comment: '访问令牌过期于',
      },
      user: {
        type: Types.INTEGER,
        comment: '用户ID',
        references: {
          model: "users",
        }
      },
    }
  }
})
