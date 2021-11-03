import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { delay, map } from 'rxjs/operators';
import { User } from '../../interfaces/user';
import { UserServiceService } from '../../services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class EmailupdateServiceService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private userService: UserServiceService) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const nick = String(control.value).toLowerCase();

    return this.http.get<User[]>(`${this.apiUrl}/all-users`)
      .pipe(
        delay(1000),
        map(resp => {
          let nicks: String[] = []
          resp.forEach(value => {
            nicks.push(value.email.toLowerCase())
          })
          const user = this.userService.usuario.email.toLowerCase();
          const id = nicks.indexOf(nick);
          let emailtomado;
          
          if(id >= 0 && user != nick){
            emailtomado = true;
          }
          else{
            emailtomado = false;
          }
          return (!emailtomado) ? null : {nickTomado: true}
        })
      )
  }
}
