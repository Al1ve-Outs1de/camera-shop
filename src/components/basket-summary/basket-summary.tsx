import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setDiscount } from '../../redux/slices/basket/basket-slice';
import classNames from 'classnames';
import { useCreateNewOrderMutation, useGetCouponPromoMutation } from '../../redux/camerasApi';
import type { NewOrder } from '../../types/new-order.type';
import ModalLayoutComponent from '../modal-layout/modal-layout';
import AddOrderSuccess from '../add-order-success/add-order-success';
import { useModal } from '../../hooks/useModal';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { toast } from 'react-toastify';

export default function BasketSummaryComponent() {
  const dispatch = useAppDispatch();
  const basketProducts = useAppSelector((state) => state.basket.basketProducts);
  const discout = useAppSelector((state) => state.basket.discount);
  const promo = useAppSelector((state) => state.basket.promo);
  const [getCoupon] = useGetCouponPromoMutation();
  const [createNewOrder, { isLoading }] = useCreateNewOrderMutation();
  const [isModalAcitve, toggleActive] = useModal();

  const { handleSubmit, register, formState: { isSubmitting } } = useForm<{ promo: string }>();

  const onSubmit: SubmitHandler<{ promo: string }> = async (data) => {
    await getCoupon(data.promo)
      .unwrap()
      .then((couponDiscount) => {
        dispatch(setDiscount({
          discount: couponDiscount,
          promo: data.promo
        }));
      })
      .catch((err: FetchBaseQueryError) => {
        dispatch(setDiscount({
          discount: 0,
          promo: data.promo
        }));
        if (typeof err.status === 'string') {
          toast.error(err.status);
        }
      });
  };

  function submitNewOrder() {
    const productsIds: number[] = [];
    basketProducts.forEach((product) => productsIds.push(product.card.id));

    const newOrder: NewOrder = {
      camerasIds: productsIds,
      coupon: promo || null
    };
    createNewOrder(newOrder).then(() => toggleActive());
  }

  const totalPrice = basketProducts.reduce((total, product) => total + (product.card.price * product.count), 0);
  const discountValue = Math.round(totalPrice * discout / 100);

  return (
    <>
      <div className="basket__summary">
        <div className="basket__promo">
          <p className="title title--h4">
            Если у вас есть промокод на скидку, примените его в этом поле
          </p>
          <div className="basket-form">
            <form action="#" onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
              <div className={classNames('custom-input', { 'is-valid': discout && promo }, { 'is-invalid': !discout && promo })}>
                <label>
                  <span className="custom-input__label">Промокод</span>
                  <input
                    type="text"
                    placeholder="Введите промокод"
                    defaultValue={promo}
                    {...register('promo', {
                      required: true
                    })}
                  />
                </label>
                {(!discout && promo) && <p className="custom-input__error">Промокод неверный</p>}
                {!!discout && <p className="custom-input__success">Промокод принят!</p>}
              </div>
              <button className="btn" type="submit" disabled={isSubmitting}>
                Применить
              </button>
            </form>
          </div>
        </div>
        <div className="basket__summary-order">
          <p className="basket__summary-item">
            <span className="basket__summary-text">Всего:</span>
            <span className="basket__summary-value">{totalPrice} ₽</span>
          </p>
          <p className="basket__summary-item">
            <span className="basket__summary-text">Скидка:</span>
            <span className="basket__summary-value basket__summary-value--bonus">
              {discountValue} ₽
            </span>
          </p>
          <p className="basket__summary-item">
            <span className="basket__summary-text basket__summary-text--total">
              К оплате:
            </span>
            <span className="basket__summary-value basket__summary-value--total">
              {totalPrice - discountValue} ₽
            </span>
          </p>
          <button className="btn btn--purple" type="submit" onClick={submitNewOrder} disabled={isLoading}>
            Оформить заказ
          </button>
        </div>
      </div>
      <ModalLayoutComponent isActive={isModalAcitve} onClick={toggleActive}>
        <AddOrderSuccess />
      </ModalLayoutComponent>
    </>
  );
}
