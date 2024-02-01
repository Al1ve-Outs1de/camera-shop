import { render, screen } from '@testing-library/react';
import { makeFakeCard } from '../../utils/mocks';
import PopupCardContainerComponent from './popup-card-container';
import { withStore } from '../../utils/mock-component';

it('Modal has class "modal--narrow" when card is in basket', () => {
  const mockBasketCard = makeFakeCard();

  const { withStoreComponent } = withStore(<PopupCardContainerComponent card={mockBasketCard} isActive onClick={vi.fn()} />, {
    basket: {
      basketProducts: [{ card: mockBasketCard, count: 1 }],
      discount: 0,
      promo: ''
    }
  });

  render(withStoreComponent);

  expect(screen.getByTestId('modal-block')).toHaveClass('modal--narrow');
});
