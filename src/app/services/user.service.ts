import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})

// >
// tap ; nos da una funcionalidad extra de poder obtener la respuesta del servidor aqui en el service
export class UserService {

  constructor(private http: HttpClient) { 

  }

  registerUser( form:Object ): Observable<any> {
    let url = `${ base_url }/api/users/register`;  
    return this.http.post(url, form)
  }



}
