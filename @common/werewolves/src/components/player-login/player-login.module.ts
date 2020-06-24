import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayerLoginComponent} from "./player-login.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [PlayerLoginComponent],
  exports: [PlayerLoginComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule
    ]
})
export class PlayerLoginModule {
}
