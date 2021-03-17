import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-report-tile',
  template: `
    <nz-card style="width:300px;" [nzCover]="coverTemplate" [nzActions]="[actionSetting, actionEdit, actionEllipsis]">
      <nz-card-meta nzTitle="{{report.name}}" nzDescription=""></nz-card-meta>

      <div class="progress">
        <i nz-icon nzType="calendar"></i> {{report.createdOn | date}}

      </div>
    </nz-card>
    <ng-template #extra>

    </ng-template>
    <ng-template #coverTemplate>
<figure class="header-image" style="background-image: url('https://image.freepik.com/free-vector/gradient-shapes-dark-background_52683-32826.jpg');">

</figure>

      <div class="statistics">
        <nz-statistic [nzValue]="(report.chartsAmount | number)!" [nzTitle]="'Zestawienia'" [nzPrefix]="prefixTpl"></nz-statistic>
        <ng-template #prefixTpl><i nz-icon nzType="line-chart"></i></ng-template>
        <!--        This indicator has to be pulled right by hand. Check the CSS-->
        <nz-statistic [nzValue]="(report.isPublic?'TAK':'NIE')" [nzTitle]="'Publiczny'" [nzPrefix]="prefixTpl2" class="active-indicator"></nz-statistic>
        <ng-template #prefixTpl2><i nz-icon nzType="user"></i></ng-template>

      </div>

      <div class="units">
        <nz-tag [nzColor]="'magenta'" class="connected-survey">{{report.connectedSurvey.name}}</nz-tag>
      </div>

    </ng-template>
    <ng-template #actionSetting>
      <i nz-icon [nzType]="'copy'"></i>
    </ng-template>
    <ng-template #actionEdit>
      <i nz-icon nzType="edit"></i>
    </ng-template>
    <ng-template #actionEllipsis>
      <i nz-icon nzType="share-alt"></i>
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

      margin-left:70px;
    }
    .header-image{
      height:100px;
      background-size: cover;
    }
    .connected-survey{
      cursor: pointer;
      transition: 0.2s all;
    }
    .connected-survey:hover{
      transform: scale(1.03);
    }
    .units{
      margin-top:5px;
      margin-left:15px;
      margin-right:15px;
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
export class ReportTileComponent implements OnInit {
  @Input()
  report;
  constructor() { }

  ngOnInit(): void {
  }

}
