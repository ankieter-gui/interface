import { Injectable } from '@angular/core';
import {EChartsOption} from 'echarts';
import { graphic } from 'echarts';
import chance from 'chance';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() { }
  public surveyToChart(survey): EChartsOption{
    return {
      color:"#3b3b3b",
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      xAxis:{
        type: 'time',
        show:false,

      },

      yAxis:{
        type:'value',
        show:false,
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

  public mockUsersAndGroupsData={
    groups:[
      {name:"dziekani", users:['1','2']},
      {name:"biologia", users:['1']}
    ],
    users:[
      {name:"Stefan Czarnecki", id:'1'},
      {name:"Jacek Placek", id:'2'},
      {name:"Pani Róża", id:'3'},
      {name:"Pani Jadzia z urzędu", id:'4'},
    ]
  }
  public mockDashboardData={
    surveys:[
      {
        type:"survey",
        name: "Survey #1",
        questionsAmount:15,
        isActive:true,
        startedOn:1615915809432,
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
