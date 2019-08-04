import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  validationMessage = {
    'userName' : [ 
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],

    'email':[
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'comment':[
      { type: 'maxlength', message: 'Comment contains maximum 256 characters long!' },
      { type: 'required', message: 'Comment is required!' }
    ]
  }

  contactForm: FormGroup;

  constructor(private fb:FormBuilder) {
    this.contactForm = this.fb.group({
      userName : ['',Validators.compose([Validators.minLength(5),Validators.maxLength(6),Validators.required])],
      email : ['',Validators.compose([Validators.required,Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      comment : ['',Validators.compose([Validators.maxLength(256),Validators.required])]
    })
   }

   onSubmit(values){
     console.log(values);
     alert('Thank you! we\'ll get back to you soon...')
   }

   showAlert(){
     alert("Are you sure ?");
   }

  ngOnInit() {
  }

}
