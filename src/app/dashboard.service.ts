import { Injectable } from '@angular/core';
import {HttpClient, HttpParamsOptions, HttpResponse} from '@angular/common/http';
import {BACKEND_URL} from './Configuration';
import {Observable} from 'rxjs';
import {DashboardRequestResponse} from './dataModels/DashboardRequestResponse';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  getDashobardData():Observable<DashboardRequestResponse>{
    return this.http.get<DashboardRequestResponse>(`${BACKEND_URL}/dashboard`, {withCredentials:true,})
  }

}
