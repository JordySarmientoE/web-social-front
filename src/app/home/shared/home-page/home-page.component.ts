import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../../services/user-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  
  usuario: any;

  constructor(private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = this.userService.usuario;
  }

  logout(){
    this.router.navigateByUrl('/auth');
    this.userService.logout();
  }

  user(){

  }

  personalInformation(){
    
  }

}
