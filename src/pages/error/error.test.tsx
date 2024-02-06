import { render, screen } from '@testing-library/react';
import { withRouter } from '../../utils/mock-component';
import ErrorPage from './error';

it('ErrorPage rendering', () => {

  render(withRouter(<ErrorPage />));

  expect(screen.getByText('Page not found')).toBeInTheDocument();
});
