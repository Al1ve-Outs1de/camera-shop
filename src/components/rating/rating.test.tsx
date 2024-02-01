import { render, screen } from '@testing-library/react';
import RatingComponent from './rating';

it('Rating rendering', () => {
  render(<RatingComponent rating={4} />);

  expect(screen.getAllByTestId('full-star')).toHaveLength(4);
});
