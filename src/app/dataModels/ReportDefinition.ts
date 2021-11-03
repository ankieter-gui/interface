import {ChartReportElement, ReportElement, TextReportElement} from './ReportElement';

export class ReportDefinition{
  title: string;
  dictionaryOverrides = {};
  globalFilter: GlobalFilter[] = [];
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
export let removeGlobalFilter = (report:ReportDefinition, f:GlobalFilter)=>report.globalFilter=report.globalFilter.filter(d=>d!==f)
