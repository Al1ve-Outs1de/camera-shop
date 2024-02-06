import { render, screen } from '@testing-library/react';
import { withRouter, withStore } from '../../utils/mock-component';
import CatalogListComponent from './catalog-list';

it('CatalogList rendering', () => {

  const { withStoreComponent } = withStore(<CatalogListComponent />);

  render(withRouter(withStoreComponent));

  expect(screen.getAllByTestId('card-item')).toHaveLength(9);
});
