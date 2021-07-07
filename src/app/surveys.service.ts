import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BACKEND_URL} from './Configuration';
import {SurveyQuery} from './dataModels/Query';
import {SurveyGeneratorService} from './survey-generator.service';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(private http:HttpClient, public generator:SurveyGeneratorService) {}
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
  uploadData(file,relativePath, name=undefined){

     // You could upload it like this:
     const formData = new FormData()
     formData.append('file', file, relativePath)
     if (name) formData.append('name', name)
    console.log("sending....")
     return this.http.post(`${BACKEND_URL}/data/new`, formData, {withCredentials:true})

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


}
