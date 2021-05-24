import { Injectable } from '@angular/core';
import * as Chance from 'chance'
import {BACKEND_URL} from './Configuration';
import {HttpClient} from '@angular/common/http';
import {ReportDefinition} from './dataModels/ReportDefinition';
@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http:HttpClient) {}
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
}
