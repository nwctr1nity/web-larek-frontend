export const enum TProductType {
  softSkill = 'софт-скил',
  other = 'другое',
  additional = 'дополнительное',
  button = 'кнопка',
  hardSkill = 'хард-скил',
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: TProductType;
  price: number | null;
}

export interface IModal {
  content: HTMLElement;
}

export interface IBasketData {
  list: HTMLElement[];
  price: number;
}

export interface ProductBasket extends IProduct {
  id: string;
  index: number;
}

export interface IContacts {
  phone: string;
  email: string;
}

export interface IFormState {
  address: string;
  valid: boolean;
  errors: string[];
}

export type TFormErrors = Partial<Record<keyof IOrderForm, string>>;

export interface IOrderData {
  address: string;
  payment: string;
}

export interface IOrder {
  items: string[];
  total: number;
  payment: string;
  address: string;
  email: string;
  phone: string;
}

export interface IPage {
  gallery: HTMLElement[];
  lockScroll: boolean;
  basketCounter: number;
}

export interface IOrderForm {
  payment: string;
  address: string;
  email: string;
  phone: string;
}

export interface IMouseEvent {
  onClick: (evt: MouseEvent) => void;
}

export interface ISuccess {
  total: number;
}

export interface IOrderState {
  order: IOrder;

  updateFormInput(input: keyof IOrderForm, value: string): void;
  validateContacts(): boolean;
  validateOrder(): boolean;
  prepare(): void;
  reset(): void;
}

import { ProductItem } from "../components/productItem/productItem";

export interface ICatalogState {
  products: ProductItem[];

  setProducts(items: ProductItem[]): void;
}

export interface IBasketState {
  basket: ProductItem[];

  addItem(item: ProductItem): void;
  removeItem(id: string): void;
  countItems(): number;
  countTotal(): number;
  clear(): void;
}

