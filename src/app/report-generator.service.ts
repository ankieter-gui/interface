import { Injectable } from '@angular/core';
import {HttpClient, HttpParamsOptions, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BACKEND_URL} from './Configuration';

@Injectable({
  providedIn: 'root'
})
export class ReportGeneratorService {

  constructor(private http: HttpClient) { }

}
