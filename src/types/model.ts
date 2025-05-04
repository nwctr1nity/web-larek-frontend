import { IProduct, IOrder, IBasket } from "./index";

//модель
export interface IAppState {
    product: IProduct | null;
    productList: IProduct[];
    basket: IBasket;
    order: IOrder | null;
}
