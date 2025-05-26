import { IEvents } from '../base/events';

export abstract class BaseModel<T> {
  constructor(data: Partial<T>, public readonly events: IEvents, protected modelName = 'BaseModel') {
    Object.assign(this, data);
  }

  update(event: string, data?: object) {
    this.events.emit(event, { model: this.modelName, ...(data || {}) });
  }

  assign(data: Partial<T>) {
    Object.assign(this, data);
    return this;
  }
}

