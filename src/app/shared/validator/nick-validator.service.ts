import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { User } from '../../interfaces/user';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NickValidatorService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

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
          return (!nicks.includes(nick)) ? null : {nickTomado: true}
        })
      )
  }
}
