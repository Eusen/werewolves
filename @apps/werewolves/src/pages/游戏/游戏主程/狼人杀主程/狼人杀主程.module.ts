import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WkMainProgramComponent} from './狼人杀主程.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    WkMainProgramComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: WkMainProgramComponent,
      }
    ])
  ]
})
export class WKMainProgramModule {
}
