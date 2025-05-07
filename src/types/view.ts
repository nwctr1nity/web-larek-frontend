import { IProduct, IOrder } from './model';

export interface IView {
  render(data?: unknown): HTMLElement;
}

export interface IShopView extends IView {
  //список товаров
  setProducts(products: IProduct[]): void;

  // корзина
  updateBasketCounter(count: number): void;
  updateBasket(items: { product: IProduct; count: number }[], total: number): void;

  // обработчики
  onBasketClick(handler: () => void): void;
  onOrderSubmit(handler: (data: IOrder) => void): void;

  // валидность
  showValidationErrors(errors: string[]): void;
}
