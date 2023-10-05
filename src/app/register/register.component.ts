import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

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
    passwordConfirmation: new FormControl('',[ 
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

  get UserPasswordConfirmation() {
    return this.authForm.get('passwordConfirmation');
  }
}
