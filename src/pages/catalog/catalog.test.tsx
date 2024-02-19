import { render, screen, waitFor } from '@testing-library/react';
import { withRouter } from '../../utils/mock-component';
import CatalogPage from './catalog';
import { makeFakeCard, makeFakePromo } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const mockCards = Array.from({ length: 5 }, () => makeFakeCard());
const mockPromos = Array.from({ length: 3 }, () => makeFakePromo());

it('ProductPage rendering', async () => {
  fetchMock.mockResponses([JSON.stringify(mockCards), {}], [JSON.stringify(mockPromos), {}]);

  render(withRouter(<Provider store={store}><CatalogPage /></Provider>));

  await waitFor(async () => {
    expect(await screen.findAllByTestId('card-item')).toHaveLength(5);
    expect(await screen.findAllByTestId('banner-slide')).toHaveLength(3);
  });
});
