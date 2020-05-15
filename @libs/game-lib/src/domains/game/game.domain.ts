import {GameActionParticipantModel} from "./action-participant/game-action-participant.model";
import {GameActionRecordModel} from "./action-record/game-action-record.model";
import {GameRoomModel} from "./room/game-room.model";
import {GameRoommateModel} from "./roommate/game-roommate.model";

@Domain({
  name: 'game',
  subdomain: [
    GameActionParticipantModel,
    GameActionRecordModel,
    GameRoomModel,
    GameRoommateModel,
  ],
})
export class GameDomain {
}
