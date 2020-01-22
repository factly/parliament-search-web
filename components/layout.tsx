import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import Cookies from 'js-cookie';

// import material-ui components
import { ThemeProvider } from '@material-ui/styles';
import Container from '@material-ui/core/Container';

// import themes
import light from '../lib/theme/light';
import dark from '../lib/theme/dark';

// import components
import Header from './Header';
import ErrorBox from './ErrorBox';
import ErrorBoundary from './ErrorBoundary';

// import actions
import { appActions } from '../store/actions';

// import types
import { AppActions, AppState, TypeApp } from '../types';

const Wrapper = ({
  Component,
  pageProps,
  app,
  dispatch
}: {
  Component: any;
  pageProps: any;
  app: TypeApp;
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

const mapStateToProps = (state: AppState): { app: TypeApp } => ({
  app: state.app
});

export default connect(mapStateToProps)(Wrapper);
