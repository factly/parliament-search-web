import React from 'react';
import App, { Container } from 'next/app';
import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { makeStore } from '../store';

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
    };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>   
          <Component {...pageProps} />
        </Provider> 
      </Container>
    );
  }
}

export default withRedux(makeStore)(MyApp);