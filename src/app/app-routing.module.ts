import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './auth.guard';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';
import { RemoveExerciseComponent } from './remove-exercise/remove-exercise.component';
import { UpdateExerciseComponent } from './update-exercise/update-exercise.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'login', component: LoginScreenComponent },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      { path: 'add-exercise', component: AddExerciseComponent },
      { path: 'remove-exercise', component: RemoveExerciseComponent,  },
      { path: 'update-exercise', component: UpdateExerciseComponent, },
    ]
  },
  // Add more top-level routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
