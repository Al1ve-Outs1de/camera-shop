import { render } from '@testing-library/react';
import LoadingSpinner from './loading-spinner';


it('LoadingSpinner rendering', () => {
  const { container } = render(<LoadingSpinner />);

  expect(container.firstChild).toHaveStyle(`
  display: flex;
  justify-content: center;
  align-items: center;
`);
});
