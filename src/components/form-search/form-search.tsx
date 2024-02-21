import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useGetProductsQuery } from '../../store/camerasApi';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';

export default function SearchInputComponent() {
  const [searchValue, setSearchValue] = useState('');
  const listItemsRef = useRef<HTMLAnchorElement[] | null[]>([]);
  const listRef = useRef<HTMLUListElement | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const { data: products = [] } = useGetProductsQuery();

  const searchRegExp = new RegExp(searchValue, 'i');
  const searchedProducts = products.filter((product) => searchRegExp.test(product.name));

  const handleArrowKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key !== 'Tab' && evt.key !== 'Enter') {
      evt.preventDefault();
    }
    const itemValue = (evt.target as HTMLAnchorElement)?.textContent;
    const foundIndex = listItemsRef.current.findIndex((item) => item?.textContent === itemValue);

    if (evt.key === 'ArrowDown' && foundIndex !== -1) {
      listItemsRef.current[foundIndex + 1]?.focus();
    }

    if (evt.key === 'ArrowUp' && foundIndex !== -1) {
      listItemsRef.current[foundIndex - 1]?.focus();
    }

    if (evt.key === 'ArrowUp' && foundIndex === 0) {
      searchRef.current?.focus();
    }

  }, []);

  const handleSearchKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'ArrowDown' && document.activeElement === searchRef.current) {
      evt.preventDefault();
      listItemsRef.current[0]?.focus();
    }
  }, []);

  useEffect(() => {
    const searchInput = searchRef.current;

    if (listRef.current) {
      listRef.current.addEventListener('keydown', handleArrowKeydown);
      searchRef.current?.addEventListener('keydown', handleSearchKeydown);
    }

    return () => {
      searchInput?.removeEventListener('keydown', handleSearchKeydown);
    };
  }, [handleArrowKeydown, searchValue, handleSearchKeydown]);

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
            ref={searchRef}
          />
        </label>
        {(searchValue.length >= 3 && !!searchedProducts.length) &&
          <ul className="form-search__select-list scroller" data-testid='search-list' ref={listRef}>
            {searchedProducts.map((product, index) => (
              <li className="form-search__select-item" tabIndex={-1} key={product.id}>
                <Link
                  style={{ color: 'inherit' }}
                  to={`${AppRoute.Product}/${product.id}`}
                  onClick={() => setSearchValue('')}
                  ref={(linkElement) => {
                    listItemsRef.current[index] = linkElement;
                  }}
                  tabIndex={0}
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>}
      </form>
      <button className="form-search__reset" type="reset" onClick={() => {
        setSearchValue('');
        searchRef.current?.focus();
      }}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}
