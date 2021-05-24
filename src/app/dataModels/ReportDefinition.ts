import {ChartReportElement, ReportElement, TextReportElement} from './ReportElement';

export class ReportDefinition{
  title:string;
  elements:ReportElement[];
  constructor(title) {
    this.title =title;
    this.elements=[]
  }
}
