import { IEvents } from '../base/events';
import { FormComponent } from '../form/formComponent';
import { IOrder } from '../../types';
import { EVENTS } from '../../utils/constants';


export class Order extends FormComponent<IOrder> {
  cardBtn: HTMLButtonElement;
  cashBtn: HTMLButtonElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events, EVENTS.ORDER_SEND);

    this.cardBtn = container.elements.namedItem('card') as HTMLButtonElement;
    this.cashBtn = container.elements.namedItem('cash') as HTMLButtonElement;

    this.buttonsOn();
  }

  buttonsOn() {
    const setActive = (active: 'card' | 'cash') => {
      this.cardBtn.classList.toggle('button_alt-active', active === 'card');
      this.cashBtn.classList.toggle('button_alt-active', active === 'cash');
      this.handleInputChange('payment', active);
    };

    this.cardBtn?.addEventListener('click', () => setActive('card'));
    this.cashBtn?.addEventListener('click', () => setActive('cash'));
  }

  buttonsOff(): void {
    this.cardBtn.classList.remove('button_alt-active');
    this.cashBtn.classList.remove('button_alt-active');
  }

  updateValidationState(): void {
    super.updateValidationState();
    if (this.cardBtn.classList.contains('button_alt-active')) {
      this.handleInputChange('payment', 'card');
    } else if (this.cashBtn.classList.contains('button_alt-active')) {
      this.handleInputChange('payment', 'cash');
    }
  }
}