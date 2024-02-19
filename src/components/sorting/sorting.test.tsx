import { render, screen } from '@testing-library/react';
import SortingComponent from './sorting';
import { withRouter } from '../../utils/mock-component';

it('Sorting rendering', () => {
  render(withRouter(<SortingComponent onSortingChange={vi.fn()} />));

  expect(screen.getByText('Сортировать:')).toBeInTheDocument();
  expect(screen.getByLabelText('По возрастанию')).not.toBeChecked();
});
