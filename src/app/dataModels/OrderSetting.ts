import {ChartReportElement} from './ReportElement';

export class OrderSettingGenerator {
  public static applyAutomaticOrdering(generator, allLabels): OrderSetting {
    const conditions = [
      {
        condition: () => {
          return false;
        }, orderingFunction: OrderSettingGenerator.moveFirstToLast
      }
    ];
    for (const conditionPair of conditions) {
      if (conditionPair.condition()) {
        return conditionPair.orderingFunction(allLabels);
      }
    }
    return new OrderSetting(allLabels);
  }

  public static moveFirstToLast(allLabels): OrderSetting {
    let order = new OrderSetting(allLabels);

    order.order.push(order.order.shift());
    return order;
  }
}

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

    return self.order.map((current) => otherMap[current] != null ? otherMap[current] : 0)


  }
}
