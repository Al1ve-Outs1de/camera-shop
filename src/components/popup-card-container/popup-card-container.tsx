import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ModalLayoutComponent from '../modal-layout/modal-layout';
import PopupCatalogCardComponent from '../popup-card/popup-card';
import { Card } from '../../types/catalog-card.type';
import { getBasketProducts } from '../../store/slices/basket/selectors';
import AddItemSuccess from '../add-item-success/add-item-success';
import { addProductToBasket } from '../../store/slices/basket/basket-slice';

type PopupContainerProps = {
  isActive: boolean;
  onClick: () => void;
  card: Card | null;
}

export default function PopupCardContainerComponent({ isActive, onClick, card }: PopupContainerProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const productsInBasket = useAppSelector(getBasketProducts);
  const isInBasket = productsInBasket.some((product) => product.card.id === card?.id);

  useEffect(() => {
    modalRef.current?.classList.toggle('modal--narrow', isInBasket);

  }, [isActive, onClick, productsInBasket, card, isInBasket]);

  return (
    <ModalLayoutComponent isActive={isActive} onClick={onClick} modalRef={modalRef}>
      {isInBasket ? <AddItemSuccess onClick={onClick} /> : <PopupCatalogCardComponent card={card} onAddButtonClick={() => dispatch(addProductToBasket(card as Card))} />}
    </ModalLayoutComponent>
  );
}
