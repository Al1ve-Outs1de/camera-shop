import { render, screen } from '@testing-library/react';
import ModalLayoutComponent from './modal-layout';

it('ModalLayout rendering', () => {
  render(<ModalLayoutComponent isActive onClick={vi.fn()}><h1>Example</h1></ModalLayoutComponent>);

  expect(screen.getByText('Example')).toBeInTheDocument();
  expect(screen.getByTestId('modal-block')).toHaveClass('is-active');
});
