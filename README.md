https://github.com/nwctr1nity/web-larek-frontend

# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура

Проект состоит из следующих частей:

### 1. Модель
Модель данных описывает сущности приложения, такие как товары, корзина, заказ, платежные данные и контактная информация. Это объекты, которые инкапсулируют данные и логику, связанную с ними.

#### Пример:
```
export interface IProduct {
  id: string;
  type: TProductType;
  title: string;
  image: string;
  description: string;
  price: number;
}
```

### 2. Отображение
Отображение отвечают за отображение данных на экране. Это классы, которые рендерят HTML и взаимодействуют с пользователем через интерфейс. Они также обрабатывают пользовательские события.

#### Пример:
```
export interface IShopView extends IView {
  setProducts(products: IProduct[]): void;
  updateBasketCounter(count: number): void;
  updateBasket(items: { product: IProduct; count: number }[], total: number): void;
}
```

### 3. Презентер
Презентер является связующим звеном между моделью и отображением.

#### Пример:
```
export interface IPresenter {
  model: IShopModel;
  view: IShopView;
  events: EventEmitter;
  init(): void;
}
```

### 4. Сервисные классы
Сервисные классы отвечают за общие функциональности, такие как работа с API, управление событиями и модальными окнами, которые должны быть доступны для переиспользования в других частях проекта.

#### Пример:
```
export class Modal {
  protected container = document.querySelector('modal__container');
  protected closeButton = this.container.querySelector('.modal__close');

  constructor() {...}

  open() {...}
  close() {...}
}
```

## Взаимодействие частей
Моделю данных взаимодействует с отображением через презентер. Презентер вызывает методы модели для получения или изменения данных и передает их во view.

Отображения отправляют события, которые обрабатываются презентером. Например, когда пользователь добавляет товар в корзину, view вызывает событие, которое презентер слушает и обрабатывает. Презентер обновляет модель данных и отправляет обновленные данные во view для рендера.

Сервисные классы используются для работы с внешними сервисами, например, для открывания или закрывания модального окна(Modal.open(), Modal.close()).

Все компоненты взаимодействуют через события, что позволяет избежать жесткой связанности.

Данные в приложении
Основные данные в приложении представлены интерфейсами, которые описывают бизнес-логические сущности:

Товары (IProduct): Данные, связанные с продуктами в магазине, включая тип, описание, цену и изображение.

Корзина (IBasket): Структура данных для представления корзины покупок, которая включает список товаров и их количество.

Заказ (IOrder): Данные о заказе, включая информацию о платеже, адресе и контактных данных.

Платежи (TPaymentMethod): Типы платежей, такие как онлайн и при получении.

Контактная информация (IContacts): Данные о пользователе, включая email и телефон.

#### Пример:
```
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
```

## Процессы в приложении
Процессы в приложении реализованы через событийную связь.

Когда приложение запускается, презентер вызывает метод модели для загрузки товаров. Модель отправляет запрос к API, получает ответ и передает данные в отображение.

#### Пример :
```
model.loadProducts().then(products => {
  view.setProducts(products);
});
```

Когда пользователь добавляет товар в корзину, событие обрабатывается в презентере, который обновляет модель и передает обновленную информацию в отображение для рендеринга.

#### Пример:
```
events.on('addToBasket', (productId) => {
  model.addToBasket(productId);
  view.updateBasket(model.getBasketItems());
});
```
## Классы в приложении
Ниже перечислены все основные классы, используемые в приложении, отсортированные по архитектурным слоям.

### Модель
#### AppState
Роль: глобальное хранилище состояния приложения
Назначение: централизованное управление данными

```
class AppState {
  products: IProduct[]
  basket: Map<string, number>
  order: IOrder

  constructor()

  addToBasket(id: string): void
  removeFromBasket(id: string): void
  getBasketItems(): IProduct[]
  getBasketTotal(): number
}
```

#### Order
Роль: объект бизнес-логики для оформления заказа
Назначение: проверка и формирование заказов

```
class Order {
  items: IProduct[]
  address: string
  email: string
  phone: string
  payment: TPaymentMethod

  constructor(orderData: Partial<IOrder>) 

  validate(): string[] — проверка на валидность
  getTotal(): number
  submit(): Promise<void>
}
```

### Presenter
(описан выше)

### View
#### ProductCard
Роль: компонент отображения одного товара
Назначение: визуальное представление товара и передача событий

```
class ProductCard {
  product: IProduct

  constructor(product: IProduct)

  render(): HTMLElement
  onAddToBasket(handler: () => void): void
}
```

#### BasketView
Роль: компонент отображения корзины
Назначение: отображение содержимого корзины и общей суммы

```
class BasketView {
  items: { product: IProduct; count: number }[]
  total: number

  constructor(container: HTMLElement)

  update(items, total): void
  onRemove(handler: (id: string) => void): void
}
```

#### OrderFormView
Роль: форма оформления заказа
Назначение: ввод данных заказа и отправка

```
class OrderFormView {
  constructor(formElement: HTMLFormElement)

  render(): HTMLElement
  onSubmit(handler: (order: IOrder) => void): void
  showValidationErrors(errors: string[]): void
}
```

### Сервисный слой
#### Api
(описан выше)

#### Modal
(описан выше)

#### EventEmitter
(описан выше)