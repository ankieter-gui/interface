import { Component, OnInit } from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {HttpClient} from '@angular/common/http';
import {SurveysService} from '../surveys.service';

@Component({
  selector: 'app-new-survey-dialog',
  template: `
    <input nz-input [(ngModel)]="name" placeholder="Nazwa ankiety...">
    CSV/XLSX:
    <ngx-file-drop *ngIf="!isFileBeingUploaded" dropZoneLabel="Upuść plik tutaj" (onFileDrop)="dropped($event)"
                   (onFileOver)="fileOver($event)" (onFileLeave)="fileLeave($event)" accept=".csv,.xlsx">
      <ng-template ngx-file-drop-content-tmp let-openFileSelector="openFileSelector">
        <span style="display:block;" *ngIf="files.length>0">Wybrano: {{files[0].relativePath}}</span>
        <button nz-button (click)="openFileSelector()">{{files.length>0?"Zmień":"Wybierz"}}</button>
      </ng-template>
    </ngx-file-drop>
    XML:
    <ngx-file-drop *ngIf="!isFileBeingUploaded" dropZoneLabel="Upuść plik tutaj" (onFileDrop)="droppedXML($event)"
                   (onFileOver)="fileOverXML($event)" (onFileLeave)="fileLeaveXML($event)" accept=".xml">
      <ng-template ngx-file-drop-content-tmp let-openFileSelector="openFileSelector">
        <span style="display:block;" *ngIf="filesXML.length>0">Wybrano: {{filesXML[0].relativePath}}</span>
        <button nz-button (click)="openFileSelector()">{{filesXML.length>0?"Zmień":"Wybierz"}}</button>
      </ng-template>
    </ngx-file-drop>
    <nz-spin *ngIf="isFileBeingUploaded" nzSimple [nzSize]="'large'"></nz-spin>
  `,
  styles: [`


  `]
})
export class NewSurveyDialogComponent implements OnInit {

  constructor(private http:HttpClient, private  surveyService:SurveysService) { }
  public files: NgxFileDropEntry[] = [];
  public filesXML: NgxFileDropEntry[] = [];
  public fileEntry:FileSystemFileEntry;
  public fileEntryXML:FileSystemFileEntry;
  name:string
  isFileBeingUploaded=false;
  ngOnInit(): void {
  }
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {

      } else {

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
  refreshDashboard(){
  }
}


