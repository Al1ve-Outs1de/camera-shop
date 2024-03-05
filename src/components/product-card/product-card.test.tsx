import { render, screen } from '@testing-library/react';
import { withRouter, withStore } from '../../utils/mock-component';
import ProductCardComponent from './product-card';
import { makeFakeCard } from '../../utils/mocks';

it('ProductCard rendering', () => {
  const mockProduct = makeFakeCard();

  const { withStoreComponent } = withStore(<ProductCardComponent card={mockProduct} />);

  render(withRouter(withStoreComponent));

  expect(screen.getByTestId('tabs-list')).toBeInTheDocument();
  expect(screen.getByTestId('tabs-text')).toBeInTheDocument();
});
