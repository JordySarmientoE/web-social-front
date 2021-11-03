import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators'
import { User } from 'src/app/interfaces/user';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = String(control.value).toLowerCase();
    
    return this.http.get<User[]>(`${this.apiUrl}/all-users`)
      .pipe(
        delay(1000),
        map(resp => {
          let emails: String[] = []
          resp.forEach(value => {
            emails.push(value.email.toLowerCase())
          })
          return (!emails.includes(email)) ? null : {emailTomado: true}
        })
      )
  }

}
