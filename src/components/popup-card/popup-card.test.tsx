import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import PopupCatalogCardComponent from './popup-card';
import { makeFakeCard } from '../../utils/mocks';

it('PopupCard rendering', () => {
  const mockCard = makeFakeCard();

  const { withStoreComponent } = withStore(<PopupCatalogCardComponent card={mockCard} onAddButtonClick={vi.fn()} />);

  render(withStoreComponent);

  expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
  expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
});
