import { TProductType } from '../types/index';
import { Api } from '../components/base/api';
import { EventEmitter } from '../components/base/events';
import { Modal } from '../components/modal/modal';
import { ensureElement, cloneTemplate } from '../utils/utils';
import { Basket } from '../components/basket/basket';
import { Order } from '../components/order/order';
import { Contacts } from '../components/contacts/contacts';
import { Success } from '../components/success/success';  

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
  
};

// категории
export const categoryClasses: { [key in TProductType]: string } = {
  [TProductType.softSkill]: 'card__category_soft',
  [TProductType.other]: 'card__category_other',
  [TProductType.additional]: 'card__category_additional',
  [TProductType.button]: 'card__category_button',
  [TProductType.hardSkill]: 'card__category_hard',
};

// названия событий
export const EVENTS = {
  PRODUCT_OPEN: 'product:open',
  PRODUCT_ADD_TO_BASKET: 'product:add-to-basket',
  PRODUCTS_LOAD: 'products:load',
  BASKET_VIEW: 'basket:view',
  BASKET_REMOVE: 'basket:remove',
  BASKET_ORDER: 'basket:order',
  FORM_ORDER_ERRORS: 'form:order-errors',
  FORM_CONTACTS_ERRORS: 'form:contacts-errors',
  FORM_INPUT_UPDATE: 'form:input-update',
  MODAL_CLOSE: 'modal:close',
  MODAL_OPEN: 'modal:open',
  CONTACTS_SEND: 'contacts:send',
  CONTACTS_VALID: 'contacts:valid',
  ORDER_SEND: 'order:send',
  ORDER_VALID: 'order:valid',
  ORDER_COMPLETE: 'order:complete',
};

// общие зависимости
export const api = new Api(API_URL);
export const eventBus = new EventEmitter();

//шаблоны html
export const catalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
export const previewTemplate= ensureElement<HTMLTemplateElement>('#card-preview');
export const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
export const basketCardTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
export const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
export const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
export const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// компоненты приложения
export const modal = new Modal(ensureElement('#modal-container'), eventBus);
export const basketComponent = new Basket(cloneTemplate(basketTemplate), eventBus);
export const orderComponent = new Order(cloneTemplate(orderTemplate), eventBus);
export const contactsComponent = new Contacts(cloneTemplate(contactsTemplate), eventBus);
export const successComponent = new Success(cloneTemplate(successTemplate), eventBus, modal);


