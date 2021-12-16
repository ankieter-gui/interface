import {Injectable, ViewContainerRef} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NewReportDialogComponent} from './new-report-dialog/new-report-dialog.component';
import {MockService} from './mock.service';
import {Router} from '@angular/router';
import {ReportsService} from './reports.service';
import {NewGroupDialogComponent} from './new-group-dialog/new-group-dialog.component';
import {from} from 'rxjs';
import {DashboardService} from './dashboard.service';
import {ReportDefinition} from './dataModels/ReportDefinition';
import {ShareReportComponent} from './share-report/share-report.component';
import {ReportMeta, SurveyMeta} from './dataModels/survey';
import {FileSystemFileEntry} from 'ngx-file-drop';
import {SharingService} from './sharing.service';
import {AddNewUserComponent} from './add-new-user/add-new-user.component';
import {SurveysService} from './surveys.service';
import {NewSurveyDialogComponent} from './new-survey-dialog/new-survey-dialog.component';
import {NzMessageService} from 'ng-zorro-antd/message';
import {DeleteConfirmModalComponent} from './delete-confirm-modal/delete-confirm-modal.component';
import {ExportReportDialogComponent} from './export-report-dialog/export-report-dialog.component';
import {ReorderDialogComponent} from './reorder-dialog/reorder-dialog.component';
import {QuestionGroupEditorComponent} from './question-group-editor/question-group-editor.component';
import {GroupSummaryGroup, GroupSummaryPickerComponent} from './group-summary-picker/group-summary-picker.component';
import {ChangeDataSourceComponent} from './change-data-source/change-data-source.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardModalsService {

  constructor(private modal: NzModalService, private window: Window, public message: NzMessageService, private mockService: MockService, private surveys: SurveysService, private router: Router, private reports: ReportsService, private sharing: SharingService, private dashboardService: DashboardService) {
  }

  createComponentModal(title, component, params, onOk = (instance, modal) => null, width = '520px'): void {
    const modal = this.modal.create({
      nzTitle: title,
      nzContent: component,
      //  nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: params,
      nzWidth: width,
      nzFooter: [
        {
          label: 'Anuluj',
          onClick: () => modal.destroy()
        },
        {
          label: params.okText ?? 'OK',
          type: 'primary',
          onClick: () => onOk(instance, modal),
        },



      ]
    });
    const instance = modal.getContentComponent();
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));
    return instance;
  }
  async openDeleteConfirmationDialog(name, callback){
    this.createComponentModal("Potwierdź", DeleteConfirmModalComponent, {name:name}, (i,m)=>{
      callback()
      m.destroy()
    })
  }
  async openEditQuestionGroupDialog(group:GroupSummaryGroup, parent:GroupSummaryPickerComponent,callback){
    this.createComponentModal("Edycja grupy pytań", QuestionGroupEditorComponent, {group:group, parent:parent}, async (i:QuestionGroupEditorComponent,m)=>{
      callback();
      m.destroy();
    })
  }
  async openNewSurveyDialog(refreshDashboard){
    this.createComponentModal("Nowa ankieta", NewSurveyDialogComponent, {}, async (i:NewSurveyDialogComponent,m)=>{
      if (!i.name || !i.files || !i.fileEntry || !i.fileEntryXML) {i.error=true; return;}
      this.createNewSurveyFromDialogInstance(i.name, i,m,(csvResponse, xmlResponse)=>{

        if (i.filesXML.length>0&& i.files.length>0) {
          //TODO: to nie powinno tak być robione. Przekazywanie funkcji z dashboardu robi błąd z this
          this.window.location.reload();
          m.destroy()
        }
        else{
          i.message.error("Musisz wybrać plik .csv i .xml")
        }
      })

    })
  }
  private async createNewSurveyFromDialogInstance(name, i,m,callback){
    console.log(i)
    if ((i.filesXML.length==1 && i.files.length==0) ||(i.filesXML.length==0 && i.files.length==1)){
      i.message.error("Musisz wybrać plik .csv i .xml")
      return;
    }
    let selectedSurvey = null;
    selectedSurvey=i.selectedSurvey

      console.log("1")
      i.isFileBeingUploaded = true;
      console.log("1")

      console.log("1")
      console.log(i.fileEntry)
      let newSurveyId=null
      i.fileEntry.file(async (fileCSV: File) => {
        console.log("1")
        // Here you can access the real file
        console.log(i.files[0].relativePath, fileCSV);
        let rsp = await (i.surveyService.createSurvey(name).toPromise())
        newSurveyId=rsp.id


        console.log(newSurveyId)
        console.log(rsp)






        if (i.filesXML.length>0) {
          i.fileEntryXML.file(async (file: File) => {


            console.log(i.files[0].relativePath, file);
            console.log("sending XML...")
            console.log(newSurveyId)
            let d = await (i.surveyService.uploadXML(newSurveyId, file, i.filesXML[0].relativePath).toPromise())
            console.log(file)
            console.log(i.files[0].relativePath)
            let rsp = await (i.surveyService.uploadData(fileCSV, i.files[0].relativePath,newSurveyId, name).toPromise())
            i.isFileBeingUploaded = false;
            if (rsp.error){
             i.error=true;
             i.errorMsg="Schemat XML i CSV nie są ze sobą zgodne! Wyślij poprawne pliki"
              return;
            }

            selectedSurvey = d
            callback(rsp,d)
            m.destroy();


          });
        }
        else{
          let rsp = await (i.surveyService.uploadData(fileCSV, i.files[0].relativePath,newSurveyId, name).toPromise())
          if (rsp.error){
            i.error=true;
            i.errorMsg = "Błąd przy wysyłaniu danych ankiety"
            return;
          }
          callback(rsp,null)
          m.destroy();

        }

      });



  }
  async openNewReportDialog(survey= null){
   this.createComponentModal("Nowy raport", NewReportDialogComponent, {
     survey,
     autocompleteSurveys: (await (this.dashboardService.getDashobardData().toPromise())).objects.filter(d=>d.type==="survey")

   }, async (i, m) => {
     if (!i.reportNameInputValue){i.error=true;return;}
     if (i.files.length==0) {
       let selectedSurvey=i.selectedSurvey
       const response = await (this.reports.createNewReport(selectedSurvey.id, i.reportNameInputValue).toPromise())
       const id = response['reportId']
       await (this.reports.saveReport(id, new ReportDefinition(i.reportNameInputValue)).toPromise())
       // const id="testoweId"
       console.log(selectedSurvey);
       m.destroy();
       await this.router.navigate(['reports/editor', id]);
     }else {

       this.createNewSurveyFromDialogInstance(undefined,i, m, async (csvResponse, xmlResponse) => {
         let newSurveyId = csvResponse.id
         const response = await (this.reports.createNewReport(newSurveyId, i.reportNameInputValue).toPromise())
         const id = response['reportId']
         await (this.reports.saveReport(id, new ReportDefinition(i.reportNameInputValue)).toPromise())
         await this.router.navigate(['reports/editor', id]);
       })
     }

    } );
  }
  async openShareSurveyDialog(survey:SurveyMeta){
    this.createComponentModal("Udostępnij ankietę", ShareReportComponent, {report:survey, okText:"Udostępnij", type:"survey"}, async (i:ShareReportComponent,m)=>{
      console.log(i.selected)
      console.log(i.selectedGroups)
      await this.sharing.shareSurveyToUsers(i.report.id, [], i.selected.map(d=>d.id), []).toPromise()
      await this.sharing.shareSurveyToGroups(i.report.id, [], i.selectedGroups, []).toPromise()
      m.destroy()
    })
  }
  async openShareReportDialog(report:ReportMeta){
    this.createComponentModal("Udostępnij raport", ShareReportComponent, {report:report, okText:"Udostępnij", type:"report"}, async (i:ShareReportComponent,m)=>{
      console.log(i.selected)
      console.log(i.selectedGroups)
      this.message.info('Udostępniono')
      await this.sharing.shareReportToUsers(i.report.id, [], i.selected.map(d=>d.id), []).toPromise()
        await this.sharing.shareReportToGroups(i.report.id, [], i.selectedGroups, []).toPromise()
        m.destroy()
    })
  }

  openNewGroupDialog(fromAdminPanel = false): void {
    this.createComponentModal('Nowa grupa', NewGroupDialogComponent, {
      placeholder: 'Szukaj przez nazwisko',
      fromAdminPanel: fromAdminPanel
    }, async (i: NewGroupDialogComponent, m) => {
      // TODO: create group
      i.updating = true;
      await this.sharing.updateGroup(i.groupName, i.selected.map(d => d.id)).toPromise();
      await this.sharing.downloadAllGroups();
      m.destroy();
    });
  }

  openReorderDialog(report: ReportDefinition): void {
    this.createComponentModal('Zmień kolejność', ReorderDialogComponent, {report: report}, (i: ReorderDialogComponent, m) => {
      m.destroy();
    }, '900px');
  }
  async openDataSourceChangeDialog(reportId){
    this.createComponentModal("Zmień źródlo danych", ChangeDataSourceComponent, {report:reportId,autocompleteSurveys: (await (this.dashboardService.getDashobardData().toPromise())).objects.filter(d=>d.type==="survey")}, async (i:ChangeDataSourceComponent,m)=>{
      let rsp:any = this.reports.changeDataSource(reportId, i.autocompleteSurveys.find(x=>x.name==i.surveyInputValue).id)
      if (rsp.error){i.error=true; return;}

      m.destroy()
    })

  }
  openExportReportDialog(stringContent: string): void {
    this.createComponentModal('Kod', ExportReportDialogComponent, {content: stringContent}, async (i, m) => m.destroy());
  }

  openNewUserDialog(): void {
    this.createComponentModal('Nowy użytkownik', AddNewUserComponent, {}, async (i: AddNewUserComponent, m) => {
      // TODO: create group
      if (this.sharing.users().some((d, index, a) => d.casLogin == i.casLogin)) {
        this.message.error('Użytkownik już istnieje!');
        i.error = true;
        return;
      }
      i.error = false;
      await this.sharing.createNewUser(i.casLogin, i.role, i.pesel).toPromise();
      this.sharing.downloadAllUsers();
      m.destroy();
    } )
  }





}
