import { Component, OnInit } from '@angular/core';

import { UsersService } from './users.service';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.users = this.usersService.getUsers();
  }
}
