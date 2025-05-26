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
Приложение построено по принципам MVP (Model-View-Presenter), однако от явной сущности класса-презентера я решил впоследствии отказаться. Основные обязанности презентера выполняются через обработку событий глобальным EventEmitter (eventBus), который связывает пользовательский ввод, обновление модели и перерисовку представления.

### Модель
Модель данных описывает сущности приложения, такие как товары, корзина, заказ, а также хранит внутреннее состояние приложения. Это классы, которые инкапсулируют данные и связанную с ними логику. Все обновления происходят через вызовы методов и события.

#### Пример:
```
export interface IProduct {
  id: string;
  title: string;
  image: string;
  description: string;
  category: TProductType;
  price: number | null;
}
```

### Отображение
Отображение отвечает за визуальный вывод и взаимодействие с пользователем. Это классы, которые рендерят DOM-элементы, принимают данные на вход и реагируют на действия пользователя. Каждый компонент реализует собственные методы для отрисовки и обновления.

```
class Page extends BaseComponent<IPage> {
  set gallery(items: HTMLElement[]): void;
  set lockScroll(flag: boolean): void;
  set basketCounter(val: number): void;
}
```

### Презентационный слой
Связующее звено между моделью и представлением реализовано через подписки на события с помощью eventBus. Обработчики событий (например, добавление товара в корзину, отправка формы, очистка корзины) выполняют функции презентера. Важно: В моём проекте нет отдельного класса-презентера – его обязанности распределены между обработчиками событий, методами state-классов и вызовами обновления представления.

## Взаимодействие частей
Компоненты обновляются в ответ на события, генерируемые пользователем или системой. Эти события ловятся обработчиками, реализующими функции презентера, которые обновляют модель и инициируют перерисовку представления.

Например, при добавлении товара в корзину событие product:add-to-basket передаётся в ShopState, обновляется массив в корзине и вызывается событие для повторного рендера интерфейса. При отправке заказа происходит фильтрация товаров с ценой null, затем корзина очищается, а счётчик корзины обновляется.

#### Пример:
```
eventBus.on('order:complete', (res: ApiListResponse<string>) => {
  app.basket.clear();
  mainPage.basketCounter = app.basket.countItems();
  successComponent.update({
    total: res.total,
  });
  modal.render({ content: successComponent.element });
});
```

## Классы в приложении
Ниже перечислены основные классы приложения, отсортированные по архитектурным слоям:

### Модель
#### ShopState
Роль: глобальное хранилище состояния приложения
Назначение: управление данными каталога товаров, корзины и заказа

```
class ShopState {
  public basket: BasketState;
  public catalog: CatalogState;
  public order: OrderState;
}
```

Скомпозирована из подмоделей OrderState, BasketState и CatalogState
```
class BasketState {
  basket: ProductItem[];

  addItem(item: ProductItem): void;
  removeItem(id: string): void;
  countItems(): number;
  countTotal(): number;
  clear(): void;
  save(): void;
  load(): void;
}

class OrderState {
  order: IOrder;

  updateFormInput(input: keyof IOrderForm, value: string): void;
  validateContacts(): boolean;
  validateOrder(): boolean;
  prepare(): void;
  reset(): void;
}

class CatalogState {
  products: ProductItem[];

  setProducts(items: IProduct[]): void;
}
```


#### ProductItem
Роль: типизированная обёртка над товаром
Назначение: единица каталога, умеющая себя сериализовать

```
class ProductItem extends BaseModel<IProduct> {
  id: string;
  description: string;
  price: number | null;
  ...
}
```

### View
#### Page
Роль: базовая страница
Назначение: работа с DOM-элементами и прокруткой

```
class Page BaseComponent<IPage> {
  set gallery(items: HTMLElement[]): void;
  set lockScroll(flag: boolean): void;
  set basketCounter(val: number): void;
}
```

#### Card / CardPreview
Роль: карточка товара
Назначение: отображение товара в каталоге и в превью

```
class Card extends BaseComponent<IProduct> {
  set title(val: string): void;
  set price(val: number): void;
  set image(val: string): void;
  ...
}
```

#### Basket
Роль: корзина товаров
Назначение: отображение списка покупок и кнопки оформления

```
class Basket extends BaseComponent<IBasketData> {
  set list(items: HTMLElement[]): void;
  set price(value: number): void;
  ...
}
```

#### Order / Contacts
Роль: форма ввода
Назначение: получение и валидация данных заказа

```
class Order extends FormComponent<IOrder> {
  buttonsOn(): void;
  buttonsOff(): void;
  updateValidationState(): void;
}
```

### Сервисный слой
К этому слою относятся:

#### Api
Класс для осуществления API-запросов (GET, POST) для получения данных и отправки заказов.

```
export class Api {
  get(uri: string): Promise<...>;
  post(uri: string, data: object): Promise<...>;
}
```

#### Modal
Класс для управления модальными окнами (открытие, закрытие, установка контента).

```
export class Modal extends BaseComponent<IModal> {
  open(): void;
  close(): void;
  set content(val: HTMLElement): void;
}
```

#### EventEmitter
Событийный брокер для коммуникации между слоями без прямых зависимостей.
```
export class EventEmitter {
  emit(event: string, data?: any): void;
  on(event: string, callback: Function): void;
}
```

#### Utils
Содержит рразличные утилиты для работы с DOM и обработки ошибок.