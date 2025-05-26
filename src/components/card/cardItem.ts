import { Card } from "./card";
import { IMouseEvent } from "../../types";

export class CardItem extends Card {
  constructor(container: HTMLElement, events: IMouseEvent) {
    super('card', container, events);
  }
}

