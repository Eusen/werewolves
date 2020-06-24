import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UwkSettingsComponent} from './一夜终极狼人杀设置.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    UwkSettingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UwkSettingsComponent,
      }
    ])
  ]
})
export class UwkSettingsModule {
}
