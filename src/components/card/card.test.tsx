import { render, screen } from '@testing-library/react';
import CardComponent from './card';
import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeCard } from '../../utils/mocks';

describe('CardComponent', () => {
  it('Card rendering when not in basket', () => {
    const mockCard = makeFakeCard();

    const { withStoreComponent } = withStore(<CardComponent catalogCard={mockCard} onClick={vi.fn()} />, { basket: { basketProducts: [], discount: 0, promo: '' } });

    render(withRouter(withStoreComponent));

    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
  });

  it('Card rendering when in basket', () => {
    const mockCard = makeFakeCard();

    const { withStoreComponent } = withStore(<CardComponent catalogCard={mockCard} onClick={vi.fn()} />, { basket: { basketProducts: [{ card: mockCard, count: 1 }], discount: 0, promo: '' } });

    render(withRouter(withStoreComponent));

    expect(screen.getByText(/В корзине/i)).toBeInTheDocument();
  });

});

