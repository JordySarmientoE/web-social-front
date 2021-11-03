import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../../services/user-service.service';
import Swal from 'sweetalert2';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    email:    ['', [ Validators.required,Validators.pattern(this.vS.emailPattern) ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
  });

  constructor(private fb: FormBuilder, private userService: UserServiceService,
    private vS: ValidatorService, private router: Router) { }

  ngOnInit(): void {
  }

  get emailErrorMsg(): string{
    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.required){
      return 'Email es Obligatorio'
    } else if(errors?.pattern){
      return 'No tiene formato de correo'
    }
    return ''
  }

  login(){
    const {email, password} = this.miFormulario.value;
    this.userService.login(email, password).subscribe(data => {
      this.router.navigateByUrl('/home')
    },err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Usuario o contraseña incorrecto!`,
        confirmButtonText: 'OK'
      }).then((result) => {
        if(result.isConfirmed){
          this.miFormulario.get('password')?.reset();
        }
      })
    })
  }

  campoNoValido(campo: string){
    return this.miFormulario.get(campo)?.invalid
      && this.miFormulario.get(campo)?.touched 
  }

}
