import { Component, OnInit } from '@angular/core';
import {MockService} from '../mock.service';

import * as sChance from 'chance'
import {animate, query, stagger, state, style, transition, trigger} from '@angular/animations';
import {DashboardModalsService} from '../dashboard-modals.service';
import {NewReportDialogComponent} from '../new-report-dialog/new-report-dialog.component';
import {Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger("hide", [
      state('open', style({
        transform:'translateY(0%)',
        opacity: 1,

      })),
      state('closed', style({

        opacity: 0,
        transform:'translateY(15%)',
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
    trigger('fadeInOut', [
      state('in', style({ opacity:1,transform: 'translateY(0)' })),
      transition('void => *', [

        style({ opacity:0,transform: 'translateY(15%)' }),

        animate('200ms')

      ]),
      transition('* => void', [
        // animate(200, style({ opacity:0,transform: 'translateY(15%)' }))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {

  constructor(public mockService:MockService, public dashboardModals:DashboardModalsService, public router:Router) {
    console.log(this.router.getCurrentNavigation().extras?.state?.example);
  }

  ngOnInit(): void {
  }
  inputValue;
  filter="";
  filter_tmp=""
  loading="open"
  hideAndShow(criterion){
    if (this.filter_tmp==criterion) return;
    this.loading="closed"
    setTimeout(()=>{this.loading="open"}, 400)
     setTimeout(()=>{this.filter=criterion}, 200)
    this.filter_tmp=criterion;
  }

  onChange(event){

  }
  randomAvatart():String{
    return sChance().avatar();
  }



}
