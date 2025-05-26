export abstract class BaseComponent<T> {
  constructor(protected readonly root: HTMLElement) {}

  update(data?: Partial<T>): void {
    Object.assign(this, data ?? {});
  }

  get element(): HTMLElement {
    return this.root;
  }
}