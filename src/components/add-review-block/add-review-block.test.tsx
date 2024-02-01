import { render, screen } from '@testing-library/react';
import AddReviewBlockComponent from './add-review-block';
import { withStore } from '../../utils/mock-component';

it('AddReview rendering', () => {
  const { withStoreComponent } = withStore(<AddReviewBlockComponent />);

  render(withStoreComponent);

  expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
  expect(screen.getByText(/Оставить свой отзыв/i)).toBeInTheDocument();
});
