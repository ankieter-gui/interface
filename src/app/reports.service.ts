import { Injectable } from '@angular/core';
import * as Chance from 'chance'
import {BACKEND_URL} from './Configuration';
import {HttpClient} from '@angular/common/http';
import {ReportDefinition} from './dataModels/ReportDefinition';
import {SurveyQuery} from './dataModels/Query';
import {ChartsService} from './charts.service';
@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http:HttpClient, private chartsService:ChartsService) {}
  createNewReport(surveyId, name){
    return this.http.post(`${BACKEND_URL}/report/new`, {"surveyId":surveyId, "title":name}, {withCredentials:true,})
  }
  getReport(id){
    return this.http.get<ReportDefinition>(`${BACKEND_URL}/report/${id}`,{withCredentials:true})
  }
  saveReport(id,content:ReportDefinition){
    return this.http.post(`${BACKEND_URL}/report/${id}`, content ,{withCredentials:true})
  }
  getLinkedSurvey(reportId){
    return this.http.get<{surveyId:string}>(`${BACKEND_URL}/report/${reportId}/survey`,{withCredentials:true})
  }
  copy(reportId){
    return this.http.get(`${BACKEND_URL}/report/${reportId}/copy`,{withCredentials:true})
  }
  deleteReport(reportId){
    return this.http.delete(`${BACKEND_URL}/report/${reportId}`,{withCredentials:true})
  }
  renameReport(reportId, newName){
    return this.http.post(`${BACKEND_URL}/report/${reportId}/rename`,{title:newName},{withCredentials:true})
  }
  getData(reportId, query){
    return this.http.post(`${BACKEND_URL}/report/${reportId}/data`, query, {withCredentials:true})
  }
  async getResponsesForQuestion(reportId, questionName){
    let query:SurveyQuery = {
      get: [[questionName]],
      as:["share"],
      by:["*"],
      filter:[]
    }
    let dataResponse = await (this.getData(reportId, query).toPromise())
    let shareElement = this.chartsService.zip(Object.keys(dataResponse), Object.values(dataResponse)).filter(d=>d[0].includes("share"))[0][1]
    console.log(shareElement)
    let answers = this.chartsService.getAllShareLabels(shareElement)
    console.log(answers)
    return answers
  }
  getNamingDictionary(reportId){
    return this.http.get(`${BACKEND_URL}/report/${reportId}/answers`,{withCredentials:true})
  }
  getLabelFor(dictionary, question, value){
    console.log(dictionary)
    console.log(question)
    return dictionary[question][value]
  }
}
