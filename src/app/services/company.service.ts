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
export class CompanyService {

  constructor(private http: HttpClient) { 

  }

  createCompany( form:any ): Observable<any> {
    let url = `${ base_url }/api/companies/create`;  
    return this.http.post(url, form)
  }

  getOneCompany(id: number) : Observable<any> {
    let url = `${ base_url }/api/companies/${id}`;  
    return this.http.get(url)
  }

  getCompanies() : Observable<any> {
    let url = `${ base_url }/api/companies`;  
    return this.http.get(url)
  }



}
