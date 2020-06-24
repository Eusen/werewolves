import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogShellComponent} from './dialog-shell.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [DialogShellComponent],
  exports: [DialogShellComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
    ]
})
export class DialogShellModule {
}
