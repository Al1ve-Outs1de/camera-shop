import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import BasketItemComponent from '../basket-item/basket-item';
import { Card } from '../../types/catalog-card.type';
import ModalLayoutComponent from '../modal-layout/modal-layout';
import PopupCardRemoveComponent from '../popup-card-remove/popup-card-remove';
import { useModal } from '../../hooks/useModal';
import { getBasketProducts } from '../../redux/slices/basket/selectors';

export default function BasketProductsListComponent() {
  const basketProducts = useAppSelector(getBasketProducts);
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [isModalActive, toggleActive] = useModal();

  const setActiveCardWithModal = (id: number) => {

    const currentActiveCard = basketProducts.find((product) => product.card.id === id);

    if (currentActiveCard) {
      toggleActive();
      setActiveCard(currentActiveCard.card);
    }
  };


  return (
    <>
      <ul className="basket__list">
        {basketProducts.map((product) => <BasketItemComponent item={product} key={product.card.id} onClick={setActiveCardWithModal} />)}
      </ul>
      <ModalLayoutComponent isActive={isModalActive} onClick={toggleActive}>
        <PopupCardRemoveComponent card={activeCard} onClick={toggleActive} />
      </ModalLayoutComponent>
    </>
  );
}
