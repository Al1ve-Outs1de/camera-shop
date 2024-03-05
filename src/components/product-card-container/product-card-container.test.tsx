import { render, screen } from '@testing-library/react';
import ProductCardContainer from './product-card-container';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { makeFakeCard } from '../../utils/mocks';

it('Modal has class "modal--narrow" when card is in basket', () => {
  const mockCard = makeFakeCard();

  render(<Provider store={store}><ProductCardContainer card={mockCard} isActive isAdded={false} onAddButtonClick={vi.fn()} onCloseButtonClick={vi.fn()} /></Provider>);

  expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
  expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
});
