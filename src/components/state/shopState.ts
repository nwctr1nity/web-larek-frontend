import { IEvents } from '../base/events';
import { BasketState } from './basketState';
import { CatalogState } from './catalogState';
import { OrderState } from './orderState';

export class ShopState {
  public basket: BasketState;
  public catalog: CatalogState;
  public order: OrderState;

  constructor(events: IEvents) {
    this.basket = new BasketState(events);
    this.catalog = new CatalogState(events);
    this.order = new OrderState(events, this.basket);
  }
}
