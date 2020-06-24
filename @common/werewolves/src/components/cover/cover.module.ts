import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoverComponent} from './cover.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    CoverComponent
  ],
  exports: [
    CoverComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule
  ]
})
export class CoverModule {
}
