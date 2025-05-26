import { IBasketState, IProduct } from '../../types';
import { ProductItem } from '../productItem/productItem';
import { IEvents } from '../base/events';

export class BasketState implements IBasketState {
  basket: ProductItem[] = [];

  constructor(private events: IEvents) {}

  addItem(item: ProductItem) {
    this.basket.push(item);
    this.save();
  }

  removeItem(id: string) {
    this.basket = this.basket.filter(it => it.id !== id);
    this.save();
  }

  clear() {
    this.basket.length = 0;
    this.save();
  }

  countItems() {
    return this.basket.length;
  }

  countTotal() {
    return this.basket.reduce((total, cur) => total + (cur.price || 0), 0);
  }

  private save() {
    localStorage.setItem('basket', JSON.stringify(this.basket.map(it => ({
      id: it.id,
      title: it.title,
      description: it.description,
      image: it.image,
      category: it.category,
      price: it.price,
    }))));
  }

  load() {
    try {
      const raw = localStorage.getItem('basket');
      if (raw) {
        const parsed = JSON.parse(raw);
        this.basket = parsed.map((item: IProduct) => new ProductItem(item, this.events));
      }
    } catch (err) {
      console.warn('Ошибка при загрузке корзины:', err);
      this.basket = [];
    }
  }
}