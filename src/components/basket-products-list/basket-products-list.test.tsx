import { render, screen } from '@testing-library/react';
import BasketProductsListComponent from './basket-products-list';
import { withStore } from '../../utils/mock-component';
import { makeFakeBasketProduct } from '../../utils/mocks';

it('BasketList rendering', () => {
  const mockBasketProducts = Array.from({ length: 4 }, () => makeFakeBasketProduct());

  const { withStoreComponent } = withStore(<BasketProductsListComponent />, { basket: { basketProducts: mockBasketProducts, discount: 0, promo: '' } });

  render(withStoreComponent);

  expect(screen.getAllByTestId('basket-item').length).toBe(4);
});
