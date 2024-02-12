
import { ChangeEvent } from 'react';
import { SortingActiveOrder, SortingActiveType } from '../../consts';

type SortingProps = {
  sortingType: string;
  sortingOrder: string;
  onSortingChange: (type: string) => void;
}

export default function SortingComponent({ sortingOrder, sortingType, onSortingChange }: SortingProps) {

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
          <div className="catalog-sort__type" onChange={handleSortingChange}>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                checked={correctType === 'sortPrice'}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPopular" name="sort" checked={correctType === 'sortPopular'} />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order" onChange={handleSortingChange}>
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                checked={correctOrder === 'up'}
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
