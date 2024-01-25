import type { Card } from '../../../types/catalog-card.type';
import type { State } from '../../../types/state.type';

export const getBasketProducts = (state: State): Card[] =>
  state.basket.basketProducts;
