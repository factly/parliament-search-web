import React from 'react';
import initializeStore from '../store';
import { Store, AnyAction } from 'redux';

interface Props {
  initialReduxState: object;
}

/*
const isServer = typeof window === 'undefined';
const NEXT_REDUX_STORE = '__NEXT_REDUX_STORE__';
*/
let reduxStore: Store;
const getOrCreateStore = (
  initialState?: Record<string, any>
): Store<any, AnyAction> => {
  // Always make a new store if server, otherwise state is shared between requests
  if (typeof window === 'undefined') {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!reduxStore) {
    reduxStore = initializeStore(initialState);
  }

  return reduxStore;
};
/*function getOrCreateStore(initialState? : any) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[NEXT_REDUX_STORE]) {
    window[NEXT_REDUX_STORE] = initializeStore(initialState);
  }
  return window[NEXT_REDUX_STORE];
}
*/

export default (App: any): React.ElementType =>
  class AppWithRedux extends React.Component<Props> {
    static async getInitialProps(
      appContext: any
    ): Promise<{
      initialReduxState: any;
    }> {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const store = getOrCreateStore();
      const appContextLocal = appContext;
      // Provide the store to getInitialProps of pages
      appContextLocal.ctx.store = store;

      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContextLocal);
      }

      return {
        ...appProps,
        initialReduxState: store.getState()
      };
    }
    store: Store;
    constructor(props: Props) {
      super(props);
      this.store = getOrCreateStore(props.initialReduxState);
    }

    render(): JSX.Element {
      return <App {...this.props} store={this.store} />;
    }
  };
