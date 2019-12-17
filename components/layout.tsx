import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Container from '@material-ui/core/Container';

import { appActions } from '../store/actions';
import { AppState } from '../store/reducers';

import light from '../lib/theme/light';
import dark from '../lib/theme/dark';
import Header from './Header';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(1.5)
  }
}));

const Wrapper = (props: any) => {
  const classes = useStyles();

  const { Component, pageProps, theme, dispatch } = props;

  React.useEffect(() => {
    let localTheme: string | undefined = 'light';
    localTheme = Cookies.get('theme');
    if (localTheme) dispatch(appActions.changeTheme(localTheme));
  }, []);

  return (
    <ThemeProvider theme={theme === 'dark' ? dark : light}>
      <Header dispatch={dispatch} />
      <Container maxWidth={false} className={classes.container}>
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
};

Wrapper.propTypes = {
  Component: PropTypes.elementType.isRequired,
  theme: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

Wrapper.defaultProps = {
  pageProps: null
};

const mapStateToProps = (state: AppState) => ({
  theme: state.app.theme
});

export default connect(mapStateToProps)(Wrapper);
