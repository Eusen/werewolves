import SocketIO = require("socket.io");
import {Server} from "http";

export class WebsocketServer {
  readonly socket: SocketIO.Server;

  static create(httpServer: Server, opts: SocketIO.ServerOptions) {
    return new WebsocketServer(httpServer, opts);
  }

  private constructor(httpServer: Server, opts: SocketIO.ServerOptions) {
    this.socket = SocketIO(httpServer, opts);
  }
}
