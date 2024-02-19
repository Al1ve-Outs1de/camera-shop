import { render, screen } from '@testing-library/react';
import { withRouter } from '../../utils/mock-component';
import CatalogListComponent from './catalog-list';
import { makeFakeCard } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

const mockCards = Array.from({ length: 10 }, () => makeFakeCard());

describe('CatalogList', () => {
  it('render filled list', () => {
    render(withRouter(<Provider store={store}><CatalogListComponent cards={mockCards} currentPage={1} /></Provider>));

    expect(screen.getAllByTestId('card-item')).toHaveLength(9);
  });

  it('render message if list is empty', () => {
    render(withRouter(<Provider store={store}><CatalogListComponent cards={[]} currentPage={1} /></Provider>));

    expect(screen.getByText(/По вашему запросу ничего не найдено/i)).toBeInTheDocument();
  });
});
