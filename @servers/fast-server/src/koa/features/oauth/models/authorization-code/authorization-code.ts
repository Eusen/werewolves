import {Table} from "../../../../../common";

export class OAuthAuthorizationCode<T> extends Table {
  authorization_code: string; // string with a valid code
  expires_at: Date // When the code expires
  redirect_uri: string; // String with a valid uri
  user: T;
}

OAuthAuthorizationCode.setTableName('oauth_authorization_codes');
