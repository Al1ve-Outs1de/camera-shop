import { useEffect, useState } from 'react';
import AsideFilterComponent from '../components/aside-filter-form';
import BannerSliderComponent from '../components/banner-slider';
import CatalogListComponent from '../components/catalog-list';
import PaginationComponent from '../components/pagination';
import SortingComponent from '../components/sorting';
import axios from 'axios';
import { CARDS_PER_PAGE } from '../consts';
import type { CatalogCard } from '../types/catalog-card-type';
import { useSearchParams } from 'react-router-dom';

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cards, setCards] = useState<CatalogCard[]>([]);
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);

  useEffect(() => {
    const getCameras = async () => {
      const { data } = await axios.get<CatalogCard[]>('https://camera-shop.accelerator.pages.academy/cameras');
      setCards(data);
    };
    getCameras();
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

  return (
    <main>
      <BannerSliderComponent />
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
                <CatalogListComponent cards={currentCardsForPage} />
                {cards.length > CARDS_PER_PAGE &&
                  <PaginationComponent totalCardsCount={cards.length} currentPage={currentPage} onClick={changePage} />}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
