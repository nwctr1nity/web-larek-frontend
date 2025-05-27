import { ICatalogState, IProduct } from '../../types';
import { ProductItem } from '../productItem/productItem';
import { IEvents } from '../base/events';
import { EVENTS } from '../../utils/constants';

export class CatalogState implements ICatalogState {
  products: ProductItem[] = [];
  constructor(private events: IEvents) {}

  setProducts(items: IProduct[]) {
    this.products = items.map(item => new ProductItem({ ...item }, this.events));
    this.events.emit(EVENTS.PRODUCTS_LOAD, { products: this.products });
  }
}