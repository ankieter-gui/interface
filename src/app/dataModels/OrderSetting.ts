import {ChartReportElement} from './ReportElement';

export class OrderSettingGenerator {
  public static moveFirstToLast(c: ChartReportElement): OrderSetting {
    let order = new OrderSetting(c);
    return order;
  }
}

export class OrderSetting {
  order: String[] = [];

  constructor(c: ChartReportElement) {
    this.order = c.generator.getAllShareLabels(c.generator.shareElement);
  }
}
