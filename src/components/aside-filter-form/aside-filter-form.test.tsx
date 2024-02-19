import { render, screen } from '@testing-library/react';
import AsideFilterForm from './aside-filter-form';
import { withRouter } from '../../utils/mock-component';

it('AsideFilter rendering', () => {
  const expectedMinPrice = 1000;
  const expectedMaxPrice = 5000;

  render(withRouter(<AsideFilterForm maxPrice={expectedMaxPrice} minPrice={expectedMinPrice} onCategoryChange={vi.fn()} onLevelChange={vi.fn()} onPriceChange={vi.fn()} onResetClick={vi.fn()} onTypeChange={vi.fn()} />));

  expect(screen.getByText('Фильтр')).toBeInTheDocument();
  expect(screen.getByPlaceholderText(expectedMinPrice)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(expectedMaxPrice)).toBeInTheDocument();
  expect(screen.getByTestId('digital')).not.toBeChecked();
});
