import { IProduct, TProductType } from '../../types';
import { BaseModel } from '../model/model';

export class ProductItem extends BaseModel<IProduct> {
  id: string;
  description: string;
  image: string;
  title: string;
  category: TProductType;
  price: number | null;
}