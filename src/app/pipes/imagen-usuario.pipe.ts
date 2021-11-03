import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user';

@Pipe({
  name: 'imagenUsuario',
  pure: true
})
export class ImagenUsuarioPipe implements PipeTransform {

  transform(user: User): string {
    if(!user.image){
      return 'assets/no-image.png'
    }
    else{
      return user.image
    }
  }

}
