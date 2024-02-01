import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../hooks';
import ModalLayoutComponent from '../modal-layout/modal-layout';
import PopupCatalogCardComponent from '../popup-card/popup-card';
import { Card } from '../../types/catalog-card.type';

type PopupContainerProps = {
  isActive: boolean;
  onClick: () => void;
  card: Card | null;
}

export default function PopupCardContainerComponent({ isActive, onClick, card }: PopupContainerProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const productsInBasket = useAppSelector((state) => state.basket.basketProducts);

  useEffect(() => {

    const isInBasket = productsInBasket.some((product) => product.card.id === card?.id);

    modalRef.current?.classList.toggle('modal--narrow', isInBasket);

  }, [isActive, onClick, productsInBasket, card]);

  return (
    <ModalLayoutComponent isActive={isActive} onClick={onClick} modalRef={modalRef}>
      <PopupCatalogCardComponent card={card} />
    </ModalLayoutComponent>
  );
}
