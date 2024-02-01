import { render, screen } from '@testing-library/react';
import InBasketButtonComponent from './in-basket-button';
import { withRouter } from '../../utils/mock-component';

it('InBasketButton rendering', () => {
  const withRoute = withRouter(<InBasketButtonComponent />);

  render(withRoute);

  expect(screen.getByText(/В корзине/i)).toBeInTheDocument();
});
