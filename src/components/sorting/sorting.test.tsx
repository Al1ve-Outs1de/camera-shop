import { render, screen } from '@testing-library/react';
import SortingComponent from './sorting';

it('Sorting rendering', () => {
  render(<SortingComponent />);

  expect(screen.getByText('Сортировать:')).toBeInTheDocument();
  expect(screen.getByLabelText('По возрастанию')).toBeChecked();
});
