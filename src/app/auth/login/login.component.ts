import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  msgError: string = ''
  auth2: any
  loginForm = this.fb.group({
    email:[ localStorage.getItem("email") || '' , [     
      Validators.required,
      Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
     ]
    ],
    password:['', [Validators.required ]],
    remember:[ localStorage.getItem("email") ? true : false]
  })

  constructor(  private router: Router, 
                private fb: FormBuilder, 
                private authService: AuthService,
              ) { }

  login(){
    const {email, password} = this.loginForm.value
    this.authService.login(email, password)
        .subscribe( res => {

          if (this.loginForm.value.remember) {
            localStorage.setItem("email", this.loginForm.value.email)
          } else {
            localStorage.removeItem("email")
          }
          
          // mover al dashboard
          this.router.navigateByUrl('/')
        }, (err) => {
          this.msgError = 'Correo o contraseña incorrectos!'
        })


  }


}
