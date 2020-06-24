import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from "@angular/material/tabs";
import {PlayerProfileComponent} from "./player-profile/player-profile.component";
import {PlayerProfileEditorComponent} from './player-profile-editor/player-profile-editor.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    PlayerProfileComponent,
    PlayerProfileEditorComponent
  ],
  exports: [
    PlayerProfileComponent,
    PlayerProfileEditorComponent
  ],
    imports: [
        CommonModule,
        MatTabsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule
    ]
})
export class PlayerProfileModule {
}
