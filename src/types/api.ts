import { IProduct, IOrder } from "./index";

// тип ответа с сервера
export type TApiResponse = {
    id: string;
    total: number;
}

//интерфейс запроса на сервер
export interface IApiRequest {
    getProductList:() => Promise<IProduct[]>;
    successResponse:(order: IOrder) => Promise<TApiResponse>
}
