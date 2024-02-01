import { render, screen } from '@testing-library/react';
import { withRouter } from '../../utils/mock-component';
import Pagination from './pagination';

describe('Pagination', () => {
  it('button "back" not rendered when current page is less or equal to 3', () => {
    const withRoute = withRouter(<Pagination currentPage={2} onClick={vi.fn()} totalCardsCount={40} cardsPerPage={9} />);

    render(withRoute);

    expect(screen.queryByTestId('button-back')).toBeNull();
  });

  it('button "back" is rendered when current page is more or than 3', () => {
    const withRoute = withRouter(<Pagination currentPage={5} onClick={vi.fn()} totalCardsCount={40} cardsPerPage={9} />);

    render(withRoute);

    expect(screen.getByTestId('button-back')).toBeInTheDocument();
  });
});
