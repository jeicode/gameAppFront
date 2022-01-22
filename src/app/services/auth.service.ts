import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})

// >
// tap ; nos da una funcionalidad extra de poder obtener la respuesta del servidor aqui en el service
export class AuthService {

  token:string;
  user:any;
  
        
  constructor(private http: HttpClient, private router: Router) { 
    this.user = localStorage.getItem("user") || null;
    this.token = localStorage.getItem("token") || ""
    
    if (this.user){
      this.user = JSON.parse(this.user)
    }

  }

  login( email:string, password:string): Observable<any> {
      let url = `${ base_url }/api/auth/login`;  
      return this.http.post(url, {email, password}).pipe( tap( (res:any) => {
        
        const {token, user} = res
        this.token = token
        this.user = user
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))

      })
    )
  }

  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    this.user = null
    this.token = ""
    // mover al dashboard
    this.router.navigateByUrl('/')
  }

  get usersIsAuth(){

    if (this.user && this.token){ // falta validar token
      return true
    }

    return false

  }


}
