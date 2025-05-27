import { Card } from "./card";
import { IMouseEvent } from "../../types";
import { ensureElement } from "../../utils/utils";

export class CardPreview extends Card {
  protected textEl: HTMLElement;
  constructor(container: HTMLElement, events: IMouseEvent) {
    super('card', container, events);
    this.textEl = ensureElement('.card__text', container);
  }

  set description(val: string) {
    this.textEl.textContent = val;
  }

  disableButton() {
    this.btnEl.disabled = true;
  }
}