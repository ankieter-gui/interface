import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {BACKEND_URL, LOGIN_SERVICE_URL} from '../Configuration';

@Component({
  selector: 'app-user-indicator',
  templateUrl: './user-indicator.component.html',
  styleUrls: ['./user-indicator.component.css']
})
export class UserIndicatorComponent implements OnInit {

  constructor(public user:UserService, private window:Window) { }

  ngOnInit(): void {
  }
  logout(){
    this.user.logout()
  }

}
