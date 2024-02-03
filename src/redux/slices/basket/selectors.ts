import type { State } from '../../../types/state.type';

export const getBasketProducts = (state: State) => state.basket.basketProducts;

export const getPromo = (state: State) => state.basket.promo;

export const getBasketDiscount = (state: State) => state.basket.discount;
