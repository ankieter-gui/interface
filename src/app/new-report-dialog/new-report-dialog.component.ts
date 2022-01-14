import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SurveysService} from '../surveys.service';
import {SharingService} from '../sharing.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SurveyMeta} from '../dataModels/survey';

@Component({
  selector: 'app-new-report-dialog',
  template: `
    <ng-template #suffixIconSearch>
      <i nz-icon nzType="caret-down" style="cursor:pointer;" (click)="surveyInput.select()"></i>
    </ng-template>
    Użyj danych z ankiety:
    <nz-input-group [nzSuffix]="suffixIconSearch">

      <input #surveyInput placeholder="wybierz ankietę" nz-input [(ngModel)]="surveyInputValue" (ngModelChange)="change()"
             [nzAutocomplete]="auto"/>
      <nz-autocomplete #auto>
        <nz-auto-option class="global-search-item" *ngFor="let option of autocompleteSurveys|filterByName:surveyInputValue"
                        [nzValue]="option.name">
          {{ option.name }} ({{option.answersCount}} odpowiedzi)

        </nz-auto-option>
      </nz-autocomplete>
    </nz-input-group>
<!--    <nz-collapse style="margin-top:1em;">-->
<!--      <nz-collapse-panel [nzHeader]="'Lub użyj własnych danych z pliku .csv'">-->
<!--        CSV:-->
<!--        <ngx-file-drop *ngIf="!isFileBeingUploaded" dropZoneLabel="Upuść plik tutaj" (onFileDrop)="dropped($event)"-->
<!--                       (onFileOver)="fileOver($event)" (onFileLeave)="fileLeave($event)" accept=".csv">-->
<!--          <ng-template ngx-file-drop-content-tmp let-openFileSelector="openFileSelector">-->
<!--            <span style="display:block;" *ngIf="files.length>0">Wybrano: {{files[0].relativePath}}</span>-->
<!--            <button nz-button (click)="openFileSelector()">{{files.length > 0 ? "Zmień" : "Wybierz"}}</button>-->
<!--          </ng-template>-->
<!--        </ngx-file-drop>-->
<!--        XML:-->
<!--        <ngx-file-drop *ngIf="!isFileBeingUploaded" dropZoneLabel="Upuść plik tutaj" (onFileDrop)="droppedXML($event)"-->
<!--                       (onFileOver)="fileOverXML($event)" (onFileLeave)="fileLeaveXML($event)" accept=".xml">-->
<!--          <ng-template ngx-file-drop-content-tmp let-openFileSelector="openFileSelector">-->
<!--            <span style="display:block;" *ngIf="filesXML.length>0">Wybrano: {{filesXML[0].relativePath}}</span>-->
<!--            <button nz-button (click)="openFileSelector()">{{filesXML.length>0?"Zmień":"Wybierz"}}</button>-->
<!--          </ng-template>-->
<!--        </ngx-file-drop>-->
<!--        <nz-alert *ngIf="(filesXML.length==1 && files.length==0) ||(filesXML.length==0 && files.length==1) " nzType="warning" nzMessage="Musisz wybrać plik .csv i .xml!" style="margin-top:2em"></nz-alert>-->
<!--        <nz-spin *ngIf="isFileBeingUploaded" nzSimple [nzSize]="'large'"></nz-spin>-->
<!--      </nz-collapse-panel>-->
<!--    </nz-collapse>-->

    <span style="display:block;margin-top:25px;">Nazwa:</span>
    <input placeholder="Nazwa" nz-input [(ngModel)]="reportNameInputValue" (focus)="nameEdited=true"/>
    <p *ngIf="error" style="color:red;">{{errorMsg}}</p>
  `,
  styles: [
  ]
})
export class NewReportDialogComponent implements OnInit {
  isFileBeingUploaded=false;
  reportNameInputValue;
  surveyInputValue;
  error=false;
  errorMsg = "Nazwa nie może być pusta!"
  constructor(private http:HttpClient, private  surveyService:SurveysService, public message:NzMessageService) { }

  @Input()
  autocompleteSurveys: SurveyMeta[];
  @Input()
  survey;
  name:string;
  ngOnInit(): void {
    if (this.survey){
      this.surveyInputValue=this.survey.name;
      this.reportNameInputValue="Raport: "+this.survey.name
    }
  }
  get selectedSurvey() {
    return this.autocompleteSurveys.filter(e => e.name==this.surveyInputValue)[0]
  }
  nameEdited=false;
  change(){
    if (!this.nameEdited){
      this.reportNameInputValue ="Raport: "+this.surveyInputValue
    }
  }

  public files: NgxFileDropEntry[] = [];
  public filesXML: NgxFileDropEntry[] = [];
  public fileEntry:FileSystemFileEntry;
  public fileEntryXML:FileSystemFileEntry;
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
            if (!this.reportNameInputValue || (this.reportNameInputValue && this.files.length>0 && this.reportNameInputValue.includes("Raport z "))) this.reportNameInputValue="Raport z "+droppedFile.fileEntry.name
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  public droppedXML(files: NgxFileDropEntry[]) {
    this.filesXML = files;
    for (const droppedFile of files) {
      this.fileEntryXML = droppedFile.fileEntry as FileSystemFileEntry;
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {

        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);

      }
    }
  }
  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }
  public fileOverXML(event){
    console.log(event);
  }

  public fileLeaveXML(event){
    console.log(event);
  }
}
