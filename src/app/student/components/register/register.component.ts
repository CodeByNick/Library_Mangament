import { PasswordValidator } from './../../PasswordValidator';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm:FormGroup;
  user:string = ''
  pass1:string =''
  pass2:string =''

  validationMessage = {
    'email':[
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'User name contains mail id' }
      ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
      ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
      ]
  }

  constructor(private fb:FormBuilder) { 
  this.registerForm = this.fb.group({
    email : ['',Validators.compose([Validators.required,Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
    password : ['',Validators.compose([Validators.minLength(5),Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])],
    confirm_password: new FormControl('', Validators.required)
  },(formGroup : FormGroup)=>{
    return PasswordValidator.areEqual(formGroup);
  })
}

  
onRegister(values){
  console.log(values);
  alert('Thank you! Now you\'re registered...')
}

onClear(){
  this.user = null;
  this.pass1 = null;
  this.pass2 = null;
}
  ngOnInit() {
  }

}
