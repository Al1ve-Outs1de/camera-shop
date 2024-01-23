import { Link } from 'react-router-dom';
import type { Promo } from '../types/promo.type';
import ProductImageComponent from './product-image';
import { AppRoute } from '../consts';

type SlideProps = {
  promo: Promo;
}

export default function SlideComponent({ promo }: SlideProps) {
  return (
    <div className="banner">
      <ProductImageComponent cardImage={promo} />
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">
          {promo.name}
        </span>
        <span className="banner__text">
          Профессиональная камера от&nbsp;известного производителя
        </span>
        <Link className="btn" to={`${AppRoute.Product}/${promo.id}`}>
          Подробнее
        </Link>
      </p>
    </div>
  );
}
