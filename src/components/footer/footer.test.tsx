import { render, screen } from '@testing-library/react';
import FooterComponent from './footer';

it('Footer rendering', () => {
  render(<FooterComponent />);

  expect(screen.getByText(/Интернет-магазин фото- и видеотехники/i)).toBeInTheDocument();
});
