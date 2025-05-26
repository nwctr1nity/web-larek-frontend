import { BaseComponent } from '../base/baseComponent';
import { ISuccess } from '../../types';
import { IEvents } from '../base/events';
import { Modal } from '../modal/modal';

export class Success extends BaseComponent<ISuccess> {
  protected buttonEl: HTMLButtonElement;
  protected messageEl: HTMLElement;

  constructor(container: HTMLElement, private events: IEvents, private modal: Modal) {
    super(container);
    this.buttonEl = container.querySelector(`.order-success__close`);
    this.messageEl = container.querySelector(`.order-success__description`);
    this.buttonEl.addEventListener('click', () => {
      this.events.emit('modal:close');
      this.modal.close();
  });
  }
  set total(price: number) {
    this.messageEl.textContent = `Списано ${price.toLocaleString('ru-RU')} синапсов`;
  }
}
