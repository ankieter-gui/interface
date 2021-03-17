import { Component, OnInit } from '@angular/core';
import {MockService} from '../mock.service';

import * as sChance from 'chance'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public mockService:MockService) { }

  ngOnInit(): void {
  }
  inputValue;
  filter="";
  onChange(event){

  }
  randomAvatart():String{
    return sChance().avatar();
  }

}
