import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import HighlightIcon from '@material-ui/icons/Highlight';
import InputBase from '@material-ui/core/InputBase';

import { appActions } from '../store/actions';
import { AppState } from '../store/reducers';
import { AppActions, TypeChangeTheme } from '../types';
import { Dispatch } from 'redux';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) => ({
  search: {
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: theme.spacing(1),
    maxWidth: 550
  },
  searchButton: {
    color: theme.palette.common.black,
    padding: theme.spacing(1)
  },
  themeButton: {
    color: theme.palette.common.white
  }
}));

const Header = ({
  dispatch,
  theme,
  q
}: {
  dispatch: Dispatch<AppActions>;
  theme: string;
  q: string;
}): JSX.Element => {
  const classes = useStyles();

  const [value, setValue] = React.useState(q);
  const onChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setValue(event.target.value);
  };
  const searchFunc = (): void => {
    Router.push(`/search?q=${value}`);
  };
  const onKeyDown = (e: React.KeyboardEvent<any>): void => {
    if (e.key === 'Enter') {
      searchFunc();
    }
  };
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Grid container spacing={3} alignItems="center">
            <Grid item sm={4} md={3} lg={2} xl={2}>
              <Link href="/" as="/">
                <a className="link">
                  <img
                    className="logo"
                    alt="Home"
                    src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_4ee2f9.png"
                  />
                </a>
              </Link>
            </Grid>
            <Grid item sm={5} md={8} lg={6} xl={2}>
              <div className={classes.search}>
                <InputBase
                  placeholder="Search…"
                  className="inputBar"
                  value={value}
                  onChange={onChange}
                  onKeyDown={onKeyDown}
                  inputProps={{ 'aria-label': 'search' }}
                />
                <IconButton
                  className={classes.searchButton}
                  aria-label="Search"
                  onClick={(): void => searchFunc()}
                >
                  <SearchIcon />
                </IconButton>
              </div>
            </Grid>
            <Grid item md={1} lg={4}>
              <IconButton
                className={classes.themeButton}
                onClick={(): TypeChangeTheme =>
                  dispatch(
                    appActions.changeTheme(theme === 'light' ? 'dark' : 'light')
                  )
                }
              >
                <HighlightIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

Header.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state: AppState): { theme: string; q: string } => ({
  theme: state.app.theme,
  q: state.selected.q
});

export default connect(mapStateToProps)(Header);
