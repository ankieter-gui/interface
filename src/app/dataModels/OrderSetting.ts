import {ChartReportElement} from './ReportElement';




export class OrderSetting {
  order: string[] = [];

  constructor(order?: string[]) {
    this.order = [];
    if (order) {
      this.order = order;
    }

  }

  public static sortAnotherSeriesInPlace(self: OrderSetting, series: object): any[] {
    return this.sortAnotherArrayInPlace(self, Object.entries(series));
  }

  public static sortAnotherArrayInPlace(self: OrderSetting, other: any[], key: (object) => string = (_) => _[0], value: (object) => any = (_) => _[1]): any[] {

    let otherMap = {};
    other.forEach(d => otherMap[key(d)] = value(d));
    console.log(otherMap);
    console.log(self.order);
    console.log(self.order.map((current) => otherMap[current] != null ? otherMap[current] : 0));
    return self.order.map((current) => otherMap[current] != null ? otherMap[current] : 0);


  }
}
