import {ChartReportElement, ReportElement, TextReportElement} from './ReportElement';

export class ReportDefinition{
  title: string;
  dictionaryOverrides = {};
  globalFilter: GlobalFilter = null;
  elements:ReportElement[];
  constructor(title) {
    this.title =title;
    this.elements=[]
  }
}
export class GlobalFilter{
  question:string
  answer:string
}
