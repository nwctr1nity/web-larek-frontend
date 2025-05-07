export class Modal {
  protected container = document.querySelector('modal__container');
  protected closeButton = this.container.querySelector('.modal__close');

  constructor() {
    this.closeButton.addEventListener('click', () => this.close());
  }

  open() {
    this.container.classList.add('modal_active'); 
  }

  close() {
    this.container.classList.remove('modal_active');
  }
}

export const appModal = new Modal();