import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';
import { NickupdateServiceService } from '../../../shared/update/nickupdate-service.service';
import { EmailupdateServiceService } from '../../../shared/update/emailupdate-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss']
})
export class MyDataComponent implements OnInit {

  selectedFile!: File;

  image: string = '';

  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.vS.emailPattern)], [this.ev]],
    password: ['', [Validators.minLength(6)]],
    password2: ['', [Validators.minLength(6)]],
    surname: ['', [Validators.required, Validators.pattern(this.vS.apellidoPattern)]],
    name: ['', [Validators.required]],
    nick: ['', [Validators.required, Validators.minLength(4)], [this.nv]],
  }, {
    validators: [this.vS.camposIguales('password', 'password2')]
  });

  data!: User;

  constructor(private fb: FormBuilder, private vS: ValidatorService, private nv: NickupdateServiceService,
    private ev: EmailupdateServiceService, private userService: UserService, private router: Router) { }


  ngOnInit(): void {
    this.data = this.userService.usuario;

    this.miFormulario.get('email')?.setValue(this.data.email)
    this.miFormulario.get('surname')?.setValue(this.data.surname)
    this.miFormulario.get('name')?.setValue(this.data.name)
    this.miFormulario.get('nick')?.setValue(this.data.nick)

    this.image != this.data.image;
  }

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.required) {
      return 'Email es Obligatorio'
    } else if (errors?.pattern) {
      return 'No tiene formato de correo'
    } else if (errors?.emailTomado) {
      return 'El email ya ha sido tomado'
    }
    return ''
  }

  get nickErrorMsg(): string {
    const errors = this.miFormulario.get('nick')?.errors;
    if (errors?.required) {
      return 'El Nick es Obligatorio'
    } else if (errors?.nickTomado) {
      return 'El nick ya ha sido tomado'
    }
    return ''
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid
      && this.miFormulario.get(campo)?.touched
  }

  actualizar() {
    const { email, password, surname, name, nick } = this.miFormulario.value;
    let body;
    if (String(password).length > 0) {
      body = { email, password, surname, name, nick };
    }
    else {
      body = { email, surname, name, nick };
    }
    this.userService.updateData(body).subscribe(data => {
      this.userService._usuario.name = data.name;
      this.userService._usuario.nick = data.nick; 
      this.userService._usuario.surname = data.surname
      this.userService._usuario.email = data.email
      this.userService._usuario.password = data.password
    }, err => {
      console.log(err)
    })

    if (this.selectedFile) {
      const uploadData = new FormData();
      uploadData.append('image', this.selectedFile, this.selectedFile.name);
      this.userService.makeFileRequest(uploadData).subscribe(data => {
        this.userService._usuario.image = data.image;
      })
    }

    

    Swal.fire({
      icon: 'success',
      title: 'ACTUALIZADO',
      text: `Usuario actualizado!`,
      confirmButtonText: 'OK'
    }).then((result) => {
      if(result.isConfirmed){
        //this.router.navigateByUrl('/home')
      }
    })
    
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
  }

}
