import { render, screen } from '@testing-library/react';
import BasketItem from './basket-item';
import { makeFakeCard } from '../../utils/mocks';
import { withStore } from '../../utils/mock-component';


it('correct rendering', () => {
  const mockCard = makeFakeCard();
  const mockBasketItem = { card: mockCard, count: 5 };

  const { withStoreComponent } = withStore(<BasketItem item={mockBasketItem} onClick={vi.fn()} />, { basket: { basketProducts: [mockBasketItem], discount: 0, promo: '' } });

  render(withStoreComponent);

  expect(screen.getByText(mockCard.name)).toBeInTheDocument();
  expect(screen.getByDisplayValue('5')).toBeInTheDocument();
});
