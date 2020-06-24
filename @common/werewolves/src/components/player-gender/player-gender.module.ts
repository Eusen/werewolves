import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerGenderComponent } from './player-gender.component';



@NgModule({
  declarations: [PlayerGenderComponent],
  exports: [
    PlayerGenderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PlayerGenderModule { }
