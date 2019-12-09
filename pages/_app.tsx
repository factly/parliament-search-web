import React from 'react';
import { Provider } from 'react-redux';
import Head from 'next/head';
import PropTypes from 'prop-types';

import withReduxStore from '../lib/with-redux-store';
import Wrapper from '../components/layout';

interface iprops{
  Component: PropTypes.Validator<PropTypes.ReactComponentLike>,
  pageProps: PropTypes.Requireable<PropTypes.ReactElementLike>,
  store: any
}

const MyApp = (props : iprops) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = window.document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  });

  const { Component, pageProps, store } = props;
  return (
    <>
      <Head>
        <title>Factly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <Provider store={store}>
        <Wrapper Component={Component} pageProps={pageProps} />
      </Provider>
    </>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.element,
  store: PropTypes.object.isRequired,
};

MyApp.defaultProps = {
  pageProps: null,
};

export default withReduxStore(MyApp);