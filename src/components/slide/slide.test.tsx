import { render, screen } from '@testing-library/react';
import { withRouter } from '../../utils/mock-component';
import SlideComponent from './slide';
import { makeFakeCard } from '../../utils/mocks';

it('Slide rendering', () => {
  const mokePromo = makeFakeCard();

  const withRoute = withRouter(<SlideComponent promo={mokePromo} />);

  render(withRoute);

  expect(screen.getByText('Новинка!')).toBeInTheDocument();
  expect(screen.getByText(mokePromo.name)).toBeInTheDocument();
});
