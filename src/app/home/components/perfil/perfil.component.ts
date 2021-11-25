import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  counters!: any;
  userLogged!: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getCounters();
    this.userLogged = this.userService.usuario;
  }

  getCounters(){
    this.userService.getCounters().subscribe(res =>{
      this.counters = res;
    })
  }

}
