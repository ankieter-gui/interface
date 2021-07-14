import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DashboardModalsService} from '../dashboard-modals.service';
import {SurveyMeta} from '../dataModels/survey';
import {SurveysService} from '../surveys.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-survey-tile',
  template: `
    <nz-card [nzBordered]="false"  [nzCover]="coverTemplate" [nzActions]="this.survey.authorId==this.user.userId?[actionShare, actionCreateReport,actionDelete]:[actionCreateReport]">
      <!--      <nz-card-meta nzTitle="{{report.name}}" nzDescription=""></nz-card-meta>-->
      <div class="large-indicator">
        <figure class="indicator-icon"><img src="./assets/answers_count.png" style="width:70px;"></figure>
        <div class="indicator-right-side">
          <div class="indicator-right-side-top">
            {{survey.answersCount}}
          </div>
          <div class="indicator-right-side-bottom">
            Odpowiedzi
          </div>
        </div>
      </div>
      <div class="large-indicator">
        <figure class="indicator-icon"><img src="./assets/time_left.png" style="width:70px;"></figure>
        <div class="indicator-right-side">
          <div class="indicator-right-side-top">
            {{daysAlready/(totalDays==0?daysAlready:totalDays) | percent}}
          </div>
          <div class="indicator-right-side-bottom">
           Czasu minęło
          </div>
        </div>
      </div>
      <div class="progress" style="margin:1em">
<!--                <i nz-icon nzType="user" style="margin-right: 1em"></i>Autor: {{survey.authorName}}-->
              </div>
<!--      <div class="progress">-->
<!--        <i nz-icon nzType="calendar"></i>Utworzono: {{survey.startedOn| date}}-->
<!--      </div>-->
<!--      <div class="progress">-->
<!--      <i nz-icon nzType="calendar"></i>Koniec: {{survey.endsOn| date}}-->
<!--      </div>-->

<!--      <div class="progress">-->
<!--        <i nz-icon nzType="calendar"></i>Odpowiedzi: {{survey.}}-->
<!--      </div>-->
    </nz-card>
    <ng-template #extra>

    </ng-template>
    <ng-template #coverTemplate>
      <figure class="header-image" [style]="'background-image: url(/bkg/'+survey.backgroundImg+');'">

      </figure>
      <span class="card-title">{{survey.name}}</span>


<!--      <div class="units">-->
<!--        <nz-tag [nzColor]="'magenta'" class="connected-survey"></nz-tag>-->
<!--      </div>-->

    </ng-template>
    <ng-template #actionSetting>
      <i nz-icon [nzType]="'copy'" nz-tooltip [nzTooltipTitle]="'Duplikuj'"></i>
    </ng-template>
    <ng-template #actionDelete>
      <i nz-icon [nzType]="'delete'" nz-tooltip [nzTooltipTitle]="'Usuń'" (click)="deleteSurvey()"></i>
    </ng-template>
    <ng-template #actionShare>
      <i nz-icon [nzType]="'share-alt'" nz-tooltip [nzTooltipTitle]="'Udostępnij'" (click)="this.dashboardModals.openShareSurveyDialog(this.survey)"></i>
    </ng-template>
    <ng-template #actionEdit>
      <i nz-icon nzType="edit" nz-tooltip [nzTooltipTitle]="'Edytuj ankietę'"></i>
    </ng-template>
    <ng-template #actionEllipsis>
     <i nz-icon nzType="download" nz-tooltip [nzTooltipTitle]="'Pobierz XML ankiety'"></i>
    </ng-template>
    <ng-template #actionCreateReport>
      <i nz-icon nzType="folder-add" nz-tooltip [nzTooltipTitle]="'Nowy raport z wyników ankiety'" (click)="dashboardModals.openNewReportDialog(this.survey)"></i>
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
      .indicator-right-side-top{

        font-family:"Gilroy ExtraBold";
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

      .statistics {
        margin-left: 1rem;
        margin-top: 0.5rem;
        margin-right: 1rem;
        display: flex;

      }

      .active-indicator {

        margin-left: 70px;
      }

      .header-image {
        height: 116px;
        background-size: cover;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        /*border-bottom-right-radius: 5px;*/
        /*border-bottom-left-radius: 5px;*/
      }

      .card-title {
        padding-left: 20px;
        margin-top: -9px;
        font-family: "Gilroy ExtraBold";
        font-size: 18px;
      }

      .connected-survey {
        cursor: pointer;
        transition: 0.2s all;
      }

      .connected-survey:hover {
        /*transform: scale(1.03);*/
      }

      .units {
        margin-top: 5px;
        margin-left: 15px;
        margin-right: 15px;
      }

      nz-card {
        border-bottom: 5px solid #52e8ed;
        width: 395px;
        transition: 0.2s all;
        height: 425px;
      }

      nz-card:hover {
        border-bottom: 8px solid #52e8ed;
        /*transform: scale(1.01);*/
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      }
    `
  ]
})
export class SurveyTileComponent implements OnInit {

  @Input()
  survey:SurveyMeta;
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
  constructor( public dashboardModals:DashboardModalsService, public surveyService:SurveysService, public user:UserService) { }
  @Output()
  reloadEmitter = new EventEmitter();
  async deleteSurvey(){
    this.dashboardModals.openDeleteConfirmationDialog(this.survey.name, async ()=>{
      await this.surveyService.deleteSurvey(this.survey.id).toPromise()
      this.reloadEmitter.emit()
    })

  }
  ngOnInit(): void {
  }

}
