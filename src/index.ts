import './scss/styles.scss';
import { TProductType, IOrderForm, IProduct } from './types';
import { ApiListResponse } from './components/base/api';
import { BasketItem } from './components/basket/basketItem';
import { CardItem } from './components/card/cardItem';
import { CardPreview } from './components/card/cardPreview';
import { ProductItem } from './components/productItem/productItem';
import { cloneTemplate, formatErrors } from './utils/utils';
import { Page } from './components/page/page';
import { ShopState } from './components/state/shopState';
import { 
  api,
  eventBus,
  catalogTemplate,
  previewTemplate,
  basketCardTemplate,
  modal,
  basketComponent, 
  orderComponent,
  contactsComponent,
  successComponent
} from './utils/constants';

const app = new ShopState(eventBus);
const mainPage = new Page(document.body, eventBus);

app.basket.load();
mainPage.basketCounter = app.basket.countItems();

api.get('/product/').then((res: ApiListResponse<IProduct>) => {
  app.catalog.setProducts(res.items);
});

eventBus.on('product:open', (item: ProductItem) => {
  mainPage.lockScroll = true;
  const preview = new CardPreview(cloneTemplate(previewTemplate), {
    onClick: () => eventBus.emit('product:add-to-basket', item),
  });
  preview.update({
    id: item.id,
    title: item.title,
    image: item.image.replace('.svg', '.png'),
    category: item.category,
    description: item.description,
    price: item.price,
  });
  modal.render({ content: preview.element });
});

eventBus.on('products:load', () => {
  mainPage.gallery = app.catalog.products.map((item) => {
    const card = new CardItem(cloneTemplate(catalogTemplate), {
      onClick: () => eventBus.emit('product:open', item),
    });
    card.update({
      id: item.id,
      title: item.title,
      image: item.image.replace('.svg', '.png'),
      category: item.category as TProductType,
      price: item.price,
    });
    return card.element;
  });
});

eventBus.on('product:add-to-basket', (item: ProductItem) => {
  app.basket.addItem(item);
  mainPage.basketCounter = app.basket.countItems();
  modal.close();
});

eventBus.on('basket:view', () => {
  mainPage.lockScroll = true;

  const basketItems = app.basket.basket.map((item, idx) => {
    const el = new BasketItem(cloneTemplate(basketCardTemplate), {
      onClick: () => eventBus.emit('basket:remove', item),
    });
    el.update({
      ...item,
      index: idx + 1,
    });
    return el.element;
  });

  basketComponent.update({
    list: basketItems,
    price: app.basket.countTotal(),
  });
  modal.render({ content: basketComponent.element });
});

eventBus.on('basket:remove', (item: ProductItem) => {
  app.basket.removeItem(item.id);
  basketComponent.price = app.basket.countTotal();
  mainPage.basketCounter = app.basket.countItems();
  basketComponent.refreshIndex();
  if (!app.basket.basket.length) basketComponent.buttonOff();
});

eventBus.on('basket:order', () => {
  orderComponent.update({
    address: app.order.order.address,
    valid: false,
    errors: [],
  });
  orderComponent.updateValidationState();
  modal.render({ content: orderComponent.element });
});

eventBus.on('form:order-errors', (errs: Partial<IOrderForm>) => {
  const { payment, address } = errs;
  orderComponent.validity = !(payment || address);
  orderComponent.errors = formatErrors([payment, address]);
});

eventBus.on('form:contacts-errors', (errs: Partial<IOrderForm>) => {
  const { email, phone } = errs;
  contactsComponent.validity = !email && !phone;
  contactsComponent.errors = formatErrors([phone, email]);
});

eventBus.on('form:input-update', (text: { input: keyof IOrderForm, value: string }) => {
  app.order.updateFormInput(text.input, text.value);
});

eventBus.on('order:send', () => {
  app.order.prepare();
  contactsComponent.update({
    valid: false,
    errors: [],
  });
  contactsComponent.updateValidationState();
  modal.render({ content: contactsComponent.element });
});

eventBus.on('contacts:send', () => {
  api.post('/order', app.order.order)
    .then(res => {
      eventBus.emit('order:complete', res);
      app.order.reset();
      orderComponent.buttonsOff();
      mainPage.basketCounter = 0;
    })
    .catch(console.warn);
});

eventBus.on('order:complete', (res: ApiListResponse<string>) => {
  app.basket.clear();
  mainPage.basketCounter = app.basket.countItems();
  successComponent.update({
    total: res.total,
  });
  modal.render({ content: successComponent.element });
});

eventBus.on('modal:close', () => {
  mainPage.lockScroll = false;
});