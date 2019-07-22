import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import {makeStore} from '../store';

import theme from '../lib/theme';

class MyApp extends App {
  
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>   
            <Component {...pageProps} />
          </Provider> 
        </ThemeProvider>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCount: () => dispatch(Actions.addCount())
  };
};

const mapStateToProps = state => {
  return state
};

export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(MyApp);