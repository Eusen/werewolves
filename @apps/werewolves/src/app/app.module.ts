import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatDialogModule} from '@angular/material/dialog';
import {MatRippleModule} from '@angular/material/core';

import {AppRoutingModule} from './app.routing.module';

import {HomePageComponent} from './pages/主页/主页.component';
import {PlatformAgent} from '../services/platform/platform.service';
import {ComponentsModule} from './components/components.module';

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: '狼人杀'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatRippleModule,
    ComponentsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (injector: Injector) => () => injector.get(PlatformAgent),
      deps: [Injector],
      multi: true,
    }
  ],
  bootstrap: [HomePageComponent]
})
export class AppModule {
}
