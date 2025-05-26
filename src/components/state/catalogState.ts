import { ICatalogState, IProduct } from '../../types';
import { ProductItem } from '../productItem/productItem';
import { IEvents } from '../base/events';

export class CatalogState implements ICatalogState {
  products: ProductItem[] = [];
  constructor(private events: IEvents) {}

  setProducts(items: IProduct[]) {
    this.products = items.map(item => new ProductItem({ ...item }, this.events));
    this.events.emit('products:load', { products: this.products });
  }
}