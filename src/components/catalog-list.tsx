import { useCallback, useEffect, useState } from 'react';
import { CARDS_PER_PAGE } from '../consts';
import { useGetProductsQuery } from '../redux/camerasApi';
import type { Card } from '../types/catalog-card.type';
import CardComponent from './card';
import PaginationComponent from './pagination';
import { useSearchParams } from 'react-router-dom';
import PopupCardContainerComponent from './popup-card-container';

export default function CatalogListComponent() {
  const { data: cards = [] } = useGetProductsQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [isModalActive, setModalActive] = useState(false);
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const lastCardIndexForPage = currentPage * CARDS_PER_PAGE;
  const firstCardIndexForPage = lastCardIndexForPage - CARDS_PER_PAGE;
  const currentCardsForPage = cards.slice(firstCardIndexForPage, lastCardIndexForPage);

  const chagePage = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const setActiveCardWithModal = (id: number) => {

    const currentActiveCard = cards.find((card) => card.id === id);

    if (currentActiveCard) {
      setModalActive(true);
      setActiveCard(currentActiveCard);
    }
  };

  useEffect(() => {
    if (currentPage !== 1) {
      setSearchParams({ page: currentPage.toString() });
    }
  }, [currentPage, setSearchParams]);

  return (
    <>
      <div className="cards catalog__cards">
        {currentCardsForPage.map((card) => <CardComponent catalogCard={card} key={card.id} onClick={setActiveCardWithModal} />)}
      </div>
      {cards.length > CARDS_PER_PAGE &&
        <PaginationComponent totalCardsCount={cards.length} currentPage={currentPage} onClick={chagePage} />}
      <PopupCardContainerComponent
        isActive={isModalActive}
        onClick={() => {
          setModalActive(false);
        }}
        card={activeCard}
      />
    </>
  );
}
