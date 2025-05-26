import { BaseComponent } from '../base/baseComponent';
import { IMouseEvent } from '../../types';
import { ProductBasket } from '../../types';

export class BasketItem extends BaseComponent<ProductBasket> {
  protected indexEl: HTMLElement;
  protected titleEl: HTMLElement;
  protected priceEl: HTMLElement;
  protected removeBtn: HTMLButtonElement;
  
  constructor(container: HTMLElement, events: IMouseEvent) {
    super(container);
    this.titleEl = container.querySelector('.card__title') as HTMLElement;
    this.indexEl = container.querySelector('.basket__item-index') as HTMLElement;
    this.priceEl = container.querySelector('.card__price') as HTMLElement;
    this.removeBtn = container.querySelector('.card__button') as HTMLButtonElement;
    if (this.removeBtn) {
      this.removeBtn.addEventListener('click', (evt: MouseEvent) => {
        this.root.remove();
        events.onClick(evt);
      });
    }
  }
  
  set title(val: string) {
    this.titleEl.textContent = val;
  }
  
  set index(val: number) {
    this.indexEl.textContent = val.toString();
  }
  
  set price(val: number) {
    this.priceEl.textContent = val !== null 
  ? val.toLocaleString('ru-RU') + ' синапсов' 
  : 'Бесценно';
  }
}