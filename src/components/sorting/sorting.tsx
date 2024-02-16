
import { ChangeEvent } from 'react';
import { SortingActiveOrder, SortingActiveType } from '../../consts';
import { useSearchParams } from 'react-router-dom';

type SortingProps = {
  onSortingChange: (type: string) => void;
}

export default function SortingComponent({ onSortingChange }: SortingProps) {
  const [searchParams] = useSearchParams();

  const { sortingType, sortingOrder } = Object.fromEntries([...searchParams]);

  const correctType = Object.values(SortingActiveType).find((type) => type === sortingType);
  const correctOrder = Object.values(SortingActiveOrder).find((order) => order === sortingOrder);

  if (sortingOrder && !sortingType) {
    onSortingChange(SortingActiveType.ByPrice);
  }

  if (!sortingOrder && sortingType) {
    onSortingChange(SortingActiveOrder.ToUp);
  }

  function handleSortingChange(evt: ChangeEvent<HTMLInputElement>) {
    onSortingChange(evt.target.id);
  }

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                checked={correctType === 'sortPrice'}
                onChange={handleSortingChange}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPopular" name="sort" checked={correctType === 'sortPopular'} onChange={handleSortingChange} />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                checked={correctOrder === 'up'}
                onChange={handleSortingChange}
              />
              <label htmlFor="up">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                checked={correctOrder === 'down'}
                onChange={handleSortingChange}
              />
              <label htmlFor="down">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
