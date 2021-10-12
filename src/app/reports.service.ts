import {Injectable} from '@angular/core';
import * as Chance from 'chance';
import {BACKEND_URL} from './Configuration';
import {HttpClient} from '@angular/common/http';
import {ReportDefinition} from './dataModels/ReportDefinition';
import {SurveyQuery} from './dataModels/Query';
import {ChartsService} from './charts.service';
import {ChartReportElement} from './dataModels/ReportElement';
import {AbstractChartGenerator} from './AbstractChartGenerator';

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
    let generators: AbstractChartGenerator[] = [];
    content.elements.forEach(d => {
      if (d.type == 'chart') {
        generators.push((d.content as ChartReportElement).generator);
        (d.content as ChartReportElement).generator = undefined;
      }
    });
    let toSave = JSON.parse(JSON.stringify(content));
    generators.reverse();
    console.log(generators);
    for (let [i, element] of content.elements.entries()) {
      (element.content as ChartReportElement).generator = generators.pop();
    }
    return this.http.post(`${BACKEND_URL}/report/${id}`, toSave, {withCredentials: true});
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
  getAllShareLabels(shareElement){
    let l = []
    for (let series of shareElement){
      l= [...l, ...Object.keys(series)]
    }
    return [...new Set(l)];
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
