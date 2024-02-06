import { render, screen } from '@testing-library/react';
import BasketPage from './basket';
import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeBasketProduct } from '../../utils/mocks';

describe('BasketPage', () => {
  it('rendering empty element when there is no products in basket', () => {

    const { withStoreComponent } = withStore(<BasketPage />);

    render(withRouter(withStoreComponent));

    expect(screen.getByText('Корзина (пусто)')).toBeInTheDocument();
  });

  it('rendering basket products when there are products in basket', () => {

    const mockBasketProducts = Array.from({ length: 4 }, () => makeFakeBasketProduct());

    const { withStoreComponent } = withStore(<BasketPage />, { basket: { basketProducts: mockBasketProducts, discount: 0, promo: '' } });

    render(withRouter(withStoreComponent));

    expect(screen.getAllByTestId('basket-item')).toHaveLength(4);
  });
});
