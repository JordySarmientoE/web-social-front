import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../interfaces/user';
import { FollowService } from '../../../../services/follow.service';
import { UserServiceService } from '../../../../services/user-service.service';
import { Follow } from '../../../../interfaces/follow';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user!: any;
  @Input() follows: string[] = [];
  userLogged!: User;

  followUserOver!:string | number;

  constructor(private followService: FollowService, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.userLogged = this.userService.usuario;
  }

  mouseOver(user_id: string){
    this.followUserOver = user_id;
  }

  mouseLeave(user_id: string){
    this.followUserOver = 0;
  }

  followUser(followed: string){
    this.followService.addFollow(followed).subscribe(res => {
      this.follows.push(followed)
    }, err => {
      console.log(err)
    })
  }

  unFollowUser(followed: string){
    this.followService.deleteFollow(followed).subscribe(res => {
      let search = this.follows.indexOf(followed);
      if(search != -1){
        this.follows.splice(search, 1)
      }
    }, err => {
      console.log(err)
    })
  }

}
