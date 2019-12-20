import React from 'react';
import { Provider } from 'react-redux';
import Head from 'next/head';
import PropTypes from 'prop-types';

import withReduxStore from '../lib/with-redux-store';
import Wrapper from '../components/layout';
import { Store } from 'redux';

const MyApp = ({
  Component,
  pageProps,
  store
}: {
  Component: PropTypes.Validator<PropTypes.ReactComponentLike>;
  pageProps: any;
  store: Store;
}) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = window.document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  });
  return (
    <>
      <Head>
        <title>Factly</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Provider store={store}>
        <Wrapper Component={Component} pageProps={pageProps} />
      </Provider>
    </>
  );
};

MyApp.getInitialProps = async (context: any) => {
  const { Component, ctx } = context;
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps
  };
};

MyApp.defaultProps = {
  pageProps: null
};

export default withReduxStore(MyApp);
