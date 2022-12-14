import {OrderSetting} from './app/dataModels/OrderSetting';

export class OrderGenerators{
  public static moveFirstToLast(allLabels): OrderSetting {
    let order = new OrderSetting(allLabels);

    order.order.push(order.order.shift());
    return order;
  }
  public static naiveSort(allLabels): OrderSetting {
    let order = new OrderSetting(allLabels);
    order.order = order.order.sort().reverse()
    const highestValue = order.order[order.order.length - 1];
    //move highest value to the end
    order.order.push(order.order.shift());
    return order;
  }
  public static reverse(allLabels): OrderSetting {
    let order = new OrderSetting(allLabels);
    order.order = order.order.reverse()
    return order;
  }
}
