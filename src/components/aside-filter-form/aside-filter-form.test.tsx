import { render, screen } from '@testing-library/react';
import AsideFilterForm from './aside-filter-form';

it('AsideFilter rendering', () => {
  render(<AsideFilterForm />);

  expect(screen.getByText('Фильтр')).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/до/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/от/i)).toBeInTheDocument();
  expect(screen.getByTestId('digital')).not.toBeChecked();
});
