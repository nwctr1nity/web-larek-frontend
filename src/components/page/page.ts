import { BaseComponent } from '../base/baseComponent';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { IPage } from '../../types';


export class Page extends BaseComponent<IPage> {
  protected counterEl: HTMLElement = ensureElement('.header__basket-counter', document.body);
  protected basketEl: HTMLElement = ensureElement('.header__basket', document.body);
  protected galleryContainer: HTMLElement = ensureElement('.gallery', document.body);
  protected wrapper: HTMLElement = ensureElement('.page__wrapper', document.body);

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this.basketEl.addEventListener('click', () => {
      this.events.emit('basket:view');
    });
  }

  set gallery (items: HTMLElement[]) {
    this.galleryContainer.replaceChildren(...items);
  }

  set lockScroll(flag: boolean) {
    if (flag) this.wrapper.classList.add('page__wrapper_locked');
    else this.wrapper.classList.remove('page__wrapper_locked');
  }

  set basketCounter(val: number) {
    this.counterEl.textContent = String(val);
  }
}
