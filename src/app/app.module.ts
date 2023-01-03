import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {FIREBASE_OPTIONS} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { NgxGaugeModule } from 'ngx-gauge';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxGaugeModule,
  ],
  providers:  [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }], 
  bootstrap: [AppComponent]
})
export class AppModule { }
