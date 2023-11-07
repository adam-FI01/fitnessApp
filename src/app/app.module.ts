import { NgModule, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { RegisterComponent } from './register/register.component';
import { InputComponent } from './input/input.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { CookieService } from 'ngx-cookie-service';
import { NavbarComponent } from './navbar/navbar.component';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';
import { RemoveExerciseComponent } from './remove-exercise/remove-exercise.component';
import { UpdateExerciseComponent } from './update-exercise/update-exercise.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    RegisterComponent,
    InputComponent,
    HomeComponent,
    LandingComponent,
    NavbarComponent,
    AddExerciseComponent,
    RemoveExerciseComponent,
    UpdateExerciseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
     {provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,},
      CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
