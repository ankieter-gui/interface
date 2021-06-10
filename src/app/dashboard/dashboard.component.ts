import {Component, OnInit, ViewChild} from '@angular/core';
import {MockService} from '../mock.service';

import * as sChance from 'chance'
import {animate, query, stagger, state, style, transition, trigger} from '@angular/animations';
import {DashboardModalsService} from '../dashboard-modals.service';
import {NewReportDialogComponent} from '../new-report-dialog/new-report-dialog.component';
import {Router} from '@angular/router';
import {DashboardService} from '../dashboard.service';
import {DashboardRequestResponse} from '../dataModels/DashboardRequestResponse';
import {UserService} from '../user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger("hide", [
      state('open', style({
        transform: 'translateY(0%)',
        opacity: 1,

      })),
      state('closed', style({

        opacity: 0,
        transform: 'translateY(15%)',
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
    trigger('fadeInOut', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [

        style({ opacity: 0, transform: 'translateY(15%)' }),

        animate('200ms')

      ]),
      transition('* => void', [
        // animate(200, style({ opacity:0,transform: 'translateY(15%)' }))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  constructor(public mockService: MockService, public dashboardModals: DashboardModalsService, public router: Router, public dashboardService:DashboardService, public user:UserService) {
    console.log(this.router.getCurrentNavigation().extras?.state?.example);
  }
  @ViewChild('sidenav', {static: true}) sidenav;
  inputValue;
  filter = "";
  filter_tmp = ""
  loading = "open"
  dashboardData:DashboardRequestResponse={objects:[]};
  ngOnInit(): void {
    this.dashboardService.getDashobardData().subscribe(d=>{ this.dashboardData = d; console.log(this.dashboardData)});
  }
  changeFilter(criterion: string, animate= true){
    if (this.filter_tmp == criterion) { return; }
    if (animate) {this.hideAndShow();
                  setTimeout(() => {this.filter = criterion}, 200); }
    else{this.filter = criterion}
    console.log(criterion)
    this.filter_tmp = criterion;
  }
  hideAndShow(){
    this.loading = "closed"
    setTimeout(() => {this.loading = "open"}, 400)
  }
  onChange(event: Event){
    if (this.inputValue.length == 1){
      this.changeFilter('', false);
    }
  }
  onlyMine=false;
  onlyNotMine=false
  randomAvatart(): string{
    return sChance().avatar();
  }
  reload(){
    this.dashboardService.getDashobardData().subscribe(d=>{ this.dashboardData = d; console.log(this.dashboardData)});



  }


}
