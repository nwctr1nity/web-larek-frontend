import { IShopModel } from './model';
import { IShopView } from './view';
import { EventEmitter } from '../components/base/events';

export interface IShopPresenter {
  model: IShopModel;
  view: IShopView;
  events: EventEmitter;
  init(): void;
}