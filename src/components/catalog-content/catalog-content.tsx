import SortingComponent from '../sorting/sorting';
import CatalogListComponent from '../catalog-list/catalog-list';
import AsideFilterComponent from '../aside-filter-form/aside-filter-form';
import PaginationComponent from '../pagination/pagination';
import { useSearchParams } from 'react-router-dom';
import { CARDS_PER_PAGE, CyrillicCategory, CyrillicLevel, CyrillicType, SortingActiveType } from '../../consts';
import { useGetProductsQuery } from '../../store/camerasApi';
import { filterCatalog, sortingCards, toggleArrayElement, toggleSearchParam } from '../../utils/utils';
import { useCallback, useEffect, useMemo } from 'react';

export default function CatalogContentComponent() {
  const [searchParams, setSearchParams] = useSearchParams(
    {
      page: '1',
    });

  const { data: cards = [] } = useGetProductsQuery();

  const { page: currentPage, sortingType, sortingOrder, filterLevel, filterCategory, price, priceUp } = Object.fromEntries([...searchParams]);
  const filterType = searchParams.get('filterType') || '';
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

  const changePrice = useCallback((priceName: string, priceValue: string) => {
    toggleSearchParam(!!priceValue, searchParams, priceName, priceValue);

    setSearchParams(searchParams, { replace: true });
  }, [setSearchParams, searchParams]);

  const changeCategory = (inputCategoryCheckbox: HTMLInputElement) => {
    const inputCategoryName = inputCategoryCheckbox.name;

    const categoryName = inputCategoryCheckbox.checked ? CyrillicCategory[inputCategoryName] : '';

    let currentTypeFilters = filterType ? filterType.split('-') : [];

    if (categoryName === CyrillicCategory.videocamera) {
      currentTypeFilters = currentTypeFilters.filter((type) => type !== CyrillicType.snapshot && type !== CyrillicType.film);
    }

    toggleSearchParam(inputCategoryCheckbox.checked, searchParams, 'filterCategory', categoryName);
    toggleSearchParam(!!currentTypeFilters.length, searchParams, 'filterType', currentTypeFilters.join('-'));

    setSearchParams(searchParams, { replace: true });
  };

  const changeType = (typeName: string) => {
    const cyrillicTypeName = CyrillicType[typeName];
    const newTypeArr = toggleArrayElement(filterType ? filterType.split('-') : [], cyrillicTypeName).join('-');

    toggleSearchParam(!!newTypeArr.length, searchParams, 'filterType', newTypeArr);
    setSearchParams(searchParams, { replace: true });
  };

  const changeLevel = (levelName: string) => {
    const cyrillicLevelName = CyrillicLevel[levelName];
    const newLevelArr = toggleArrayElement(filterLevel ? filterLevel.split('-') : [], cyrillicLevelName).join('-');

    toggleSearchParam(!!newLevelArr.length, searchParams, 'filterLevel', newLevelArr);
    setSearchParams(searchParams, { replace: true });
  };

  const resetFilters = () => {
    if (Object.values(Object.fromEntries([...searchParams])).length === 1) {
      return;
    }

    searchParams.delete('filterCategory');
    searchParams.delete('filterType');
    searchParams.delete('filterLevel');
    searchParams.delete('price');
    searchParams.delete('priceUp');

    setSearchParams(searchParams, { replace: true });
  };

  let finalCards = useMemo(() => {
    const filterState = {
      category: filterCategory,
      type: filterType ? filterType.split('-') : [],
      level: filterLevel ? filterLevel.split('-') : []
    };

    return filterCatalog(cards, filterState);
  }, [cards, filterCategory, filterType, filterLevel]);

  finalCards = sortingCards[sortingType]?.(finalCards) || finalCards;

  if (sortingOrder === 'down') {
    finalCards.reverse();
  }

  const [minPrice, maxPrice] = useMemo(() => {
    const prices = finalCards.map((card) => card.price);

    return [prices.length ? Math.min(...prices) : 0, prices.length ? Math.max(...prices) : 0];
  }, [finalCards]);

  if (price) {
    finalCards = finalCards.filter((card) => card.price >= +price);
  }

  if (priceUp) {
    finalCards = finalCards.filter((card) => card.price <= +priceUp);
  }

  useEffect(() => {
    const newPage = searchParams.get('page');
    if (newPage !== '1' && finalCards.length <= CARDS_PER_PAGE) {
      changePage(1);
    }
  }, [changePage, searchParams, finalCards]);

  useEffect(() => {
    if (price && +price < minPrice || +price > maxPrice) {
      changePrice('price', (Math.min(Math.max(Math.min(+price, maxPrice), minPrice), maxPrice)).toString());
    }

    if (priceUp && +priceUp < minPrice || +priceUp > maxPrice) {
      changePrice('priceUp', (Math.max(Math.max(Math.min(+priceUp, maxPrice), +price || minPrice), minPrice)).toString());
    }
  }, [minPrice, maxPrice, changePrice, priceUp, price]);

  return (
    <div className="page-content__columns">
      <div className="catalog__aside">
        <AsideFilterComponent
          onPriceChange={changePrice}
          onCategoryChange={changeCategory}
          onTypeChange={changeType}
          onLevelChange={changeLevel}
          onResetClick={resetFilters}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </div>
      <div className="catalog__content">
        <SortingComponent onSortingChange={changeSorting} />
        <CatalogListComponent cards={finalCards} currentPage={Number(currentPage)} />
        {finalCards.length > CARDS_PER_PAGE &&
          <PaginationComponent totalCardsCount={finalCards.length} currentPage={Number(currentPage)} onClick={changePage} />}
      </div>
    </div>
  );
}
