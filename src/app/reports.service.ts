import { Injectable } from '@angular/core';
import * as Chance from 'chance'
@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor() { }
  async createNewReport(surveyId,name){
    return Chance().hash();
  }
}
