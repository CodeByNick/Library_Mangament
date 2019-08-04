import { UsernameValidator } from './../../services/UsernameValidator';
import { PasswordValidator } from './../../PasswordValidator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm:FormGroup;
  user:string = ''
  pass:string =''

  validationMessage = {
    'email':[
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'User name contains mail id' }
      ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
      ]
  }

  constructor(private fb:FormBuilder) { 
  this.loginForm = this.fb.group({
    email : ['',Validators.compose([Validators.required,UsernameValidator.validUsername,Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
    password : ['',Validators.compose([Validators.minLength(5),Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])]
  },(formGroup : FormGroup)=>{
    return PasswordValidator.areEqual(formGroup);
  })
}

  
onLogin(values){
  console.log(values);
  alert('Thank you! Now you\'re logged in...')
}

onClear(){
  this.user = null;
  this.pass = null;
}

  ngOnInit() {
  }

}
