import {Table} from "../../../../../common";

export class OAuthToken<T> extends Table {
  access_token: string; // string with a valid access token
  access_token_expires_at: Date; // When token expires
  refresh_token: string;
  refresh_token_expires_at: Date;
  user: T;
}

OAuthToken.setTableName('oauth_tokens');
