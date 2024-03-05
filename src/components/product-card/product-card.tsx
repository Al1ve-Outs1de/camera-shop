import { useEffect, useState } from 'react';
import type { Card } from '../../types/catalog-card.type';
import RatingComponent from '../rating/rating';
import ProductImageComponent from '../product-image/product-image';
import classNames from 'classnames';
import { CardActiveTab } from '../../consts';
import { useSearchParams } from 'react-router-dom';
import { useModal } from '../../hooks/use-modal';
import ProductCardContainer from '../product-card-container/product-card-container';
import { useAppDispatch } from '../../hooks';
import { addProductToBasket } from '../../store/slices/basket/basket-slice';

type ProductCardProps = {
  card: Card;
}

export default function ProductCardComponent({ card }: ProductCardProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('');
  const [isModalActive, toggleActive] = useModal();
  const [isAdded, setAddedStatus] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const currentQuery = searchParams.get('activeTab');
    if (currentQuery && Object.values(CardActiveTab).includes(currentQuery)) {
      setActiveTab(currentQuery);
    } else {
      setActiveTab(CardActiveTab.Description);
    }
  }, [searchParams]);

  function handleTabChange(currentTab: string) {
    setActiveTab(currentTab);
    setSearchParams({ activeTab: currentTab });
  }

  return (
    <section className="product">
      <div className="container">
        <div className="product__img">
          <ProductImageComponent cardImage={card} />
        </div>
        <div className="product__content">
          <h1 className="title title--h3">{card.name}</h1>
          <div className="rate product__rate">
            <RatingComponent rating={card.rating} />
            <p className="visually-hidden">Рейтинг: {card.rating}</p>
            <p className="rate__count">
              <span className="visually-hidden">Всего оценок:</span>{card.reviewCount}
            </p>
          </div>
          <p className="product__price">
            <span className="visually-hidden">Цена:</span>{card.price.toLocaleString()} ₽
          </p>
          <button className="btn btn--purple" type="button" onClick={() => {
            if (!isAdded) {
              toggleActive();
            }
          }}
          >
            <svg width={24} height={16} aria-hidden="true">
              <use xlinkHref="#icon-add-basket" />
            </svg>
            Добавить в корзину
          </button>
          <div className="tabs product__tabs">
            <div className="tabs__controls product__tabs-controls">
              <button className={classNames('tabs__control', { 'is-active': activeTab === CardActiveTab.Characteristics })} type="button" onClick={() => handleTabChange(CardActiveTab.Characteristics)}>
                Характеристики
              </button>
              <button className={classNames('tabs__control', { 'is-active': activeTab === CardActiveTab.Description })} type="button" onClick={() => handleTabChange(CardActiveTab.Description)}>
                Описание
              </button>
            </div>
            <div className="tabs__content">
              <div className={classNames('tabs__element', { 'is-active': activeTab === CardActiveTab.Characteristics })}>
                <ul className="product__tabs-list" data-testid='tabs-list'>
                  <li className="item-list">
                    <span className="item-list__title">Артикул:</span>
                    <p className="item-list__text"> {card.vendorCode}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Категория:</span>
                    <p className="item-list__text">{card.category}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Тип камеры:</span>
                    <p className="item-list__text">{card.type}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Уровень:</span>
                    <p className="item-list__text">{card.level}</p>
                  </li>
                </ul>
              </div>
              <div className={classNames('tabs__element', { 'is-active': activeTab === CardActiveTab.Description })}>
                <div className="product__tabs-text" data-testid='tabs-text'>
                  {card.description.split('. ').map((sentence) => (<p key={sentence}>{sentence}</p>))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductCardContainer
        card={card}
        isActive={isModalActive}
        isAdded={isAdded}
        onCloseButtonClick={() => {
          toggleActive();
          if (isAdded) {
            setTimeout(() => {
              setAddedStatus(!isAdded);
            }, 600);
          }
        }}
        onAddButtonClick={() => {
          dispatch(addProductToBasket(card));
          setAddedStatus(!isAdded);
        }}
      />
    </section>
  );
}
