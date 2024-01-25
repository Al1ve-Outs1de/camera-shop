import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Card } from '../../../types/catalog-card.type';

type basketInitialState = {
  basketProducts: Card[];
};

const initialState: basketInitialState = {
  basketProducts: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addProductToBasket(state, action: PayloadAction<Card>) {
      state.basketProducts.push(action.payload);
    },
  },
});

export const { addProductToBasket } = basketSlice.actions;
