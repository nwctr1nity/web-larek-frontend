import { BaseComponent } from '../base/baseComponent';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { IModal } from '../../types';
import { EVENTS } from '../../utils/constants';

export class Modal extends BaseComponent<IModal> {
  protected closeBtn: HTMLElement;
  protected modalArea: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this.closeBtn = ensureElement('.modal__close', container);
    this.modalArea = ensureElement('.modal__content', container); 
    this.closeBtn.addEventListener('click', this.close.bind(this));
    this.modalArea.addEventListener('click', (evt: Event) => evt.stopPropagation());
    this.root.addEventListener('click', this.close.bind(this));
  }

  set content(val: HTMLElement) {
    this.modalArea.replaceChildren(val);
  }

  open() {
    this.root.classList.add('modal_active');
    this.events.emit(EVENTS.MODAL_OPEN);
  }

  close() {
    this.root.classList.remove('modal_active');
    this.modalArea.replaceChildren();
    this.events.emit(EVENTS.MODAL_CLOSE);
  }

  render(data: IModal): HTMLElement {
    super.update(data);
    this.open();
    return this.root;
  }
}
