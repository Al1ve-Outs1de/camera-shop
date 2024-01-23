import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AsideFilterComponent from '../components/aside-filter-form';
import BannerSliderComponent from '../components/banner-slider';
import CatalogListComponent from '../components/catalog-list';
import PaginationComponent from '../components/pagination';
import SortingComponent from '../components/sorting';
import PopupContainerComponent from '../components/popup-container';
import CardComponent from '../components/card';
import PopupCardComponent from '../components/popup-card';
import axios from 'axios';
import { CARDS_PER_PAGE } from '../consts';
import type { Promo } from '../types/promo.type';
import type { Card } from '../types/catalog-card.type';

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cards, setCards] = useState<Card[]>([]);
  const [promos, setPromos] = useState<Promo[]>([]);
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [isModalActive, setModalActive] = useState(false);
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  useEffect(() => {
    Promise.all([
      axios.get<Card[]>('https://camera-shop.accelerator.pages.academy/cameras'),
      axios.get<Promo[]>('https://camera-shop.accelerator.pages.academy/promo')
    ]).then(([{ data: catalogCards }, { data: promoCards }]) => {
      setCards(catalogCards);
      setPromos(promoCards);
    });
  }, []);

  useEffect(() => {
    if (currentPage !== 1) {
      setSearchParams({ page: currentPage.toString() });
    }
  }, [currentPage, setSearchParams]);

  const lastCardIndexForPage = currentPage * CARDS_PER_PAGE;
  const firstCardIndexForPage = lastCardIndexForPage - CARDS_PER_PAGE;
  const currentCardsForPage = cards.slice(firstCardIndexForPage, lastCardIndexForPage);

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const setActiveCardWithModal = (id: number) => {
    const currentActiveCard = cards.find((card) => card.id === id);

    if (currentActiveCard) {
      setModalActive(true);
      setActiveCard(currentActiveCard);
    }
  };

  return (
    <main>
      {promos.length && <BannerSliderComponent promos={promos} />}
      <div className="page-content">
        <div className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link" href="index.html">
                  Главная
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </a>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">
                  Каталог
                </span>
              </li>
            </ul>
          </div>
        </div>
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <div className="catalog__aside">
                <AsideFilterComponent />
              </div>
              <div className="catalog__content">
                <SortingComponent />
                <div className="cards catalog__cards">
                  {currentCardsForPage.map(
                    (card) => <CardComponent catalogCard={card} onClick={setActiveCardWithModal} key={card.id} />)}
                </div>
                {cards.length > CARDS_PER_PAGE &&
                  <PaginationComponent totalCardsCount={cards.length} currentPage={currentPage} onClick={changePage} />}
              </div>
            </div>
          </div>
        </section>
      </div>
      <PopupContainerComponent isActive={isModalActive} onClick={() => setModalActive(false)}>
        {activeCard && <PopupCardComponent card={activeCard} />}
      </PopupContainerComponent>
    </main>
  );
}
