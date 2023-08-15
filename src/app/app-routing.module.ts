import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';

const routes: Routes = [
  {path: '', component: RegisterComponent},
  {path: 'sign-up', component: RegisterComponent},
  {path: 'login', component: LoginScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
