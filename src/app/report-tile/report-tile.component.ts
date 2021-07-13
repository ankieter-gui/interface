import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReportMeta} from '../dataModels/survey';
import {ReportsService} from '../reports.service';
import {setupTestingRouter} from '@angular/router/testing';
import {Router} from '@angular/router';
import {DashboardModalsService} from '../dashboard-modals.service';
import {UserService} from '../user.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SharingService} from '../sharing.service';

@Component({
  selector: 'app-report-tile',
  template: `
    <nz-card (click)="fromLogin?this.preview():null" [class.fromLogin]="fromLogin" [nzBordered]="false"  [nzCover]="coverTemplate" [nzActions]="this.fromLogin?[]:this.report.authorId==this.user.userId?[actionSetting, actionEdit, actionEllipsis, actionSee, this.actionDelete]:[actionSetting, actionEdit, actionSee]">
<!--      <nz-card-meta nzTitle="{{report.name}}" nzDescription=""></nz-card-meta>-->
      <div class="large-indicator">
        <figure class="indicator-icon"><img src="./assets/answers_count.png" style="width:70px;"></figure>
        <div class="indicator-right-side">
          <div class="indicator-right-side-top small-font">
            {{this.report.connectedSurvey.name}}
          </div>
          <div class="indicator-right-side-bottom">
            Nazwa ankiety
          </div>
        </div>
      </div>
      <div class="large-indicator" *ngIf="!fromLogin">
        <figure class="indicator-icon"><img src="./assets/answers_count.png" style="width:70px;"></figure>
        <div class="indicator-right-side">
          <div class="indicator-right-side-top small-font">
            {{sharedToCount}}
          </div>
          <div class="indicator-right-side-bottom">
            Użytkownicy z dostępem
          </div>
        </div>
      </div>
      <div class="progress" style="margin:1em">
<!--        <i nz-icon nzType="user" style="margin-right: 1em"></i>Autor: {{report.authorName}}-->
      </div>
    </nz-card>
    <ng-template #extra>

    </ng-template>
    <ng-template #coverTemplate>
<figure class="header-image" [style]="'background-image: url(/bkg/'+report.backgroundImg+');'">

</figure>
      <span class="card-title">{{report.name}}</span>


<!--      <div class="units">-->
<!--        <nz-tag [nzColor]="'magenta'" class="connected-survey">{{report.connectedSurvey.name}}</nz-tag>-->
<!--      </div>-->

    </ng-template>

    <ng-template #actionSetting>
      <i nz-icon [nzType]="'copy'" nz-tooltip [nzTooltipTitle]="'Duplikuj'" (click)="copy()"></i>
    </ng-template>
    <ng-template #actionEdit>
      <i nz-icon nzType="edit" nz-tooltip [nzTooltipTitle]="'Edytuj'" [routerLink]="['reports/editor', report.id]"></i>
    </ng-template>
    <ng-template #actionEllipsis>
      <i nz-icon nzType="share-alt" nz-tooltip [nzTooltipTitle]="'Udostępnij'" (click)="this.modals.openShareReportDialog(this.report)"></i>
    </ng-template>
    <ng-template #actionSee>
      <i nz-icon nzType="eye" nz-tooltip [nzTooltipTitle]="'Podejrzyj'" (click)="preview()"></i>
    </ng-template>
    <ng-template #actionDelete>
      <i nz-icon nzType="delete" nz-tooltip [nzTooltipTitle]="'Usuń'" (click)="delete()"></i>
    </ng-template>
    <ng-template #actionDownload>
      <i nz-icon nzType="file-pdf" nz-tooltip [nzTooltipTitle]="'Pobierz jako PDF'" (click)="PDF()"></i>
    </ng-template>
  `,
  styles: [
    `
      .large-indicator{
        display: flex;
        flex-direction: row;
      }
      .indicator-right-side{
        margin-left:1em;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .indicator-right-side-bottom{
        margin-top:0.7em;
        font-family: "Gilroy Light";
        font-style: normal;
        font-weight: 300;
        font-size: 14px;
        line-height: 16px;
        letter-spacing: 0.01em;

        color: #A6ACBE;

      }
      .fromLogin{
        cursor: pointer;
      }
      .indicator-right-side-top{

        font-family: "Gilroy ExtraBold";
        font-style: normal;
        font-weight: 800;
        font-size: 28px;
        line-height: 24px;

        /* or 86% */
        display: flex;
        align-items: center;
        letter-spacing: 0.01em;

        color: #000000;
      }
      .indicator-right-side-top.small-font{
        font-size: 17px;
      }
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
      /*border-bottom-right-radius: 5px;*/
      /*border-bottom-left-radius: 5px;*/
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
      /*transform: scale(1.03);*/
    }
    .units{
      margin-top:5px;
      margin-left:15px;
      margin-right:15px;
    }
    nz-card{
      border-bottom:5px solid #6F52ED;
        width:395px;
      transition: 0.2s all;
      height: 425px;
    }
    nz-card:hover{
      border-bottom:8px solid #6F52ED;
      /*transform: scale(1.01);*/
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }

    `
  ]
})
export class ReportTileComponent implements OnInit {
  @Input()
  report:ReportMeta;
  @Output()
  reloadEmitter = new EventEmitter();
  constructor(public sharing:SharingService, private reportService:ReportsService, private router:Router, public modals:DashboardModalsService, public user:UserService, public message:NzMessageService) { }
  get sharedToCount(){
    return Object.keys(this.report.sharedTo).length
  }
  @Input()
  fromLogin=false;
  ngOnInit(): void {
  }
  async copy(){
    this.message.info('Skopiowano')
    let response = await (this.reportService.copy(this.report.id).toPromise())
    this.router.navigate(["/reports/editor/",response['reportId']])
    // this.reloadEmitter.emit()
  }
  async delete(){
    await (this.reportService.deleteReport(this.report.id).toPromise())
    this.reloadEmitter.emit()
    this.message.info('Usunięto')
  }
  async PDF(){
    this.router.navigateByUrl(`/reports/${this.report.id}`, {
      state: {shallPrint:true}
    });
  }
  async preview(){
    this.router.navigateByUrl(`/reports/${this.report.id}`,{
      state: {shallPrint:false}
    });
  }
  async previewFromLink(){
    let r = await this.sharing.getReportSharingLink(this.report.id, 'r').toPromise()
    console.log(r)
    // this.router.navigateByUrl(`/reports/${this.report.id}`,{
    //   state: {shallPrint:false}
    // });
  }
}
