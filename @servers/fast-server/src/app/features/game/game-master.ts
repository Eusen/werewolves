export class GameMaster {
  static createRoom() {
    return new GameRoom();
  }
}

export class GameRoom {
  join() {
  }

  look() {
  }

  startGame() {
  }
}

export class WerewolvesEvent {
}

export class WerewolvesGame {
  eventLoop: WerewolvesEvent[];
}
