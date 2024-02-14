import SortingComponent from './sorting/sorting';
import CatalogListComponent from './catalog-list/catalog-list';
import AsideFilterComponent from './aside-filter-form/aside-filter-form';
import PaginationComponent from './pagination/pagination';
import { useSearchParams } from 'react-router-dom';
import { CARDS_PER_PAGE, CyrillicCategory, CyrillicLevel, CyrillicType, SortingActiveType } from '../consts';
import { useGetProductsQuery } from '../redux/camerasApi';
import { filterCatalog, sortingCards, toggleArrayElement } from '../utils/utils';
import { Card } from '../types/catalog-card.type';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function CatalogContentComponent() {
  const [searchParams, setSearchParams] = useSearchParams(
    {
      page: '1',
      sortingType: '',
      sortingOrder: '',
      filterCategory: '',
      filterType: '',
      filterLevel: ''
    });
  const [filterState, setFilterState] = useState({ category: '', type: [] as string[], level: [] as string[] });
  const { data: cards = [] } = useGetProductsQuery();

  const {
    page: currentPage,
    sortingType, sortingOrder } = Object.fromEntries([...searchParams]);

  const changePage = useCallback((pageNumber: number) => {
    setSearchParams((prevParams) => {
      prevParams.set('page', pageNumber.toString());
      return prevParams;
    }, {
      replace: true
    });
  }, [setSearchParams]);

  const changeSorting = (type: string) => {
    const searchParam = Object.values(SortingActiveType).includes(type) ? 'sortingType' : 'sortingOrder';

    setSearchParams((prevParams) => {
      prevParams.set(searchParam, type);
      return prevParams;
    }, {
      replace: true
    });
  };

  function changeCategory(inputCategoryCheckbox: HTMLInputElement) {
    const inputCategoryName = inputCategoryCheckbox.name;

    const categoryName = inputCategoryCheckbox.checked ? CyrillicCategory[inputCategoryName] : '';

    let currentTypeFilters = filterState.type;

    if (categoryName === CyrillicCategory.videocamera) {
      currentTypeFilters = currentTypeFilters.filter((type) => type !== CyrillicType.snapshot && type !== CyrillicType.film);
    }

    setFilterState({ ...filterState, category: categoryName, type: currentTypeFilters });

    // setSearchParams((prevParams) => {
    //   prevParams.set('category', categoryName);
    //   prevParams.set('filterType', JSON.stringify(currentTypeFilters));

    //   return prevParams;
    // });
  }

  function changeType(typeName: string) {
    const cyrillicTypeName = CyrillicType[typeName];
    const newTypeArr = toggleArrayElement(filterState.type, cyrillicTypeName);

    setFilterState({ ...filterState, type: newTypeArr });
  }

  function changeLevel(levelName: string) {
    const cyrillicLevelName = CyrillicLevel[levelName];
    const newLevelArr = toggleArrayElement(filterState.level, cyrillicLevelName);
    setFilterState({ ...filterState, level: newLevelArr });
  }

  function resetFilters() {
    setFilterState({ category: '', level: [], type: [] });
  }

  let finalCards: Card[] = useMemo(() => filterCatalog(cards, filterState), [cards, filterState]);

  try {
    finalCards = sortingCards[sortingType](finalCards);
  } catch {
    finalCards = [...cards];
  }

  if (sortingOrder === 'down') {
    finalCards.reverse();
  }

  useEffect(() => {
    const newPage = searchParams.get('page');
    if (newPage !== '1' && finalCards.length <= CARDS_PER_PAGE) {
      changePage(1);
    }
  }, [changePage, searchParams, finalCards]);

  return (
    <div className="page-content__columns">
      <div className="catalog__aside">
        <AsideFilterComponent
          onCategoryChange={changeCategory}
          onTypeChange={changeType}
          onLevelChange={changeLevel}
          onResetClick={resetFilters}
          filterState={filterState}
        />
      </div>
      <div className="catalog__content">
        <SortingComponent sortingType={sortingType} sortingOrder={sortingOrder} onSortingChange={changeSorting} />
        <CatalogListComponent cards={finalCards} currentPage={Number(currentPage)} />
        {finalCards.length > CARDS_PER_PAGE &&
          <PaginationComponent totalCardsCount={finalCards.length} currentPage={Number(currentPage)} onClick={changePage} />}
      </div>
    </div>
  );
}
