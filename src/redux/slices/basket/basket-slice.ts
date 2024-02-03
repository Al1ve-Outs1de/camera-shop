import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Card } from '../../../types/catalog-card.type';
import type { BasketProduct } from '../../../types/bakset-product.type';

export type basketInitialState = {
  basketProducts: BasketProduct[];
  discount: number;
  promo: string;
};

const initialState: basketInitialState = {
  basketProducts: [],
  discount: 0,
  promo: '',
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addProductToBasket(state, action: PayloadAction<Card>) {
      const newProduct = action.payload;
      const existingProductIndex = state.basketProducts.findIndex(
        (product) => product.card.id === newProduct.id
      );

      if (existingProductIndex !== -1) {
        state.basketProducts[existingProductIndex].count += 1;
      } else {
        state.basketProducts.push({ card: newProduct, count: 1 });
      }
    },
    incrementProductCount(
      state,
      { payload: productId }: PayloadAction<number>
    ) {
      const basketProduct = state.basketProducts.find(
        (product) => product.card.id === productId
      );

      if (basketProduct) {
        basketProduct.count++;
      }
    },
    decrementProductCount(
      state,
      { payload: productId }: PayloadAction<number>
    ) {
      const basketProduct = state.basketProducts.find(
        (product) => product.card.id === productId
      );

      if (basketProduct) {
        basketProduct.count--;
      }
    },
    removeProductFromBasket(
      state,
      { payload: productId }: PayloadAction<number>
    ) {
      state.basketProducts = state.basketProducts.filter(
        (product) => product.card.id !== productId
      );
    },
    setProductCount(
      state,
      {
        payload: { productId, count },
      }: PayloadAction<{ productId: number; count: number }>
    ) {
      const basketProduct = state.basketProducts.find(
        (product) => product.card.id === productId
      );

      if (basketProduct) {
        basketProduct.count = count;
      }
    },
    setDiscount(
      state,
      { payload }: PayloadAction<{ discount: number; promo: string }>
    ) {
      state.discount = payload.discount;
      state.promo = payload.promo;
    },
  },
});

export const {
  addProductToBasket,
  incrementProductCount,
  decrementProductCount,
  removeProductFromBasket,
  setProductCount,
  setDiscount,
} = basketSlice.actions;
