import { render, screen } from '@testing-library/react';
import BasketButtonComponent from './basket-button';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { withRouter } from '../../utils/mock-component';


it('correct rendering', () => {

  render(withRouter(<Provider store={store}><BasketButtonComponent /></Provider>));

  expect(screen.queryByText('1')).toBeNull();
});
