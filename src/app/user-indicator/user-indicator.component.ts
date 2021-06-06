import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-indicator',
  templateUrl: './user-indicator.component.html',
  styleUrls: ['./user-indicator.component.css']
})
export class UserIndicatorComponent implements OnInit {

  constructor(public user:UserService) { }

  ngOnInit(): void {
  }

}
