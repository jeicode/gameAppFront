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
export class GameService {

  constructor(private http: HttpClient) { 

  }

  get token (): string {
    return localStorage.getItem("token") || ''
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  getGames( page: number = 1, limit:number = 15 ): Observable<any> {
    let url = `${ base_url }/api/games?page=${page}&limit=${limit}`;  
    return this.http.get(url)
  }

  // http://localhost:3000/api/games/seller/2?search=23&limit=23&page=1
  getGamesSeller( page: number, limit:number, idUser:number, search: string ): Observable<any> {
    let url = `${ base_url }/api/games/seller/${idUser}?page=${page}&limit=${limit}&search=${search}`;  
    return this.http.get(url, this.headers)
  }

  // http://localhost:3000/api/games/seller/2?search=23

  getOneGame( id:number ): Observable<any> {
    let url = `${ base_url }/api/games/${id}`;  
    return this.http.get(url)
  }

  createGame( form :any): Observable<any> {
    let url = `${ base_url }/api/games/create`;  
    return this.http.post(url , form, this.headers)
  }



}
