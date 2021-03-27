
export class SurveyID_DTO{
  name: string;
  id: string;
}
export class SurveyResponsesAmountTimepoint{
  date: number;
  value: number;
}

// base class for surveys and reports
export class GenericObjectMeta{
  type: string;
  name: string;
  createdOn: number; // linux timestamp
  isPublic: boolean;
  id: string;
}

export class SurveyMeta extends  GenericObjectMeta{
  isActive: boolean;
  questionsAmount: number;
  startedOn: number; // linux timestamp
  endsOn: number;
  responses: SurveyResponsesAmountTimepoint[];
  targetGroups: string[];
}

export class ReportMeta extends  GenericObjectMeta{
  connectedSurvey: SurveyID_DTO;
  chartsAmount: number;
  sharedTo: string[];
}
