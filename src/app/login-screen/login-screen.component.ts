import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs/internal/operators/tap';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  loginResponse$: Observable<any> | any;
  errorMessage: any;
  loginResponse: any;
  

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
  }

  authForm = new FormGroup({
    userUsername: new FormControl('',[ 
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ], ),
    userPassword: new FormControl('',[
     Validators.required,
     Validators.minLength(4),
     Validators.maxLength(20)
    ]),
  },
  );

  ngOnInit(): void {
    
  }

  

  // Use the correct form control names here
  get UserUsername() {
    return this.authForm.get('userUsername');
  }

  get UserPassword() {
    return this.authForm.get('userPassword');
  }

  /* onLogin() {
    if (this.authForm.valid) {
      const credentials: any = {
        username: this.UserUsername?.value,
        password: this.UserPassword?.value,
      };
      console.log(credentials)


      this.loginResponse$ = this.authService.login(credentials);
    }
  } */

  async onLogin() {
    const credentials: any = {
      username: this.UserUsername?.value,
      password: this.UserPassword?.value,
    };
    if (this.authForm.valid) {
      try {
        this.loginResponse = await this.authService.login(credentials).toPromise();
        console.log('Response:', this.loginResponse);
        // Redirect or handle success as needed
        this.router.navigate(['/home'])
      } catch (error) {
        console.error('Error:', error);
        // Handle the error as needed
      }
    }
  }
}
export interface SigninCridentials {
  userUsername: string;
  userPassword: string;
}