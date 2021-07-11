import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {DashboardService} from '../dashboard.service';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {

  constructor(public user:UserService, public dashobard:DashboardService) { }
  dashboardData;
  ngOnInit(): void {
    this.dashobard.getDashobardData().subscribe(d=>this.dashboardData=d['objects'])
  }

}
