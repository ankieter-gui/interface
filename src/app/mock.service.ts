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
  public surveyToChart(survey:SurveyMeta, showAxes=false): EChartsOption{
    return {
      color:"#3b3b3b",
      grid: showAxes?
        {
          left:25,
          top: 25,
          right: 5,
          bottom: 25
        }
        :{
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      xAxis:{
        type: 'time',
        show:showAxes,

      },

      yAxis:{
        type:'value',
        show:showAxes,
      },
      series:[
        {
          data:survey.responses.map(e=>[e.date,e.value]),
          type:'line',
          color:'#009063',
          smooth: false,
          symbol: 'none',
          areaStyle:{
            color: new graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#009063'
            }, {
              offset: 1,
              color:  '#009063'
            }])
          }

        }
      ]
    }
  }
   mockDashboardDataMergedSorted(filter=""){
    return [...this.mockDashboardData.surveys,...this.mockDashboardData.reports].sort((x:any,y:any)=>x.createdOn-y.createdOn).reverse().filter(e=>e.type==filter || filter=="")
  }
  public static survey__repr__(survey){
    //TODO: move this to survey class as __repr__
    return survey.name + survey.startedOn
  }

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
  public mockDashboardData:{surveys:SurveyMeta[], reports:ReportMeta[]}={
    surveys:[
      {
        type:"survey",
        name: "Survey #1",
        questionsAmount:15,
        isActive:true,
        isPublic:false,
        startedOn:1615915809432,
        createdOn:1615915809432,
        endsOn:1645915809432,
        responses:[
          {
            date:1615915809432,
            value:0,
          },
          {
            date:1615915849432,
            value:5,
          },
          {
            date:1615916809432,
            value:25,
          },
          {
            date:1615916829432,
            value:30,
          },
          {
            date:1615916829632,
            value:40,
          },
          {
            date:1615916899632,
            value:43,
          },


        ],
        targetGroups:["Biologia", "Matematyka"],
        id:"350925390",

      },
      {
        type:"survey",
        isActive: false,
        name: "Ankieta zadowolenia 2020",
        questionsAmount:15,
        startedOn:1515915809432,
        isPublic:true,
        createdOn:1515915809432,
        endsOn:1715915809432,
        responses:[
          {
            date:1615915809432,
            value:0,
          },
          {
            date:1615915849432,
            value:5,
          },
          {
            date:1615916809432,
            value:25,
          },
          {
            date:1615916829432,
            value:30,
          },
          {
            date:1615916829632,
            value:40,
          },
          {
            date:1615916899632,
            value:43,
          },


        ],
        targetGroups:["Wszystkie jednostki"],
        id:"350925390",

      }
    ],
    reports:[
      {
        id:"#1243142",
        type: "report",
        name: "Raport dla dziekana o jakości kształcenia",
        connectedSurvey:{name:"Ankieta zadowolenia 2020", id:"350925390",},
        chartsAmount:37,
        createdOn:1615916899632,
        isPublic:false,
        sharedTo:["uid1", "uid2"],
      }
    ],

  };
}
