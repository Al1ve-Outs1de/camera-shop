import { render, screen } from '@testing-library/react';
import AddOrderSuccess from './add-order-success';
import { withRouter } from '../../utils/mock-component';

it('AddOrder rendering', () => {
  render(withRouter(<AddOrderSuccess />));

  expect(screen.getByText(/Спасибо за покупку/i)).toBeInTheDocument();
  expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();
});
