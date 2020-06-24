import {EventEmitter} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import * as SocketIOClient from "socket.io-client";

export class WebsocketClient {
  static globalClients: { [host: string]: WebsocketClient } = {};

  protected readonly client: SocketIOClient.Socket;
  protected eventPipelines: { [event: string]: EventEmitter<any> };
  protected socket = new BehaviorSubject<SocketIOClient.Socket>(null);

  static create(host: string) {
    let client = this.globalClients[host];
    if (!client) client = this.globalClients[host] = new WebsocketClient(host);
    return client;
  }

  constructor(public readonly host: string) {
    this.client = SocketIOClient(host);
    this.client.compress(true);
    this.client.on("connection", socket => {
      this.socket.next(socket);
    });
  }

  getSocket() {
    return new Promise<SocketIOClient.Socket>(resolve => {
      if (this.socket.getValue()) {
        return resolve(this.socket.getValue());
      }
      this.socket.subscribe(socket => {
        if (socket) resolve(socket);
      });
    });
  }

  on<T>(event: string) {
    let pipe = this.eventPipelines[event];
    if (!pipe) {
      pipe = this.eventPipelines[event] = new EventEmitter<T>();
      this.getSocket().then(socket => {
        socket.on(event, (...args) => {
          pipe.emit(args);
        });
      });
    }
    return pipe;
  }

  close() {
    return this.client.close();
  }

  emit(event: string, ...args) {
    return this.client.emit(event, ...args);
  }

  localizedEmit(event: string, ...args) {
    let pipe = this.eventPipelines[event];
    if (!pipe) pipe = this.eventPipelines[event] = new EventEmitter<any>();
    pipe.emit(args);
  }
}
