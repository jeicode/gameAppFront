import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user:any
  usersIsAuth:boolean;

  constructor(public authService: AuthService) {
    this.user = authService.user
    this.usersIsAuth = authService.usersIsAuth
   }


   logout(){
     this.authService.logout()
   }


}
