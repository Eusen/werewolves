import {Component} from '@angular/core';
import * as Client from 'socket.io-client';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '@apps/werewolves';
  client: SocketIOClient.Socket;

  constructor() {
  }

  emit() {
    this.client.emit('chat', this.title);
  }

  init() {
    this.client = Client.connect('http://localhost:3000');
  }
}
