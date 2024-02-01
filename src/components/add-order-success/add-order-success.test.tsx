import { render, screen } from '@testing-library/react';
import AddOrderSuccess from './add-order-success';

it('AddOrder rendering', () => {
  render(<AddOrderSuccess />);

  expect(screen.getByText(/Спасибо за покупку/i)).toBeInTheDocument();
  expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();
});
