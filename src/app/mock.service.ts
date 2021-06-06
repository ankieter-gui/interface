import { Injectable } from '@angular/core';
import {EChartsOption} from 'echarts';
import { graphic } from 'echarts';
import chance from 'chance';
import {ReportMeta, SurveyMeta} from './dataModels/survey';
import {UserGroupsResponse} from './dataModels/UserGroup';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() { }


  public mockUsersAndGroupsData:UserGroupsResponse={
    groups:[
      {name:"dziekani", users:['1','2']},
      {name:"biologia", users:['1']}
    ],
    users:[
      {name:"Stefan Czarnecki", uid:'1'},
      {name:"Jacek Placek", uid:'2'},
      {name:"Pani Róża", uid:'3'},
      {name:"Pani Jadzia z urzędu", uid:'4'},
    ]
  }

}
