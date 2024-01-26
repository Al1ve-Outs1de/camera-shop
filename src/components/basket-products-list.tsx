import { useAppSelector } from '../hooks';
import BasketItemComponent from './basket-item';

export default function BasketProductsListComponent() {
  const basketProducts = useAppSelector((state) => state.basket.basketProducts);

  return (
    <ul className="basket__list">
      {basketProducts.map((product) => <BasketItemComponent item={product} key={product.card.id} />)}
    </ul>
  );
}
