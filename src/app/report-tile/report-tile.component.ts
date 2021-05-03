import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-report-tile',
  template: `
    <nz-card [nzBordered]="false"  [nzCover]="coverTemplate" [nzActions]="[actionSetting, actionEdit, actionEllipsis, actionSee, actionDelete]">
<!--      <nz-card-meta nzTitle="{{report.name}}" nzDescription=""></nz-card-meta>-->

      <div class="progress">
        <i nz-icon nzType="calendar"></i> {{report.createdOn | date}}

      </div>
    </nz-card>
    <ng-template #extra>

    </ng-template>
    <ng-template #coverTemplate>
<figure class="header-image" style="background-image: url('https://image.freepik.com/free-vector/gradient-shapes-dark-background_52683-32826.jpg');">

</figure>
      <span class="card-title">{{report.name}}</span>


      <div class="units">
        <nz-tag [nzColor]="'magenta'" class="connected-survey">{{report.connectedSurvey.name}}</nz-tag>
      </div>

    </ng-template>
    <ng-template #actionSetting>
      <i nz-icon [nzType]="'copy'" nz-tooltip [nzTooltipTitle]="'Duplikuj'"></i>
    </ng-template>
    <ng-template #actionEdit>
      <i nz-icon nzType="edit" nz-tooltip [nzTooltipTitle]="'Edytuj'"></i>
    </ng-template>
    <ng-template #actionEllipsis>
      <i nz-icon nzType="share-alt" nz-tooltip [nzTooltipTitle]="'Udostępnij'"></i>
    </ng-template>
    <ng-template #actionSee>
      <i nz-icon nzType="eye" nz-tooltip [nzTooltipTitle]="'Podejrzyj'"></i>
    </ng-template>
    <ng-template #actionDelete>
      <i nz-icon nzType="delete" nz-tooltip [nzTooltipTitle]="'Usuń'"></i>
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
      height:116px;
      background-size: cover;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    .card-title{
      padding-left:20px;
      margin-top:-9px;
      font-family: "Gilroy ExtraBold";
      font-size: 18px;
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
        width:395px;
      transition: 0.2s all;
      height: 425px;
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
