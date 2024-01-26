import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { CARDS_PER_PAGE } from '../consts';
import { memo } from 'react';

type PaginationProps = {
  cardsPerPage?: number;
  totalCardsCount: number;
  onClick: (pageNumber: number) => void;
  currentPage: number;
}

function PaginationComponent({ cardsPerPage = CARDS_PER_PAGE, totalCardsCount, currentPage, onClick }: PaginationProps) {
  const pagination: number[] = [];

  const totalPages = Math.ceil(totalCardsCount / cardsPerPage);
  const paginationBlock = Math.ceil(currentPage / 3);
  const startPage = Math.max(1, (paginationBlock - 1) * 3 + 1);
  const endPage = Math.min(totalPages, startPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    pagination.push(i);
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">

        {currentPage > 3 &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to='#'
              onClick={() => onClick(startPage - 1)}
            >
              Назад
            </Link>
          </li>}

        {pagination.map((number) => (
          <li className='pagination__item' key={number}>
            <Link
              className={classNames('pagination__link', { 'pagination__link--active': number === currentPage })}
              to='#'
              onClick={() => onClick(number)}
            >
              {number}
            </Link>
          </li>
        ))}

        {endPage < totalPages &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to='#'
              onClick={() => onClick(endPage + 1)}
            >
              Далее
            </Link>
          </li>}
      </ul>
    </div>
  );
}

const memoPagination = memo(PaginationComponent);

export default memoPagination;
