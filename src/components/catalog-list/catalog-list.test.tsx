import { render, screen, waitFor } from '@testing-library/react';
import { withRouter } from '../../utils/mock-component';
import CatalogListComponent from './catalog-list';
import { makeFakeCard } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

const mockCards = Array.from({ length: 10 }, () => makeFakeCard());

it('CatalogList rendering', async () => {
  fetchMock.mockResponse(JSON.stringify(mockCards));
  render(withRouter(<Provider store={store}><CatalogListComponent /></Provider>));

  await waitFor(async () => {
    expect(await screen.findAllByTestId('card-item')).toHaveLength(9);
  });
});
