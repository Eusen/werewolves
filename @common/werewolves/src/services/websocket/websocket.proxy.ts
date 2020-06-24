import {Injectable} from "@angular/core";
import {WebsocketClient} from "./websocket.client";

@Injectable({
  providedIn: "root"
})
export class WebsocketClientFactory  {
  create(host: string) {
    return WebsocketClient.create(host);
  }
}
