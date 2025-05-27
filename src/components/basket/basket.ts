import { IBasketData } from '../../types';
import { BaseComponent } from '../base/baseComponent';
import { IEvents } from '../base/events';
import { EVENTS } from '../../utils/constants';

export class Basket extends BaseComponent<IBasketData> {
  protected listEl: HTMLElement;
  protected priceEl: HTMLElement;
  protected orderBtn: HTMLButtonElement;
  
  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.orderBtn = container.querySelector(`.basket__button`) as HTMLButtonElement;
    this.priceEl = container.querySelector(`.basket__price`) as HTMLElement;
    this.listEl = container.querySelector(`.basket__list`) as HTMLElement;
    this.orderBtn.addEventListener('click', () => {
      events.emit(EVENTS.BASKET_ORDER);
    });
  }
  
  set list(items: HTMLElement[]) {
    this.listEl.replaceChildren(...items);
    this.orderBtn.disabled = items.length === 0;
  }

  set price(val: number) {
    this.priceEl.textContent = (val || 0).toLocaleString('ru-RU') + ' синапсов';
  }
  
  buttonOff(): void {
    this.orderBtn.disabled = true;
  }
  
  refreshIndex(): void {
    Array.from(this.listEl.children).forEach((child, idx) => {
      const indexEl = child.querySelector('.basket__item-index');
      if (indexEl) {
        indexEl.textContent = (idx + 1).toString();
      }
    });
  }
}


