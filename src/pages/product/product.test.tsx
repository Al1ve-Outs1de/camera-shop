import { render, screen, waitFor } from '@testing-library/react';
import { withRouter } from '../../utils/mock-component';
import ProductPage from './product';
import { makeFakeCard, makeFakeReview } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

const mockCards = Array.from({ length: 4 }, () => makeFakeCard());
const mockReviews = Array.from({ length: 5 }, () => makeFakeReview());
const mockProduct = makeFakeCard();

it('ProductPage rendering', async () => {
  fetchMock.mockResponses(
    [JSON.stringify(mockProduct), {}],
    [JSON.stringify(mockCards), {}],
    [JSON.stringify(mockReviews), {}]);

  render(withRouter(<Provider store={store}><ProductPage /></Provider>));

  await waitFor(async () => {
    expect(await screen.findAllByTestId('card-item')).toHaveLength(4);
    expect(await screen.findAllByTestId('review-item')).toHaveLength(3);
  });
});
