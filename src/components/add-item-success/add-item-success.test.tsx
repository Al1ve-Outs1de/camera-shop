import { render, screen } from '@testing-library/react';
import AddItemSuccess from './add-item-success';
import { withRouter } from '../../utils/mock-component';

it('AddItem rendering', () => {
  render(withRouter(<AddItemSuccess onClick={vi.fn()} />));

  expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
  expect(screen.getByRole('link')).toBeInTheDocument();
});
