import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';
import { NickValidatorService } from '../../../shared/validator/nick-validator.service';
import { UserServiceService } from '../../../services/user-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    email:    ['', [ Validators.required,Validators.pattern(this.vS.emailPattern)],[this.ev]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required, Validators.minLength(6) ]],
    surname: ['', [ Validators.required, Validators.pattern(this.vS.apellidoPattern) ]],
    name: ['', [ Validators.required ]],
    nick: ['', [ Validators.required, Validators.minLength(4) ],[this.nv]],
  },{
    validators: [this.vS.camposIguales('password','password2')]
  });

  constructor(private fb: FormBuilder, private vS: ValidatorService, private ev: EmailValidatorService,
    private nv: NickValidatorService, private userService: UserServiceService,
    private router: Router) { }

  ngOnInit(): void {
  }

  get emailErrorMsg(): string{
    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.required){
      return 'Email es Obligatorio'
    } else if(errors?.pattern){
      return 'No tiene formato de correo'
    }else if(errors?.emailTomado){
      return 'El email ya ha sido tomado'
    }
    return ''
  }

  get nickErrorMsg(): string{
    const errors = this.miFormulario.get('nick')?.errors;
    if(errors?.required){
      return 'El Nick es Obligatorio'
    } else if(errors?.nickTomado){
      return 'El nick ya ha sido tomado'
    }
    return ''
  }

  register(){
    const {name, surname, nick, email, password} = this.miFormulario.value;
    const body = {name, surname, nick, email, password};

    this.userService.register(body).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: 'REGISTRADO',
        text: `Usuario ${nick.toUpperCase()} creado!`,
        confirmButtonText: 'OK'
      }).then((result) => {
        if(result.isConfirmed){
          this.router.navigateByUrl('/auth/login')
        }
      })
    })
  }

  campoNoValido(campo: string){
    return this.miFormulario.get(campo)?.invalid
      && this.miFormulario.get(campo)?.touched 
  }

}
