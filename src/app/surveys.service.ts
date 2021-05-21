import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BACKEND_URL} from './Configuration';
import {SurveyQuery} from './dataModels/Query';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(private http:HttpClient) {}
  getQuestions(survey){
    survey=2
    return this.http.get(`${BACKEND_URL}/data/${survey}/types`)
  }
  query(survey, q:SurveyQuery){
    console.log(q)
    survey=2
    return this.http.post(`${BACKEND_URL}/data/${survey}`, q)
  }
  getSurveyLinkedToReport(reportId){

  }


}
