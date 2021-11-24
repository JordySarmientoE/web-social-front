import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addFollow(followed: any){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    let params = {
      followed
    }
    return this.http.post(`${this.apiUrl}/follow`,params,{headers})
  }

  deleteFollow(id: string){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    return this.http.delete(`${this.apiUrl}/follow/${id}`,{headers})
  }
}
