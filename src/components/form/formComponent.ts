import { BaseComponent } from '../base/baseComponent';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { IFormState } from '../../types';
import { EVENTS } from '../../utils/constants';

export class FormComponent<T> extends BaseComponent<IFormState> {
  protected submitBtn: HTMLButtonElement = ensureElement('button[type=submit]', this.container) as HTMLButtonElement;
  protected errorContainer: HTMLElement = ensureElement('.form__errors', this.container);

  constructor(protected container: HTMLFormElement, protected events: IEvents, private submitEventName: string) {
    super(container);

    this.container.addEventListener('input', (evt: Event) => {
      const input = evt.target as HTMLInputElement;
      const field = input.name as keyof T;
      this.handleInputChange(field, input.value);
    });

    this.container.addEventListener('submit', (evt: Event) => {
      evt.preventDefault();
      this.events.emit(this.submitEventName);
    });
  }

  set errors(message: string) {
    this.errorContainer.textContent = message;
  }

  set validity(isValid: boolean) {
    this.submitBtn.disabled = !isValid;
  }

  updateValidationState(): void {
    const elements = this.container.elements;
    for (let i = 0; i < elements.length; i++) {
      const input = elements[i] as HTMLInputElement;
      if (input.name) {
        this.handleInputChange(input.name as keyof T, input.value);
      }
    }
  }

  handleInputChange(input: keyof T, value: string) {
    this.events.emit(EVENTS.FORM_INPUT_UPDATE, { input, value });
  }

  render(state: Partial<T> & IFormState) {
    const { valid, errors, ...fields } = state;
    this.update({ valid, errors });
    Object.assign(this, fields);
    return this.container;
  }
}
