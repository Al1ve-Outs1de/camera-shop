import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeAllProductsFromBasket, setDiscount } from '../../store/slices/basket/basket-slice';
import classNames from 'classnames';
import { useCreateNewOrderMutation, useGetCouponPromoMutation } from '../../store/camerasApi';
import type { NewOrder } from '../../types/new-order.type';
import ModalLayoutComponent from '../modal-layout/modal-layout';
import AddOrderSuccess from '../add-order-success/add-order-success';
import { useModal } from '../../hooks/use-modal';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { toast } from 'react-toastify';
import { getBasketDiscount, getBasketProducts, getPromo } from '../../store/slices/basket/selectors';
import { useEffect, useRef, useState } from 'react';

export default function BasketSummaryComponent() {
  const dispatch = useAppDispatch();
  const basketProducts = useAppSelector(getBasketProducts);
  const discount = useAppSelector(getBasketDiscount);
  const promo = useAppSelector(getPromo);
  const [getCoupon] = useGetCouponPromoMutation();
  const [createNewOrder, { isLoading }] = useCreateNewOrderMutation();
  const [isModalAcitve, toggleActive] = useModal();
  const [isError, setError] = useState(false);
  const promoInputRef = useRef<HTMLInputElement | null>(null);

  const { handleSubmit, register, formState: { isSubmitting, isValid } } = useForm<{ promo: string }>();

  const { ref: promoRef, ...rest } = register('promo', { required: true, pattern: /^[^\s]*$/ });

  useEffect(() => {
    promoInputRef.current?.addEventListener('keypress', (evt) => {
      if (evt.key === ' ') {
        evt.preventDefault();
      }
    });

    promoInputRef.current?.addEventListener('input', (evt) => {
      const inpVal = (evt.target as HTMLInputElement).value;
      if (promoInputRef.current && inpVal.includes(' ')) {
        promoInputRef.current.value = inpVal.replace(/ /g, '');
      }
    });
  }, []);

  useEffect(() => () => {
    if (!discount && promo) {
      dispatch(setDiscount({
        discount: 0,
        promo: ''
      }));
    }
  }, [discount, promo, dispatch]);

  const onSubmit: SubmitHandler<{ promo: string }> = async (data) => {
    await getCoupon(data.promo)
      .unwrap()
      .then((couponDiscount) => {
        dispatch(setDiscount({
          discount: couponDiscount,
          promo: data.promo
        }));
        localStorage.setItem('basketDiscount', `${data.promo}_${couponDiscount}`);
      })
      .catch((err: FetchBaseQueryError) => {
        dispatch(setDiscount({
          discount: 0,
          promo: data.promo
        }));
        setError(!isError);
        localStorage.removeItem('basketDiscount');
        if (typeof err.status === 'string') {
          toast.error(err.status);
        }
      })
      .finally(() => {
        toggleActive();
      });
  };

  function submitNewOrder() {
    const productsIds: number[] = [];
    basketProducts.forEach((product) => productsIds.push(product.card.id));

    const newOrder: NewOrder = {
      camerasIds: productsIds,
      coupon: promo || null
    };
    createNewOrder(newOrder)
      .unwrap()
      .then(() => {
        dispatch(removeAllProductsFromBasket());
      })
      .catch(() => {
        setError(!isError);
      })
      .finally(() => {
        toggleActive();
      });
  }

  const totalPrice = basketProducts.reduce((total, product) => total + (product.card.price * product.count), 0);
  const discountValue = Math.round(totalPrice * discount / 100);

  return (
    <>
      <div className="basket__summary">
        <div className="basket__promo">
          <p className="title title--h4">
            Если у вас есть промокод на скидку, примените его в этом поле
          </p>
          <div className="basket-form">
            <form action="#" onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
              <div className={classNames('custom-input', { 'is-valid': discount && promo }, { 'is-invalid': !discount && promo })}>
                <label>
                  <span className="custom-input__label">Промокод</span>
                  <input
                    type="text"
                    placeholder="Введите промокод"
                    defaultValue={promo}
                    ref={(ref) => {
                      promoRef(ref);
                      promoInputRef.current = ref;
                    }}
                    {...rest}
                  />
                </label>
                {(!discount && promo) && <p className="custom-input__error">Промокод неверный</p>}
                {!!discount && <p className="custom-input__success">Промокод принят!</p>}
              </div>
              <button className="btn" type="submit" disabled={isSubmitting || !isValid}>
                Применить
              </button>
            </form>
          </div>
        </div>
        <div className="basket__summary-order">
          <p className="basket__summary-item">
            <span className="basket__summary-text">Всего:</span>
            <span className="basket__summary-value">{totalPrice.toLocaleString()} ₽</span>
          </p>
          <p className="basket__summary-item">
            <span className="basket__summary-text">Скидка:</span>
            <span className={classNames('basket__summary-value', { 'basket__summary-value--bonus': discount })}>
              {discountValue.toLocaleString()} ₽
            </span>
          </p>
          <p className="basket__summary-item">
            <span className="basket__summary-text basket__summary-text--total">
              К оплате:
            </span>
            <span className="basket__summary-value basket__summary-value--total">
              {(totalPrice - discountValue).toLocaleString()} ₽
            </span>
          </p>
          <button className="btn btn--purple" type="submit" onClick={submitNewOrder} disabled={isLoading || !basketProducts.length}>
            Оформить заказ
          </button>
        </div>
      </div>
      <ModalLayoutComponent isActive={isModalAcitve} onClick={() => {
        toggleActive();
        setTimeout(() => {
          setError(!isError);
        }, 600);
      }}
      >
        {!isError ?
          <AddOrderSuccess />
          : <h2 style={{ textAlign: 'center', lineHeight: '1.4' }}>Произошла ошибка,<br />попробуйте снова</h2>}
      </ModalLayoutComponent>
    </>
  );
}
