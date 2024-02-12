import SortingComponent from './sorting/sorting';
import CatalogListComponent from './catalog-list/catalog-list';
import AsideFilterComponent from './aside-filter-form/aside-filter-form';
import PaginationComponent from './pagination/pagination';
import { useSearchParams } from 'react-router-dom';
import { CARDS_PER_PAGE, SortingActiveType } from '../consts';
import { useGetProductsQuery } from '../redux/camerasApi';
import { sortingCards } from '../utils/utils';
import { Card } from '../types/catalog-card.type';

export default function CatalogContentComponent() {
  const [searchParams, setSearchParams] = useSearchParams({ page: '1', sortingType: '', sortingOrder: '' });
  const { data: cards = [] } = useGetProductsQuery();

  const currentPage = searchParams.get('page');
  const sortingType = searchParams.get('sortingType') || '';
  const sortingOrder = searchParams.get('sortingOrder') || '';

  const chagePage = (pageNumber: number) => {
    setSearchParams((prevParams) => {
      prevParams.set('page', pageNumber.toString());
      return prevParams;
    }, {
      replace: true
    });
  };

  const changeSorting = (type: string) => {
    const searchParam = Object.values(SortingActiveType).includes(type) ? 'sortingType' : 'sortingOrder';

    setSearchParams((prevParams) => {
      prevParams.set(searchParam, type);
      return prevParams;
    }, {
      replace: true
    });
  };

  let sortedCards: Card[] = [];

  try {
    sortedCards = sortingCards[sortingType](cards);
  } catch {
    sortedCards = [...cards];
  }

  if (sortingOrder === 'down') {
    sortedCards.reverse();
  }

  return (
    <div className="page-content__columns">
      <div className="catalog__aside">
        <AsideFilterComponent />
      </div>
      <div className="catalog__content">
        <SortingComponent sortingType={sortingType} sortingOrder={sortingOrder} onSortingChange={changeSorting} />
        <CatalogListComponent cards={sortedCards} currentPage={Number(currentPage)} />
        {sortedCards.length > CARDS_PER_PAGE &&
          <PaginationComponent totalCardsCount={cards.length} currentPage={Number(currentPage)} onClick={chagePage} />}
      </div>
    </div>
  );
}
