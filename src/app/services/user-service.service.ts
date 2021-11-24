import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  apiUrl = environment.apiUrl;
  _usuario!: User;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string){
    const body = {email, password}
    return this.http.post<any>(`${this.apiUrl}/auth/login`,body)
      .pipe(
        tap(resp => {
          if(resp.usuario){
            localStorage.setItem('token',resp.token!)
          }
        })
      )
  }

  register(usuario: User){
    return this.http.post<User>(`${this.apiUrl}/auth`,usuario)
  }

  validarToken(): Observable<boolean>{
    const url = `${ this.apiUrl }/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );

    return this.http.get<any>(url, {headers})
      .pipe(
        map(resp => {
          localStorage.setItem('token', resp.token! );
          this._usuario = {
            name: resp.name,
            _id: resp._id,
            email: resp.email,
            image: resp.image,
            role: resp.role,
            surname: resp.surname,
            nick: resp.nick
          }
          return resp.ok;
        }),
        catchError(err => of(false))
      )
  }

  logout() {
    localStorage.clear();
  }

  updateData(usuario: User){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    const url = `${ this.apiUrl }/user/${this.usuario._id}`;
    return this.http.put<User>(url,usuario,{headers}).pipe(
      tap(resp => {
        console.log("Respuesta",resp)
        this._usuario = {
          name: resp.name,
          _id: resp._id,
          email: resp.email,
          image: resp.image,
          role: resp.role,
          surname: resp.surname,
          nick: resp.nick
        }

      })
    );
  }

  getCounters(): Observable<any>{
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );

    const url = `${ this.apiUrl }/counters`;

    return this.http.get<any>(url,{headers});

  }

  makeFileRequest(uploadData: any){
    const url = `${ this.apiUrl }/image/${this.usuario._id}`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );

    
    return this.http.post<User>(url,uploadData,{headers})

  }

  getUsers(page: number){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    
    return this.http.get(`${this.apiUrl}/users/${page}`,{headers})
  }

  getUser(id: string){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    
    return this.http.get(`${this.apiUrl}/users/${id}`,{headers})
  }

}
