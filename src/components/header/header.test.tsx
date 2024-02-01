import { render, screen } from '@testing-library/react';
import HeaderComponent from './header';
import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeBasketProduct } from '../../utils/mocks';

it('Header rendering', () => {
  const mockBasketProducts = Array.from({ length: 5 }, () => makeFakeBasketProduct());

  const withRoute = withRouter(<HeaderComponent />);

  const { withStoreComponent } = withStore(withRoute, { basket: { basketProducts: mockBasketProducts, discount: 0, promo: '' } });

  render(withStoreComponent);

  expect(screen.getByLabelText(/Переход на главную/)).toBeInTheDocument();
  expect(screen.getByTestId('products-count')).toHaveTextContent('5');
});
