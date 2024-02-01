import type { State } from '../types/state.type';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Action } from 'redux';

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
}

export function withRouter(component: JSX.Element) {
  const history = createMemoryHistory();

  return (
    <Router navigator={history} location={history.location}>
      {component}
    </Router>
  );
}

export function withStore(
  component: JSX.Element,
  initialState: Partial<State> = {
    basket: {
      basketProducts: [],
      discount: 0,
      promo: ''
    }
  }
): ComponentWithMockStore {
  const mockStoreCreator = configureMockStore<State, Action<string>>();
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore
  });
}
