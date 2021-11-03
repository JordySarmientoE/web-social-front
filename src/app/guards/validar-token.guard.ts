import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate {

  constructor(private userService: UserServiceService, private router: Router){}

  canActivate(): Observable<boolean> | boolean {
    return this.userService.validarToken()
            .pipe(
              tap( valid => {
                if ( !valid ) {
                  this.router.navigateByUrl('/auth');
                }
              })
            );
  }

  canLoad(): Observable<boolean> | boolean {
    return this.userService.validarToken()
      .pipe(
        tap( valid => {
          if ( !valid ) {
            this.router.navigateByUrl('/auth');
          }
        })
      );
  }
  
}
