import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs/internal/operators/tap';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  loginResponse$: Observable<any> | any;
  errorMessage: any;
  loginResponse: any;
  

  constructor(private authService: AuthService, private fb: FormBuilder, private cookieService: CookieService, private router: Router) {
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
        const response = await this.authService.login(credentials).toPromise();
        const jwtToken = response.access_token; // Assuming this is how you get the JWT token from the response

        // Set the JWT token in an HTTP-only cookie
        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 1); // Set expiration to 1 hour from now
        this.cookieService.set('jwtToken', jwtToken, undefined, '/', 'localhost', true, 'Lax');
        console.log(jwtToken)




        // Redirect or handle success as needed
        this.router.navigate(['/home']);
      } catch (error) {
        // Handle login error
        if (error instanceof HttpErrorResponse) {
          if (error.error && error.error.message) {
            alert(error.error.message);
          } else {
            alert(error);
          }
        } else {
          alert(error);
        }
      }
    }
  }
}
export interface SigninCridentials {
  userUsername: string;
  userPassword: string;
}