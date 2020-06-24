import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {AppRoutingModule} from './app.routing.module';
import {RootComponent} from "./root/root.component";
import {CoverModule} from "@common/werewolves";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: '狼人杀'}),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CoverModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
  ],
  bootstrap: [RootComponent]
})
export class AppModule {
}
