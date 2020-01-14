import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import { ThemeProvider } from '@material-ui/styles';
import Container from '@material-ui/core/Container';

import { appActions } from '../store/actions';
import { AppState } from '../store/reducers';

import light from '../lib/theme/light';
import dark from '../lib/theme/dark';
import Header from './Header';
import { Dispatch } from 'redux';
import { AppActions } from '../types';
import ErrorBox from './ErrorBox';
import ErrorBoundary from './ErrorBoundary';

const Wrapper = ({
  Component,
  pageProps,
  app,
  dispatch
}: {
  Component: any;
  pageProps: any;
  app: {
    theme: string;
    error: string | null;
  };
  dispatch: Dispatch<AppActions>;
}): JSX.Element => {
  React.useEffect(() => {
    let localTheme: string | undefined = 'light';
    localTheme = Cookies.get('theme');
    if (localTheme) dispatch(appActions.changeTheme(localTheme));
  }, []);

  return (
    <ThemeProvider theme={app.theme === 'dark' ? dark : light}>
      <Header dispatch={dispatch} />
      <Container maxWidth={false} className="container">
        {app.error ? (
          <ErrorBox error={app.error} />
        ) : (
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        )}
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = (
  state: AppState
): {
  app: {
    theme: string;
    error: string | null;
  };
} => ({
  app: state.app
});

export default connect(mapStateToProps)(Wrapper);
