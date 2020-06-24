import {KoaServer} from "./koa";
import {
  RoomModel,
  UserModel,
  WerewolvesGameModel,
  WerewolvesRoleModel,
  WerewolvesRoleSkillLinkModel,
  WerewolvesSkillModel,
  WerewolvesActionRecordModel,
} from "./app/models";
import {
  OAuthAuthorizationCodeModel,
  OAuthTokenModel,
} from "./koa/features/oauth";
import {
  LoginEndpoint,
  LogonEndpoint,
  StartEndpoint
} from "./app/endpoints";
import * as NodeUtils from './utils/node.utils';

(async () => {
  const {$path, $fs, $os} = NodeUtils;

  await KoaServer.create({
    endpoints: [
      StartEndpoint,
      LoginEndpoint,
      LogonEndpoint,
    ],
    sequelize: {
      dialect: "sqlite",
      storage: $path.join(__dirname, "assets/db/werewolves.db"),
      isForceRefreshDatabase: NodeUtils.hasArg('force-refresh-database'),
      models: [
        UserModel,
        RoomModel,
        WerewolvesGameModel,
        WerewolvesRoleModel,
        WerewolvesSkillModel,
        WerewolvesRoleSkillLinkModel,
        WerewolvesActionRecordModel,

        OAuthAuthorizationCodeModel,
        OAuthTokenModel,
      ],
    },
    websocket: {},
    body: {
      formidable: {
        maxFileSize: 5 * 1024 * 1024,
        maxFields: 9,
        uploadDir: $path.join(__dirname, 'assets/uploads/'),
        keepExtensions: true,
        hash: 'md5',
      }
    },
  }).start();

  // 读取本机IP,并将IP替换掉 core.service 中的 serverUrl
  const config = $os.networkInterfaces();
  const ip = config.WLAN[1].address;
  const coreServicePath = $path.join(__dirname, '../../../@common/werewolves/src/services-game/core.service.ts');
  const coreServiceContent = $fs.readFileSync(coreServicePath).toString();
  $fs.writeFileSync(coreServicePath, coreServiceContent.replace(/(\d+)\.(\d+)\.(\d+).(\d+)/g, ip));
})();
