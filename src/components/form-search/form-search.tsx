import { useState } from 'react';
import classNames from 'classnames';
import { camerasApi } from '../../store/camerasApi';
import { useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';

export default function SearchInputComponent() {
  const [searchValue, setSearchValue] = useState('');

  const { data: products = [] } = useAppSelector(camerasApi.endpoints.getProducts.select());

  const searchRegExp = new RegExp(searchValue, 'i');
  const searchedProducts = products.filter((product) => searchRegExp.test(product.name));

  return (
    <div className={classNames('form-search', { 'list-opened': searchValue })}>
      <form onSubmit={(evt) => evt.preventDefault()}>
        <label>
          <svg
            className="form-search__icon"
            width={16}
            height={16}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-lens" />
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={searchValue}
            onChange={(evt) => setSearchValue(evt.target.value)}
          />
        </label>
        {(searchValue.length >= 3 && !!searchedProducts.length) &&
          <ul className="form-search__select-list scroller" data-testid='search-list'>
            {searchedProducts.map((product) => (
              <li className="form-search__select-item" tabIndex={-1} key={product.id}>
                <Link style={{ color: 'inherit' }} to={`${AppRoute.Product}/${product.id}`} onClick={() => setSearchValue('')}>{product.name}</Link>
              </li>
            ))}
          </ul>}
      </form>
      <button className="form-search__reset" type="reset" onClick={() => setSearchValue('')}>
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}
