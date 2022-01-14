import { Component, OnInit } from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {SurveysService} from '../surveys.service';

@Component({
  selector: 'app-survey-editor-xmlupload-dialog',
  template: `
    XML:
    <ngx-file-drop *ngIf="!isFileBeingUploaded" dropZoneLabel="Upuść plik tutaj" (onFileDrop)="droppedXML($event)"
                   (onFileOver)="fileOverXML($event)" (onFileLeave)="fileLeaveXML($event)" accept=".xml">
      <ng-template ngx-file-drop-content-tmp let-openFileSelector="openFileSelector">
        <span style="display:block;" *ngIf="filesXML.length>0">Wybrano: {{filesXML[0].relativePath}}</span>
        <button nz-button (click)="openFileSelector()">{{filesXML.length>0?"Zmień":"Wybierz"}}</button>
      </ng-template>
    </ngx-file-drop>
    <nz-spin *ngIf="isFileBeingUploaded" nzSimple [nzSize]="'large'"></nz-spin>
    <p *ngIf="error" style="color:red;">{{errorMsg}}</p>
  `,
  styles: [
  ]
})
export class SurveyEditorXMLUploadDialogComponent implements OnInit {
  public filesXML: NgxFileDropEntry[] = [];
  public fileEntryXML:FileSystemFileEntry;
  isFileBeingUploaded=false;
  error=false;
  errorMsg;
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
  constructor(public surveyService:SurveysService) { }

  ngOnInit(): void {
  }

}
