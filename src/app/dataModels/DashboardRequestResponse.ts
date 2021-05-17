import {ReportMeta, SurveyMeta} from './survey';

export class DashboardRequestResponse{
  objects:(SurveyMeta|ReportMeta)[]=[];
}
