import { IEvents } from '../base/events';
import { FormComponent } from '../form/formComponent';
import { IContacts } from '../../types';
import { EVENTS } from '../../utils/constants';

export class Contacts extends FormComponent<IContacts> {
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events, EVENTS.CONTACTS_SEND);
  }
}
