import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatRippleModule} from "@angular/material/core";
import {RouterModule} from "@angular/router";

import {HomePageComponent} from "./主页.component";
import {GameCardModule, PlayerIncarnationModule} from "@common/werewolves";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    MatRippleModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    PlayerIncarnationModule,
    GameCardModule,
    RouterModule.forChild([{
      path: '',
      component: HomePageComponent
    }]),
  ]
})
export class HomePageModule {
}
