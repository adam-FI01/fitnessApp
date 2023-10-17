import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  signUpResponse$: Observable<any> | any;
  signUpResponse: any;

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
    userEmail: new FormControl('',[ 
    Validators.required,
    Validators.email
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

  get UserEmail() {
    return this.authForm.get('userEmail');
  }

  async onSignup() {
    const credentials: any = {
      username: this.UserUsername?.value,
      password: this.UserPassword?.value,
      email: this.UserEmail?.value
    };
    if (this.authForm.valid) {
      try {
        this.signUpResponse = await this.authService.signup(credentials).toPromise();
        console.log('Response:', this.signUpResponse);
        // Redirect or handle success as needed
        alert('Registration success! To help you remember your username and password, please sign in after clicking the "OK" button.')
        this.router.navigate(['/login'])
      } catch (error) {
        // Handle the error as needed
        if (error instanceof HttpErrorResponse) {
          // This is an HTTP error response
          console.log('oh god')
          if (error.error && error.error.message) {
            // Display the error message from the response
            alert(error.error.message);
          } else {
            // Handle other types of HTTP errors
            alert(error);
          }
        } else {
          // Handle non-HTTP errors
          alert(error);
        }
      }
    }
  }

  constructor(private authService: AuthService, private router: Router) {}
}
