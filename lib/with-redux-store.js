import React from 'react';
import initializeStore from '../store';

const isServer = typeof window === 'undefined';
const NEXT_REDUX_STORE = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState) {
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

export default (App) => class AppWithRedux extends React.Component {
  static async getInitialProps(appContext) {
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
      initialReduxState: store.getState(),
    };
  }

  constructor(props) {
    super(props);
    this.store = getOrCreateStore(props.initialReduxState);
  }

  render() {
    return <App {...this.props} store={this.store} />;
  }
};
