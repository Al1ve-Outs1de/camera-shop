import { render, screen, waitFor } from '@testing-library/react';
import { withRouter } from '../../utils/mock-component';
import CatalogContentComponent from './catalog-content';
import { makeFakeCard } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const mockCards = Array.from({ length: 10 }, () => makeFakeCard());


it('CatalogContent rendering', async () => {
  fetchMock.mockResponse(JSON.stringify(mockCards));

  render(withRouter(<Provider store={store}><CatalogContentComponent /></Provider>));

  await waitFor(async () => {
    expect(await screen.findAllByTestId('card-item')).toHaveLength(9);
    expect(screen.getByTestId('pagination-block')).toBeInTheDocument();
  });
});

