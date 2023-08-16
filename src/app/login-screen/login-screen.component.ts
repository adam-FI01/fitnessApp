import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent {

  authForm = new FormGroup({
    username: new FormControl('',[ 
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ], /* [this.uniqueUsername.validate] */),
    password: new FormControl('',[
     Validators.required,
     Validators.minLength(4),
     Validators.maxLength(20)
    ]),
    passwordConfirmation: new FormControl('',[ 
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20)
    ]),
  }, {}
  );

}


/* validators: [this.matchPassword.validate] */