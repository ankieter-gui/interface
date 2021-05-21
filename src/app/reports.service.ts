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
    return this.http.post(`${BACKEND_URL}/report/new`, {"surveyId":surveyId, "title":name})
  }
  getReport(id){
    return this.http.get<ReportDefinition>(`${BACKEND_URL}/report/${id}`)
  }
  saveReport(id,content:ReportDefinition){
    return this.http.post(`${BACKEND_URL}/report/new`, content)
  }
  getLinkedSurvey(reportId){
    return this.http.get(`${BACKEND_URL}/report/${reportId}/survey`)
  }
}
