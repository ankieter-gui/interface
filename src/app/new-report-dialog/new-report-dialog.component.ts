import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SurveysService} from '../surveys.service';

@Component({
  selector: 'app-new-report-dialog',
  template: `
    Użyj danych z ankiety:
    <input placeholder="wybierz ankietę" nz-input [(ngModel)]="surveyInputValue" (ngModelChange)="change()"
           [nzAutocomplete]="auto"/>
    <nz-autocomplete #auto>
      <nz-auto-option class="global-search-item" *ngFor="let option of autocompleteSurveys|filterByName:surveyInputValue"
                      [nzValue]="option.name">
        {{ option.name }}

      </nz-auto-option>
    </nz-autocomplete>
    <nz-collapse>
      <nz-collapse-panel [nzHeader]="'Lub użyj własnych danych z pliku .csv'">

        <ngx-file-drop *ngIf="!isFileBeingUploaded" dropZoneLabel="Upuść plik tutaj" (onFileDrop)="dropped($event)"
                       (onFileOver)="fileOver($event)" (onFileLeave)="fileLeave($event)">
          <ng-template ngx-file-drop-content-tmp let-openFileSelector="openFileSelector">
            <span style="display:block;" *ngIf="files.length>0">Wybrano: {{files[0].relativePath}}</span>
            <button nz-button (click)="openFileSelector()">{{files.length>0?"Zmień":"Wybierz"}}</button>
          </ng-template>
        </ngx-file-drop>
        <nz-spin *ngIf="isFileBeingUploaded" nzSimple [nzSize]="'large'"></nz-spin>
      </nz-collapse-panel>
    </nz-collapse>

    <span style="display:block;margin-top:25px;">Nazwa:</span>
    <input placeholder="Nazwa" nz-input [(ngModel)]="reportNameInputValue" (focus)="nameEdited=true"/>

  `,
  styles: [
  ]
})
export class NewReportDialogComponent implements OnInit {
  isFileBeingUploaded=false;
  reportNameInputValue;
  surveyInputValue;
  constructor(private http:HttpClient, private  surveyService:SurveysService) { }
  @Input()
  autocompleteSurveys;
  @Input()
  survey;
  name:string;
  ngOnInit(): void {
    if (this.survey){
      this.surveyInputValue=this.survey.name;
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

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        this.isFileBeingUploaded=true;
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          this.surveyService.uploadData(file,droppedFile.relativePath).subscribe(d=>{
            this.isFileBeingUploaded=false;
            console.log('file sent')
          })


        });
      } else {
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
}
