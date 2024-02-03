import { render, screen } from '@testing-library/react';
import FormPopupComponent from './form-popup';
import { withStore } from '../../utils/mock-component';

it('FormPopup rendering', () => {

  const { withStoreComponent } = withStore(<FormPopupComponent isActive onClick={vi.fn()} />);

  render(withStoreComponent);

  expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  expect(screen.queryByText(/Нужно оценить товар/i)).toBeNull();
});
