import React from 'react';
import { connect } from 'react-redux';
import { Container as NextContainer } from 'next/app';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Container from '@material-ui/core/Container';

import { appActions } from '../store/actions';

import light from '../lib/theme/light';
import dark from '../lib/theme/dark';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1.5),
  },
}));

const Wrapper = (props) => {
  const classes = useStyles();

  const {
    Component, pageProps, theme, dispatch,
  } = props;

  React.useEffect(() => {
    let localTheme = 'light';
    localTheme = Cookies.get('theme');
    dispatch(appActions.changeTheme(localTheme));
  }, []);

  return (
    <ThemeProvider theme={theme === 'dark' ? dark : light}>
      <Header />
      <NextContainer>
        <Container maxWidth={false} className={classes.container}>
          <Component {...pageProps} />
        </Container>
      </NextContainer>
    </ThemeProvider>
  );
};

Wrapper.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.element,
  theme: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

Wrapper.defaultProps = {
  pageProps: null,
};

const mapStateToProps = (state) => ({
  theme: state.app.theme,
});

export default connect(mapStateToProps)(Wrapper);