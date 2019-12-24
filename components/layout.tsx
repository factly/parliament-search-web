import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import { makeStyles, Theme } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(1.5)
  }
}));

const Wrapper = ({
  Component,
  pageProps,
  app,
  dispatch
}: {
  Component: any;
  pageProps: any;
  app: any;
  dispatch: Dispatch<AppActions>;
}): JSX.Element => {
  const classes = useStyles();

  React.useEffect(() => {
    let localTheme: string | undefined = 'light';
    localTheme = Cookies.get('theme');
    if (localTheme) dispatch(appActions.changeTheme(localTheme));
  }, []);

  return (
    <ThemeProvider theme={app.theme === 'dark' ? dark : light}>
      <Header dispatch={dispatch} />
      <Container maxWidth={false} className={classes.container}>
        {app.error ? (
          <ErrorBox error={app.error} />
        ) : (
          <Component {...pageProps} />
        )}
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: AppState): { app: any } => ({
  app: state.app
});

export default connect(mapStateToProps)(Wrapper);
