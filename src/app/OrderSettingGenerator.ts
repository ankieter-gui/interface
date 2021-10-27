
import {OrderSetting} from './dataModels/OrderSetting';
import {OrderGenerators} from '../OrderGenerators';

export class OrderSettingGenerator {
  public static applyAutomaticOrdering(generator, allLabels): OrderSetting {
    const conditions = [
      {
        condition: () => {
          return false;
        }, orderingFunction: OrderGenerators.moveFirstToLast,
      },
      {
        condition:()=>{
          return generator.chartElement.config.type=="groupedPercentAndData"
        },
        orderingFunction: (l)=>OrderGenerators.moveFirstToLast(OrderGenerators.reverse(l).order)
      }
    ];
    for (const conditionPair of conditions) {
      if (conditionPair.condition()) {
        return conditionPair.orderingFunction(allLabels);
      }
    }
    return new OrderSetting(allLabels);
  }


}
