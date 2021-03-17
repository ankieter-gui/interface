import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-survey-tile',
  template: `
    <nz-card style="width:300px;" [nzCover]="coverTemplate" [nzActions]="[actionSetting, actionEdit, actionEllipsis, actionCreateReport]">
      <nz-card-meta nzTitle="{{survey.name}}" nzDescription="{{description}}"></nz-card-meta>
      <div class="progress">
        <div class="desc">
          <span>Pytania: {{survey.questionsAmount}}</span>

        </div>
        Zostało jeszcze {{daysLeft}} dni. <br>
        Ankieta trwa {{totalDays}} dni.
        <nz-progress [nzPercent]="(+daysAlready)/(+totalDays)*100 | number: '1.0-0'" nzSize="small"></nz-progress>
      </div>
    </nz-card>
    <ng-template #extra>
            Ankieta
    </ng-template>
    <ng-template #coverTemplate>
      <app-survey-sparkline-chart [survey]="survey"></app-survey-sparkline-chart>
<!--      <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />-->
      <div class="statistics">
        <nz-statistic [nzValue]="(1128 | number)!" [nzTitle]="'Wypełniono'" [nzPrefix]="prefixTpl"></nz-statistic>
        <ng-template #prefixTpl><i nz-icon nzType="line-chart"></i></ng-template>
<!--        This indicator has to be pulled right by hand. Check the CSS-->
        <nz-statistic [nzValue]="(survey.startedOn | date)" [nzTitle]="'Aktywna od'" [nzPrefix]="prefixTpl2" class="active-indicator" [nzValueStyle]="{fontSize:'1.5em'}"></nz-statistic>
        <ng-template #prefixTpl2><i nz-icon nzType="calendar"></i></ng-template>
      </div>
      <div class="units">
        <nz-tag [nzColor]="'magenta'" *ngFor="let unit of survey.targetGroups" class="unit">{{unit}}</nz-tag>
      </div>

    </ng-template>
    <ng-template #actionSetting>
      <i nz-icon [nzType]="'copy'" nz-tooltip [nzTooltipTitle]="'duplikuj'"></i>
    </ng-template>
    <ng-template #actionEdit>
      <i nz-icon nzType="edit" nz-tooltip [nzTooltipTitle]="'Edytuj ankietę'"></i>
    </ng-template>
    <ng-template #actionEllipsis>
     <i nz-icon nzType="download" nz-tooltip [nzTooltipTitle]="'Pobierz XML ankiety'"></i>
    </ng-template>
    <ng-template #actionCreateReport>
      <i nz-icon nzType="folder-add" nz-tooltip [nzTooltipTitle]="'Nowy raport z wyników ankiety'"></i>
    </ng-template>
  `,
  styles: [
    `
    .statistics{
        margin-left:1rem;
      margin-top:0.5rem;
        margin-right:1rem;
      display: flex;

    }
    .active-indicator{

      margin-left:50px;
    }
    .units{
      margin-top:5px;
      margin-left:15px;
      margin-right:15px;
    }
    .unit{
      cursor: pointer;
      transition: 0.2s all;
    }
    .unit:hover{
      transform: scale(1.03);
    }
    nz-card{
      transition: 0.2s all;
    }
    nz-card:hover{

      transform: scale(1.01);
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }
    `
  ]
})
export class SurveyTileComponent implements OnInit {
  @Input()
  survey;
  get description():String{
    return `ID: ${this.survey.id}`
  }
  get totalDays(){
    return Math.round(Math.abs((+this.survey.endsOn) - (+this.survey.startedOn))/8.64e7);
  }
  get daysLeft(){
    return this.totalDays -  Math.round(Math.abs((+this.survey.startedOn) - (+new Date()))/8.64e7);
  }
  get daysAlready(){
    return  Math.round(Math.abs((+this.survey.startedOn) - (+new Date()))/8.64e7);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
