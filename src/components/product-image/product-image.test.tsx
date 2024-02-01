import { render, screen } from '@testing-library/react';
import ProductImageComponent from './product-image';
import { makeFakeCard } from '../../utils/mocks';

it('ProductImage rendering', () => {
  const mockProduct = makeFakeCard();

  render(<ProductImageComponent cardImage={mockProduct} />);

  expect(screen.getByTestId('product-image')).toBeInTheDocument();
});
