import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { camerasApi } from './camerasApi';
import { basketSlice } from './slices/basket/basket-slice';

const reducer = combineReducers({
  [camerasApi.reducerPath]: camerasApi.reducer,
  [basketSlice.name]: basketSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(camerasApi.middleware),
});

store.subscribe(() => {
  if (
    localStorage.getItem('basketProducts') ===
    JSON.stringify(store.getState().basket.basketProducts)
  ) {
    return;
  }
  localStorage.setItem(
    'basketProducts',
    JSON.stringify(store.getState().basket.basketProducts)
  );
});
