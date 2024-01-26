import { BasketProduct } from '../../../types/bakset-product.type';
import type { State } from '../../../types/state.type';

export const getBasketProducts = (state: State): BasketProduct[] =>
  state.basket.basketProducts;
