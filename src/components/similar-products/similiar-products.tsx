import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './similar-products.css';
import type { Card } from '../../types/catalog-card.type';
import { memo, useState } from 'react';
import CardComponent from '../card/card';
import PopupCardContainerComponent from '../popup-card-container/popup-card-container';

type SimiliarProductsProps = {
  similarProducts: Card[];
}

const similarProductsComponent = memo(({ similarProducts }: SimiliarProductsProps) => {
  const [isModalActive, setActiveStatus] = useState(false);
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const setActiveCardWithModal = (id: number) => {
    const currentActiveCard = similarProducts.find((card) => card.id === id);

    if (currentActiveCard) {
      setActiveStatus(true);
      setActiveCard(currentActiveCard);
    }
  };

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">

            <Swiper
              modules={[Navigation]}
              className='product-similar__slider-list'
              slidesPerView={3}
              slidesPerGroup={3}
              allowTouchMove={false}
              spaceBetween={32}
              navigation={{
                nextEl: '.slider-controls--next',
                prevEl: '.slider-controls--prev',
              }}
            >
              {similarProducts.map((similarProduct) => (
                <SwiperSlide key={similarProduct.id}>
                  <CardComponent catalogCard={similarProduct} onClick={setActiveCardWithModal} />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>

            <button
              className="slider-controls slider-controls--next"
              type='button'
              aria-label="Следующий слайд"
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>

            <PopupCardContainerComponent
              isActive={isModalActive}
              onClick={() => setActiveStatus(false)}
              card={activeCard}
            />
          </div>
        </div>
      </section>
    </div >
  );
});

similarProductsComponent.displayName = 'SimilarProducts';

export default similarProductsComponent;
