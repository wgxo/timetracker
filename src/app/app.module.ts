import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MatSharedModule } from './mat-shared.module';
import { CustomHttpModule } from './modules/http/custom-http.module';

const SHARED_MODULES = [
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  MatSharedModule,
  CustomHttpModule,
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ...SHARED_MODULES,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
