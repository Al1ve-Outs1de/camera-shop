import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import PopupCardRemoveComponent from './popup-card-remove';
import { makeFakeCard } from '../../utils/mocks';

it('PopupCardRemove rendering', () => {
  const mockCard = makeFakeCard();

  const { withStoreComponent } = withStore(<PopupCardRemoveComponent card={mockCard} onClick={vi.fn()} />);

  render(withStoreComponent);

  expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
  expect(screen.getByText('Удалить')).toBeInTheDocument();
  expect(screen.getByText(/Продолжить покупки?/i)).toBeInTheDocument();
});
