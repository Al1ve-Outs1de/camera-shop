import { ChangeEvent, memo, useEffect, useRef } from 'react';
import { CyrillicCategory, CyrillicLevel, CyrillicType } from '../../consts';
import { useSearchParams } from 'react-router-dom';

type AsideFilterProps = {
  onPriceChange: (priceName: string, priceValue: string) => void;
  onCategoryChange: (categoryCheckBox: HTMLInputElement) => void;
  onTypeChange: (name: string) => void;
  onLevelChange: (name: string) => void;
  onResetClick: () => void;
  minPrice: number;
  maxPrice: number;
}

const asideFilterComponent = memo(
  ({ onPriceChange, onCategoryChange, onLevelChange, onTypeChange, onResetClick, minPrice, maxPrice }: AsideFilterProps) => {

    const minPriceRef = useRef<HTMLInputElement>(null);
    const maxPriceRef = useRef<HTMLInputElement>(null);

    const [searchParams] = useSearchParams();

    const { filterType = '', filterLevel = '', filterCategory = '', price = '', priceUp = '' } = Object.fromEntries([...searchParams]);

    function handleCategoryChange(evt: ChangeEvent<HTMLInputElement>) {
      onCategoryChange(evt.target);
    }

    function handleTypeChange(evt: ChangeEvent<HTMLInputElement>) {
      onTypeChange(evt.target.name);
    }

    function handleLevelChange(evt: ChangeEvent<HTMLInputElement>) {
      onLevelChange(evt.target.name);
    }

    useEffect(() => {
      const minPriceInput = minPriceRef.current;
      const maxPriceInput = maxPriceRef.current;

      function handlePriceChange(this: HTMLInputElement) {
        if (!this.value) {
          onPriceChange(this.name, this.value);
          return;
        }

        if (+this.value < +minPrice || +this.value > +maxPrice) {
          if (this.name === 'price' && price) {
            this.value = price;
            return;
          }

          if (this.name === 'priceUp' && priceUp) {
            this.value = priceUp;
            return;
          }
        }

        const inputPrice = Number(this.value);
        let correctPrice = '';

        if (this.name === 'price') {
          correctPrice = (Math.min(Math.max(Math.min(inputPrice, maxPrice), minPrice), maxPrice)).toString();
        } else {
          correctPrice = (Math.max(Math.max(Math.min(inputPrice, maxPrice), +price || minPrice), minPrice)).toString();
        }

        if (priceUp && +correctPrice > +priceUp) {
          onPriceChange('priceUp', correctPrice);
        }

        onPriceChange(this.name, correctPrice);
      }

      minPriceInput?.addEventListener('change', handlePriceChange);
      maxPriceInput?.addEventListener('change', handlePriceChange);

      return () => {
        minPriceInput?.removeEventListener('change', handlePriceChange);
        maxPriceInput?.removeEventListener('change', handlePriceChange);
      };
    }, [maxPrice, minPrice, onPriceChange, price, priceUp]);

    useEffect(() => {
      if (minPriceRef.current) {
        minPriceRef.current.value = price;
      }
    }, [price]);

    useEffect(() => {
      if (maxPriceRef.current) {
        maxPriceRef.current.value = priceUp;
      }
    }, [priceUp]);

    return (
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="price"
                    placeholder={minPrice.toString()}
                    ref={minPriceRef}
                  />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="priceUp"
                    placeholder={maxPrice.toString()}
                    ref={maxPriceRef}
                  />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="photocamera"
                  checked={filterCategory === CyrillicCategory.photocamera}
                  onChange={handleCategoryChange}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Фотокамера
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="videocamera"
                  onChange={handleCategoryChange}
                  checked={filterCategory === CyrillicCategory.videocamera}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Видеокамера
                </span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="digital"
                  data-testId='digital'
                  onChange={handleTypeChange}
                  checked={filterType.includes(CyrillicType.digital)}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="film"
                  disabled={filterCategory === CyrillicCategory.videocamera}
                  onChange={handleTypeChange}
                  checked={filterType.includes(CyrillicType.film)}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Плёночная
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="snapshot"
                  disabled={filterCategory === CyrillicCategory.videocamera}
                  onChange={handleTypeChange}
                  checked={filterType.includes(CyrillicType.snapshot)}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Моментальная
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="collection"
                  onChange={handleTypeChange}
                  checked={filterType.includes(CyrillicType.collection)}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Коллекционная
                </span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="zero"
                  onChange={handleLevelChange}
                  checked={filterLevel.includes(CyrillicLevel.zero)}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="non-professional"
                  onChange={handleLevelChange}
                  checked={filterLevel.includes(CyrillicLevel['non-professional'])}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Любительский
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="professional"
                  onChange={handleLevelChange}
                  checked={filterLevel.includes(CyrillicLevel.professional)}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Профессиональный
                </span>
              </label>
            </div>
          </fieldset>
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={onResetClick}
          >
            Сбросить фильтры
          </button>
        </form>
      </div>);
  }

);

asideFilterComponent.displayName = 'AsideFilter';

export default asideFilterComponent;
