import { BaseComponent } from '../base/baseComponent';
import { TProductType, IMouseEvent, IProduct} from '../../types';
import { ensureElement } from '../../utils/utils';
import { CDN_URL } from '../../utils/constants';
import { categoryClasses } from '../../utils/constants';



export class Card extends BaseComponent<IProduct> {
  protected titleEl: HTMLElement;
  protected imageEl: HTMLImageElement;
  protected categoryEl: HTMLElement;
  protected priceEl: HTMLElement;
  protected btnEl: HTMLButtonElement;
  protected blockName: string;

  constructor(blockName: string, container: HTMLElement, events: IMouseEvent) {
    super(container);
    this.blockName = blockName;
    this.titleEl = ensureElement(`.${blockName}__title`, container);
    this.priceEl = container.querySelector(`.${blockName}__price`) as HTMLElement;
    this.imageEl = ensureElement(`.${blockName}__image`, container) as HTMLImageElement;
    this.btnEl = container.querySelector(`.${blockName}__button`) as HTMLButtonElement;
    this.categoryEl = container.querySelector(`.${blockName}__category`) as HTMLElement;
    
    if (events.onClick) {
      if (this.btnEl) {
        this.btnEl.addEventListener('click', events.onClick);
      } else {
        container.addEventListener('click', events.onClick);
      }
    }
  }
  
  set id(val: string) {
    this.root.dataset.id = val;
  }

  get id(): string {
    return this.root.dataset.id || '';
  }

  set title(val: string) {
    this.titleEl.textContent = val;
  }

  get title(): string {
    return this.titleEl.textContent || '';
  }

  set price(val: number | null) {
    this.priceEl.textContent = val 
      ? val.toLocaleString('ru-RU') + ' синапсов' 
      : 'Бесценно';
  }

  set image(val: string) {
    this.imageEl.src = CDN_URL + val;
  }

  set category(category: TProductType) {
    this.categoryEl.textContent = category;
    this.categoryEl.classList.add(categoryClasses[category]);
  }
}


