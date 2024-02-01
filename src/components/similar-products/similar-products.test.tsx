import { render, screen } from '@testing-library/react';
import { makeFakeCard } from '../../utils/mocks';
import SimilarProductsComponent from './similiar-products';
import { withRouter, withStore } from '../../utils/mock-component';

test('BannerSlider rendering', () => {

  const mockPromoCards = Array.from({ length: 6 }, () => makeFakeCard());

  const withRoute = withRouter(<SimilarProductsComponent similarProducts={mockPromoCards} />);

  const { withStoreComponent } = withStore(withRoute);

  render(withStoreComponent);

  expect(screen.getAllByTestId('card-item')).toHaveLength(mockPromoCards.length);
});
