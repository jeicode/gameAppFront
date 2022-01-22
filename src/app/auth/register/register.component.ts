import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  
  submittedForm:boolean = false 
  msgError: string = ''

  registerForm = this.fb.group({
    name:['', [Validators.required]],
    email:['', [
      Validators.required,
      Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
     ]
    ],
    password:['', [Validators.required]],
    password2:['', [Validators.required ]],
    is_seller:[false]
  })


  constructor(private fb: FormBuilder, 
              private router: Router,
              private userService: UserService) { }


  
  registerUser() {
    const {email, name, is_seller, password, password2} = this.registerForm.value
    const equalPasswords = this.equalPasswords(password, password2)

    if (equalPasswords) {
      this.userService.registerUser({ email, name, is_seller, password} )
      .subscribe( (res) => {
        this.router.navigateByUrl('/login')
      }, (err) => {
        console.error(err)
        this.msgError = err.error.errors.email.msg
      })

    } else {
      this.msgError = 'Contraseñas no coinciden!'
    }
    
  }

  equalPasswords(pass:string, pass2: string) {
    return pass === pass2

    }
}
