import { useEffect, useRef } from 'react';
import ModalLayoutComponent from '../modal-layout/modal-layout';
import AddItemSuccess from '../add-item-success/add-item-success';
import PopupCatalogCardComponent from '../popup-card/popup-card';
import { Card } from '../../types/catalog-card.type';

type ProductCardContainerProps = {
  isActive: boolean;
  isAdded: boolean;
  onCloseButtonClick: () => void;
  onAddButtonClick: () => void;
  card: Card;
}

export default function ProductCardContainer({ card, isActive, onCloseButtonClick, onAddButtonClick, isAdded }: ProductCardContainerProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  if (isAdded) {
    modalRef.current?.classList.add('modal--narrow');
  }

  useEffect(() => {
    modalRef.current?.classList.toggle('modal--narrow', isAdded);
  }, [isAdded, isActive]);

  return (
    <ModalLayoutComponent isActive={isActive} onClick={onCloseButtonClick} modalRef={modalRef}>
      {isAdded ? <AddItemSuccess onClick={onCloseButtonClick} /> : <PopupCatalogCardComponent card={card} onAddButtonClick={onAddButtonClick} />}
    </ModalLayoutComponent>
  );
}
