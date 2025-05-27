import { TFormErrors, IOrder, IOrderForm } from '../../types';
import { IEvents } from '../base/events';
import { isValidEmail, isValidPhone } from '../../utils/utils';
import { BasketState } from './basketState';
import { EVENTS } from '../../utils/constants';

export class OrderState {
  order: IOrder = {
    items: [],
    total: null,
    payment: '',
    address: '',
    email: '',
    phone: '',
  };

  errors: TFormErrors = {};

  constructor(private events: IEvents, private basketState: BasketState) {}

  updateFormInput(input: keyof IOrderForm, value: string) {
    this.order[input] = value;
    this.validateContacts();
    this.validateOrder();

    if (this.validateContacts()) this.events.emit(EVENTS.CONTACTS_VALID, this.order);
    if (this.validateOrder()) this.events.emit(EVENTS.ORDER_VALID, this.order);
  }

  validateContacts(): boolean {
    const err: TFormErrors = {};
    if (!this.order.email || !isValidEmail(this.order.email)) err.email = 'Некорректный email';
    if (!this.order.phone || !isValidPhone(this.order.phone)) err.phone = 'Некорректный телефон';
    this.errors = err;
    this.events.emit(EVENTS.FORM_CONTACTS_ERRORS, this.errors);
    return Object.keys(err).length === 0;
  }

  validateOrder(): boolean {
    const err: TFormErrors = {};
    if (!this.order.payment) err.payment = 'Выберите способ оплаты';
    if (!this.order.address) err.address = 'Укажите адрес';
    this.errors = err;
    this.events.emit(EVENTS.FORM_ORDER_ERRORS, this.errors);
    return Object.keys(err).length === 0;
  }

  prepare() {
    const validItems = this.basketState.basket.filter(item => item.price !== null);
    this.order.total = validItems.reduce((total, item) => total + (item.price as number), 0);
    this.order.items = validItems.map(item => item.id);
  }

  reset() {
    this.order = {
      items: [],
      total: null,
      payment: '',
      address: '',
      email: '',
      phone: '',
    };
  }
}