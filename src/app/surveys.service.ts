import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BACKEND_URL} from './Configuration';
import {SurveyQuery} from './dataModels/Query';
import {SurveyGeneratorService} from './survey-generator.service';
import {Router} from '@angular/router';
import {SurveyDefinition} from './dataModels/SurveyDefinition';
import {SurveysEditorComponent} from './surveys-editor/surveys-editor.component';
import {NzModalService} from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(private http:HttpClient, public generator:SurveyGeneratorService, public router:Router, public modalService:NzModalService) {}
  getQuestions(survey){

    return this.http.get(`${BACKEND_URL}/data/${survey}/types`, {withCredentials:true})
  }
  query(survey, q:SurveyQuery){
    console.log("sending the following:")
    console.log(q)
    // if (q.get[0][0] == undefined){
    //   q.get[0] = q.get[0].splice(0,1)
    // }
    return this.http.post(`${BACKEND_URL}/data/${survey}`, q, {withCredentials:true})
  }
  getSurveyLinkedToReport(reportId){

  }
  uploadData(file,relativePath, id, name=undefined){

     // You could upload it like this:
     const formData = new FormData()
     formData.append('file', file, relativePath)
     if (name) formData.append('name', name)
    console.log("sending....")
     return this.http.post(`${BACKEND_URL}/data/new/${id}`, formData, {withCredentials:true})

  }
  uploadXML(surveyId, file,relativePath){
    const formData = new FormData()
    formData.append('file', file, relativePath)
    console.log("sending....")
    return this.http.post(`${BACKEND_URL}/survey/${surveyId}/upload`, formData, {withCredentials:true})
  }
  deleteSurvey(surveyId){
    return this.http.delete(`${BACKEND_URL}/survey/${surveyId}`,  {withCredentials:true})
  }
  createSurvey(name, meta=null){
    return this.http.post(`${BACKEND_URL}/survey/new`, {name:name, meta:meta!=null?meta:{}}, {withCredentials:true})
  }
  saveFromEditor(survey:SurveyDefinition, id:string){
    return this.http.post(`${BACKEND_URL}/survey/${id}`, survey, {withCredentials:true})
  }
  async createEmptyAndTakeToEditor(){
    let rsp = await this.createSurvey("Nowa ankieta").toPromise()
    const id = rsp['id']
    const s = new SurveyDefinition()
    s.title="Nowa ankieta"
    await this.saveFromEditor(s, id).toPromise()
    this.modalService.closeAll()
    this.router.navigate(['surveysEditor', id])
  }
  getSurveyJSON(id:string){
    return this.http.get(`${BACKEND_URL}/survey/${id}`, {withCredentials:true})
  }


}
