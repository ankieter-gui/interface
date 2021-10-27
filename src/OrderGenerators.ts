import {OrderSetting} from './app/dataModels/OrderSetting';

export class OrderGenerators{
  public static moveFirstToLast(allLabels): OrderSetting {
    let order = new OrderSetting(allLabels);

    order.order.push(order.order.shift());
    return order;
  }
  public static reverse(allLabels): OrderSetting {
    let order = new OrderSetting(allLabels);
    order.order = order.order.reverse()
    return order;
  }
}
