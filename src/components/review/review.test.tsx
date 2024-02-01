import { render, screen } from '@testing-library/react';
import ReviewComponent from './review';
import { makeFakeReview } from '../../utils/mocks';

it('Review rendering', () => {
  const mockReview = makeFakeReview();

  render(<ReviewComponent review={mockReview} />);

  expect(screen.getByTestId('review-date')).toBeInTheDocument();
  expect(screen.getByText(`Оценка: ${mockReview.rating}`)).toBeInTheDocument();
});
