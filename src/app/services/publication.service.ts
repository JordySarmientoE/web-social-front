import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addPublication(text: string){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    let params = {
      text
    }
    return this.http.post(`${this.apiUrl}/publication`,params,{headers})
  }

  makeFileRequest(uploadData: any, id: string){
    const url = `${ this.apiUrl }/publication/${id}`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );

    
    return this.http.post(url,uploadData,{headers})

  }
}
