import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../services/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
  }

}
