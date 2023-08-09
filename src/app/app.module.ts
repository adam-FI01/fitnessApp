import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { RegisterComponent } from './register/register.component';
import { ReturningCustomerloginComponent } from './returning-customerlogin/returning-customerlogin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    RegisterComponent,
    ReturningCustomerloginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
