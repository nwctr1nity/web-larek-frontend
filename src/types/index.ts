//список видов товара
export const enum TProductType {
    softSkill = `софт-скилл`,
    other = `другое`,
    additional = `дополнительное`,
    button = `кнопка`,
    hardSkill = `хард-скилл`
}

//список способов оплаты
export const enum TPaymentMethod {
    online = `Онлайн`,
    onReceipt = `При получении`
}
//корзина
export type TBasket = {
    items: IProduct[];
	total: number;
}

export interface IBasket extends TBasket {
    countItems(): number;
	countTotal(): number;
    
    addItem(item: IProduct): void;
	removeItem(item: IProduct): void;
}

//форма оплаты и адреса
export type TPayment = {
    payment: TPaymentMethod;
    address: string;
}

export interface IPaymentForm extends TPayment {
    checkValidity(): boolean;
}

//форма контактов
export type TContacts = {
    email: string;
    phone: string;
}

export interface IContactsForm extends TContacts {
    checkValidity(): boolean;
}

//интерфейс продукта с сервера
export interface IProduct {
    id: string;
    type: TProductType;
    title: string;
    image: string;
    description: string;
    price: number;
}

//интейфейс отправляемого заказа
export interface IOrder extends TPayment, TContacts, TBasket {}


