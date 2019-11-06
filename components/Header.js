import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import HighlightIcon from '@material-ui/icons/Highlight';

import { appActions } from '../store/actions';

const useStyles = makeStyles((theme) => ({
  appBarContent: {
    margin: 'auto',
  },
  logo: {
    height: '20px',
  },
  search: {
    backgroundColor: theme.palette.common.white,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  inputInput: {
    color: theme.palette.common.black,
    padding: theme.spacing(1, 2, 1, 2),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 400,
    },[theme.breakpoints.down('xs')]: {
      width: 90,
    },
  },
  searchButton: {
    color: theme.palette.common.black,
    padding: theme.spacing(1),
  },
  themeButton: {
    color: theme.palette.common.white,
  },
}));

const Header = ({ dispatch, theme }) => {
  const classes = useStyles();
  const [term, setTerm] = React.useState('');

  const searchFunc = () => {
    Router.push(`/search?q=${term}`);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar className={classes.appBarContent}>
          <img className={classes.logo} alt="Home" src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_4ee2f9.png" />
          <div className={classes.search}>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={term}
              onChange={(event) => { setTerm(event.target.value); }}
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton
              className={classes.searchButton}
              aria-label="Search"
              onClick={() => searchFunc()}
            >
              <SearchIcon />
            </IconButton>
          </div>
          <IconButton
            className={classes.themeButton}
            onClick={() => dispatch(appActions.changeTheme(theme === 'light' ? 'dark' : 'light'))}
          >
            <HighlightIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.app.theme,
});

export default connect(mapStateToProps)(Header);
