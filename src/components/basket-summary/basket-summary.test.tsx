import { render, screen } from '@testing-library/react';
import { makeFakeBasketProduct } from '../../utils/mocks';
import BasketSummaryComponent from './basket-summary';
import { withRouter, withStore } from '../../utils/mock-component';

it('BasketSummary rendering', () => {
  const mockBasketProducts = Array.from({ length: 4 }, () => makeFakeBasketProduct());

  const { withStoreComponent } = withStore(<BasketSummaryComponent />, { basket: { basketProducts: mockBasketProducts, discount: 15, promo: 'camera-333' } });

  render(withRouter(withStoreComponent));

  expect(screen.getByDisplayValue('camera-333')).toBeInTheDocument();
  expect(screen.getByText(/Если у вас есть промокод на скидку, примените его в этом поле/i)).toBeInTheDocument();
  expect(screen.getByText(/Промокод принят!/i)).toBeInTheDocument();

});
