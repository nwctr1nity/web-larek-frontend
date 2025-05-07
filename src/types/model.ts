import { TProductType, TPaymentMethod } from './enums';

export interface IProduct {
  id: string;
  type: TProductType;
  title: string;
  image: string;
  description: string;
  price: number;
}

export interface IOrder {
  payment: TPaymentMethod;
  address: string;
  email: string;
  phone: string;
  items: IProduct[];
  total: number;
}

export interface IShopModel {
  products: IProduct[];
  basket: Map<string, number>;

  loadProducts(): Promise<IProduct[]>;
  getProduct(id: string): IProduct | undefined;

  addToBasket(id: string): void;
  removeFromBasket(id: string): void;

  getBasketItems(): IProduct[];
  getBasketCount(): number;
  getBasketTotal(): number;

  validateOrder(order: IOrder): boolean;
  createOrder(order: IOrder): Promise<void>;
}