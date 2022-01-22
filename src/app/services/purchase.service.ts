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
export class PurchaseService {

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

  createPurchase( form:any ): Observable<any> {
    let url = `${ base_url }/api/purchases/create`;  
    return this.http.post(url, form, this.headers)
  }

  listPurchasesSeller(page:number, limit:number): Observable<any> {
    let url = `${ base_url }/api/purchases/seller?page=${page}&limit=${limit}`;  
    return this.http.get(url, this.headers)
  }

  
}
