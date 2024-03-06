import { makeFakeBasketProduct, makeFakeCard } from '../../../utils/mocks';
import {
  basketSlice,
  addProductToBasket,
  incrementProductCount,
  basketInitialState,
  decrementProductCount,
  removeProductFromBasket,
  setProductCount,
  setDiscount,
} from './basket-slice';

describe('BasketSlice testing', () => {
  const initialState = basketSlice.getInitialState();
  const mockCard = makeFakeCard();

  it('return initial state when action is empty', () => {
    const emptyAcion = { type: '' };
    const expectedState = initialState;

    const result = basketSlice.reducer(expectedState, emptyAcion);

    expect(result).toEqual(expectedState);
  });

  it('return initial state when reducer get undefiened state', () => {
    const emptyAcion = { type: '' };
    const expectedState = initialState;

    const result = basketSlice.reducer(undefined, emptyAcion);

    expect(result).toEqual(expectedState);
  });

  it('correctly adding product to basket', () => {
    const expectedState = initialState;

    const result = basketSlice.reducer(
      expectedState,
      addProductToBasket(mockCard)
    );

    expect(result.basketProducts[0].card).toEqual(mockCard);
    expect(result.basketProducts[0].count).toBe(1);
  });

  it('correctly increment product count', () => {
    const mockProduct = makeFakeCard();
    const expectedState: basketInitialState = {
      basketProducts: [{ card: mockProduct, count: 1 }],
      discount: 0,
      promo: '',
    };

    const result = basketSlice.reducer(
      expectedState,
      incrementProductCount(mockProduct.id)
    );

    expect(result.basketProducts[0].count).toBe(2);
  });

  it('correctly decrement product count', () => {
    const mockProduct = makeFakeCard();
    const expectedState: basketInitialState = {
      basketProducts: [{ card: mockProduct, count: 2 }],
      discount: 0,
      promo: '',
    };

    const result = basketSlice.reducer(
      expectedState,
      decrementProductCount(mockProduct.id)
    );

    expect(result.basketProducts[0].count).toBe(1);
  });

  it('correctly remove product from basket', () => {
    const mockProducts = Array.from({ length: 3 }, () =>
      makeFakeBasketProduct()
    );
    const removingProduct = mockProducts[1];

    const expectedState: basketInitialState = {
      basketProducts: mockProducts,
      discount: 0,
      promo: '',
    };

    const result = basketSlice.reducer(
      expectedState,
      removeProductFromBasket(removingProduct.card.id)
    );

    expect(result.basketProducts.length).toBe(2);
  });

  it('correctly set product count', () => {
    const mockProduct = makeFakeBasketProduct();

    const expectedCount = 10;
    const expectedState: basketInitialState = {
      basketProducts: [mockProduct],
      discount: 0,
      promo: '',
    };

    const result = basketSlice.reducer(
      expectedState,
      setProductCount({ productId: mockProduct.card.id, count: expectedCount })
    );

    expect(result.basketProducts[0].count).toBe(expectedCount);
  });

  it('correctly set discount', () => {
    const expectedDiscount = 10;
    const expectedPromo = 'camera-333';

    const expectedState: basketInitialState = {
      basketProducts: [],
      discount: 0,
      promo: '',
    };

    const result = basketSlice.reducer(
      expectedState,
      setDiscount({ discount: expectedDiscount, promo: expectedPromo })
    );

    expect(result.discount).toBe(expectedDiscount);
    expect(result.promo).toBe(expectedPromo);
  });
});
