import {Injectable} from '@angular/core';
import * as Chance from 'chance';
import {BACKEND_URL, hidePotentiallyUnsafeQuestions, unsafeQuestionsPartialNames} from './Configuration';
import {HttpClient} from '@angular/common/http';
import {ReportDefinition} from './dataModels/ReportDefinition';
import {SurveyQuery} from './dataModels/Query';
import {ChartsService} from './charts.service';
import {ChartReportElement} from './dataModels/ReportElement';
import {AbstractChartGenerator} from './AbstractChartGenerator';
import {SummaryChartGenerator} from './SummaryChartGenerator';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) {
  }

  createNewReport(surveyId, name) {
    return this.http.post(`${BACKEND_URL}/report/new`, {'surveyId': surveyId, 'title': name}, {withCredentials: true,});
  }

  getReport(id) {
    return this.http.get<ReportDefinition>(`${BACKEND_URL}/report/${id}`,{withCredentials:true})
  }
  saveReport(id,content:ReportDefinition) {
    let copy = Object.assign({}, content);
    let newElements = [];
    for (let element of copy.elements) {
      let newElement = Object.assign({}, element);
      newElements.push(newElement);
      if (newElement.type == 'chart') {

        newElement.content = Object.assign({}, newElement.content);
        (newElement.content as ChartReportElement).generator = undefined;
      }
    }
    copy.elements = newElements;
    console.log(copy);
    return this.http.post(`${BACKEND_URL}/report/${id}`, copy, {withCredentials: true});
  }
  getLinkedSurvey(reportId){
    return this.http.get<{surveyId:string, error?:string}>(`${BACKEND_URL}/report/${reportId}/survey`,{withCredentials:true})
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
  async answersCountMacro(reportId, questions, filters):Promise<number>{
    let rsp = await this.getDataFromMacro(reportId, {get: [questions], "if":filters, macro:['count-answers', '9999']})
    return Object.entries(rsp).find(x=>x[0].includes("rows"))[1]
  }
  async getDataFromMacro(reportId, query){
    return await this.http.post(`${BACKEND_URL}/report/${reportId}/data`, query, {withCredentials:true}).toPromise()
  }
  getAllShareLabels(shareElement){
    let l = []
    for (let series of shareElement){
      l= [...l, ...Object.keys(series)]
    }
    return [...new Set(l)];
  }

  changeDataSource(reportId, surveyId){
    return {error:true}
    //TODO:
   // return this.http.post(`${BACKEND_URL}/data/new/answers`,{withCredentials:true})
  }

  getSurveyStructure(reportId){
    return this.http.get(`${BACKEND_URL}/report/${reportId}/answers`,{withCredentials:true})
  }
  getNamingDictionary(structure){
    let dict = {}
    let questionsCore = Object.keys(structure)
    for (let questionCore of questionsCore){

      let obj = structure[questionCore]
      let sub = obj['sub_questions']

      let values = obj['values']
      if (sub.length>0) {
        for (let subQuestion of sub) {
          if (hidePotentiallyUnsafeQuestions){

            if (unsafeQuestionsPartialNames.some(v=>subQuestion.toLowerCase().includes(v.toLowerCase()))) {
              continue
            }
          }
          let keyName = questionCore+" - "+subQuestion
          dict[keyName] = values
        }
      }
      else{
        dict[questionCore] = values
      }
    }
    console.log(dict)
    return dict
  }
  getLabelFor(dictionary, question, value){
    let r;
    if (question in dictionary && dictionary[question]) r=  dictionary[question][value]
    if (!r) {return value} else {return r}
  }
}
