import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';

import {AppModule} from './app.module';

import {HomePageComponent} from './pages/主页/主页.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [HomePageComponent],
})
export class AppServerModule {
  constructor() {
  }
}
