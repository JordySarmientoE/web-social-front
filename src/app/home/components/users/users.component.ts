import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../services/user-service.service';
import { User } from '../../../interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  user!: User;
  next_page!: number;
  page!: number;
  prev_page!: number;
  total!: number;
  pages!: number;
  users!: User[];
  follows!: string[]

  constructor(private userService: UserServiceService, private _route: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.user = this.userService._usuario;
    this.actualPage()
  }

  actualPage(){
    this._route.params.subscribe(params => {
      let page = +params['page'];
      this.page = page;

      if(!params['page']){
        page = 1;
      }

      if(!page){
        page = 1;
      }
      else{
        this.next_page = page+1;
        this.prev_page = page-1;

        if(this.prev_page <= 0){
          this.prev_page = 1;
        }
      }

      this.getUsers(page)
    })
  }

  getUsers(page: number){
    this.userService.getUsers(page).subscribe((res : any) => {
      this.total = res.total;
      this.users = res.usuarios;
      this.pages = res.pages;
      this.follows = res.users_following?.following;
      if(page > this.pages){
        this.route.navigate(['/home/users',1])
      }
    })
  }

  goToNext(){
    this.route.navigate(['/home/users',this.next_page])
  }

  goToPrevious(){
    this.route.navigate(['/home/users',this.prev_page])
  }

}
