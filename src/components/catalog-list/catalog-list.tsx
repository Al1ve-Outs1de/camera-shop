import { useState } from 'react';
import { CARDS_PER_PAGE } from '../../consts';
import type { Card } from '../../types/catalog-card.type';
import CardComponent from '../card/card';
import PopupCardContainerComponent from '../popup-card-container/popup-card-container';
import { useModal } from '../../hooks/use-modal';

type CatalogListProps = {
  cards: Card[];
  currentPage: number;
}

export default function CatalogListComponent({ cards, currentPage }: CatalogListProps) {
  const [isModalActive, toggleActive] = useModal();
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const lastCardIndexForPage = currentPage * CARDS_PER_PAGE;
  const firstCardIndexForPage = lastCardIndexForPage - CARDS_PER_PAGE;
  const currentCardsForPage = cards.slice(firstCardIndexForPage, lastCardIndexForPage);

  const setActiveCardWithModal = (id: number) => {

    const currentActiveCard = cards.find((card) => card.id === id);

    if (currentActiveCard) {
      toggleActive();
      setActiveCard(currentActiveCard);
    }
  };

  return (
    <>
      <div className="cards catalog__cards">
        {currentCardsForPage.map((card) => <CardComponent catalogCard={card} key={card.id} onClick={setActiveCardWithModal} />)}
      </div>
      <PopupCardContainerComponent
        isActive={isModalActive}
        onClick={() => {
          toggleActive();
        }}
        card={activeCard}
      />
    </>
  );
}
