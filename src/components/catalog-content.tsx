import SortingComponent from './sorting/sorting';
import CatalogListComponent from './catalog-list/catalog-list';
import AsideFilterComponent from './aside-filter-form/aside-filter-form';
import PaginationComponent from './pagination/pagination';
import { useSearchParams } from 'react-router-dom';
import { CARDS_PER_PAGE, CyrillicCategory, CyrillicLevel, CyrillicType, SortingActiveType } from '../consts';
import { useGetProductsQuery } from '../redux/camerasApi';
import { filterCatalog, sortingCards, toggleArrayElement } from '../utils/utils';
import { Card } from '../types/catalog-card.type';
import { useCallback, useEffect, useMemo } from 'react';

export default function CatalogContentComponent() {
  const [searchParams, setSearchParams] = useSearchParams(
    {
      page: '1',
      sortingType: '',
      sortingOrder: '',
      filterCategory: '',
      filterType: '',
      filterLevel: '',
    });

  const { data: cards = [] } = useGetProductsQuery();

  const { page: currentPage, sortingType, sortingOrder, filterType, filterLevel, filterCategory, price, priceUp } = Object.fromEntries([...searchParams]);

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
    setSearchParams((prevParams) => {
      prevParams.set(priceName, priceValue);
      return prevParams;
    }, { replace: true });
  }, [setSearchParams]);

  const changeCategory = (inputCategoryCheckbox: HTMLInputElement) => {
    const inputCategoryName = inputCategoryCheckbox.name;

    const categoryName = inputCategoryCheckbox.checked ? CyrillicCategory[inputCategoryName] : '';

    let currentTypeFilters = filterType.split('-');

    if (categoryName === CyrillicCategory.videocamera) {
      currentTypeFilters = currentTypeFilters.filter((type) => type !== CyrillicType.snapshot && type !== CyrillicType.film);
    }

    setSearchParams((prevParams) => {
      prevParams.set('filterCategory', categoryName);
      prevParams.set('filterType', currentTypeFilters.join('-'));

      return prevParams;
    }, { replace: true });
  };

  const changeType = (typeName: string) => {
    const cyrillicTypeName = CyrillicType[typeName];
    const newTypeArr = toggleArrayElement(filterType ? filterType.split('-') : [], cyrillicTypeName).join('-');

    setSearchParams((prevParams) => {
      prevParams.set('filterType', newTypeArr);
      return prevParams;
    }, { replace: true });
  };

  const changeLevel = (levelName: string) => {
    const cyrillicLevelName = CyrillicLevel[levelName];
    const newLevelArr = toggleArrayElement(filterLevel ? filterLevel.split('-') : [], cyrillicLevelName).join('-');
    setSearchParams((prevParams) => {
      prevParams.set('filterLevel', newLevelArr);
      return prevParams;
    }, { replace: true });
  };

  const resetFilters = () => {
    setSearchParams((prevParams) => {
      prevParams.set('filterCategory', '');
      prevParams.set('filterType', '');
      prevParams.set('filterLevel', '');
      prevParams.set('price', '');
      prevParams.set('priceUp', '');

      return prevParams;
    }, { replace: true });
  };

  let finalCards: Card[] = useMemo(() => {
    const filterState = {
      category: filterCategory,
      type: filterType ? filterType.split('-') : [],
      level: filterLevel ? filterLevel.split('-') : []
    };

    return filterCatalog(cards, filterState);
  }, [cards, filterCategory, filterType, filterLevel]);

  try {
    finalCards = sortingCards[sortingType](finalCards);
  } catch {
    finalCards = [...cards];
  }

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
    if (price && +price < minPrice) {
      changePrice('price', minPrice.toString());
    }

    if (priceUp && +priceUp > maxPrice) {
      changePrice('priceUp', maxPrice.toString());
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
