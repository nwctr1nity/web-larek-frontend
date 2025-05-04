import { IProduct } from "./index";
import { TApiResponse } from "./api";


// интерфейс для рендера товаров
export interface IProductView {
    renderProductList(items: IProduct[]): void;
    showError(message: string): void;
}

// интерфейс отображения валидации
export interface IOrderView {
    showOrderStatus(response: TApiResponse): void;
    showValidationError(message: string): void;
    showError(message: string): void;
}