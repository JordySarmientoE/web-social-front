import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../services/user-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
  }

}
