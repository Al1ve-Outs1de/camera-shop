import { render, screen } from '@testing-library/react';
import ReviewsSectionComponent from './reviews-section';
import { makeFakeReview } from '../../utils/mocks';
import { withStore } from '../../utils/mock-component';

it('ReviewsSection rendering', () => {
  const mockReviews = Array.from({ length: 5 }, () => makeFakeReview());

  const { withStoreComponent } = withStore(<ReviewsSectionComponent reviews={mockReviews} />);

  render(withStoreComponent);

  expect(screen.getAllByTestId('review-item')).toHaveLength(3);
  expect(screen.getByText('Показать больше отзывов')).toBeInTheDocument();
});
