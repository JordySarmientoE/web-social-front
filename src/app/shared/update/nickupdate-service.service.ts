import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { User } from '../../interfaces/user';
import { delay, map } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class NickupdateServiceService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private userService: UserService) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const nick = String(control.value).toLowerCase();

    return this.http.get<User[]>(`${this.apiUrl}/all-users`)
      .pipe(
        delay(1000),
        map(resp => {
          let nicks: String[] = []
          resp.forEach(value => {
            nicks.push(value.nick.toLowerCase())
          })
          const user = this.userService.usuario.nick.toLowerCase();
          const id = nicks.indexOf(nick);
          let nicktomado; 
          if(id >= 0 && user != nick){
            nicktomado = true;
          }
          else{
            nicktomado = false;
          }
          return (!nicktomado ) ? null : {nickTomado: true}
        })
      )
  }
}
