import { render, screen } from '@testing-library/react';
import HeaderComponent from './header';
import { withRouter } from '../../utils/mock-component';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

it('Header rendering', () => {
  const withRoute = withRouter(<Provider store={store}><HeaderComponent /></Provider>);

  render(withRoute);

  expect(screen.getByLabelText(/Переход на главную/)).toBeInTheDocument();
  expect(screen.queryByTestId('products-count')).toBeNull();
});
