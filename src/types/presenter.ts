import { IProduct, IOrder, TPayment, TContacts } from "./index";

// интерфейс для управления отображением
export interface IProductPresenter {
    getProductList(): Promise<void>;
    addToBasket(item: IProduct): void;
    removeFromBasket(item: IProduct): void;
}

// интерфейс для заказа и валидации
export interface IOrderPresenter {
    submitOrder(order: IOrder): Promise<void>;
    validatePayment(payment: TPayment): boolean;
    validateContacts(contacts: TContacts): boolean;
}