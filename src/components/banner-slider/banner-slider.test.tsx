import { render, screen } from '@testing-library/react';
import BannerSliderComponent from './banner-slider';
import { makeFakeCard } from '../../utils/mocks';
import { withRouter } from '../../utils/mock-component';

test('BannerSlider rendering', () => {

  const mockPromoCards = Array.from({ length: 4 }, () => makeFakeCard());

  const withRoute = withRouter(<BannerSliderComponent promos={mockPromoCards} />);

  render(withRoute);

  expect(screen.getAllByTestId('banner-slide')).toHaveLength(mockPromoCards.length);
});
