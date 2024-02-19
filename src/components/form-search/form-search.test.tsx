import { render, screen } from '@testing-library/react';
import SearchInputComponent from './form-search';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

it('FormSearch rendering', () => {
  render(<Provider store={store}><SearchInputComponent /></Provider>);

  expect(screen.getByPlaceholderText('Поиск по сайту')).toBeInTheDocument();
  expect(screen.queryByTestId('search-list')).toBeNull();
});
