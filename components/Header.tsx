import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';

import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import HighlightIcon from '@material-ui/icons/Highlight';

import { appActions } from '../store/actions';
import { AppState } from '../store/reducers';
import { AppActions } from '../types';
import {Dispatch} from 'redux';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

interface headerProps{
  dispatch : Dispatch<AppActions>, 
  theme : String
}

const useStyles = makeStyles((theme : Theme) => ({
  logo: {
    height: '20px',
    [theme.breakpoints.down('xs')]: {
     display : 'none',
    },
  },
  search: {
    backgroundColor: theme.palette.common.white,
    borderRadius : theme.spacing(1),
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: 'auto',
    },
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
  },
  inputInput: {
    color: theme.palette.common.black,
    padding: theme.spacing(1, 2, 1, 2),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 80,
    },
    [theme.breakpoints.up('md')]: {
      width: 420,
    },
    [theme.breakpoints.up('lg')]: {
      width: 400,
    },
    [theme.breakpoints.down('xs')]: {
      width: 120,
    },
  },
  searchButton: {
    color: theme.palette.common.black,
    padding: theme.spacing(1),
  },
  themeButton: {
    color: theme.palette.common.white,
    [theme.breakpoints.down('xs')]: {
      display : 'none',
     },
  },
  formControl: {
    minWidth: 120,
    padding: theme.spacing(0.5),
    borderRight : '1px',
  },
}));

const Header = ({ dispatch, theme } : headerProps) => {
  const classes = useStyles();
  const [term, setTerm] = React.useState('');
  const [values, setValues] = React.useState({
    category: 'questions',
    name: 'category',
  });

  const searchFunc = () => {
    Router.push(`/search?q=${term}`);
  };

  const handleChange = (event : React.ChangeEvent<{name?: any; value: unknown;}>) => { 
    setValues(oldValues => (
      {...oldValues,[event.target.name]: event.target.value,})
      );
    }

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Grid container spacing={3} alignItems="center">
            <Grid item sm={4} md={3} lg={2} xl={2}>
              <img className={classes.logo} alt="Home" src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_4ee2f9.png" />
            </Grid>
            <Grid item sm={5} md={8} lg={6} xl={2}>
              <div className={classes.search}>
                <FormControl variant="filled" className={classes.formControl}>
                  <Select
                    value={values.category}
                    onChange={handleChange}
                    inputProps={{
                      name: 'category',
                      id: 'category-search',
                    }}
                    disableUnderline
                  >
                    <MenuItem value={'questions'}>Questions</MenuItem>
                    <MenuItem value={'members'}>Members</MenuItem>
                    <MenuItem value={'pincodes'}>Pincodes</MenuItem>
                  </Select>
                </FormControl>
                <InputBase
                  placeholder="Search…"
                  classes={{
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
            </Grid>
            <Grid item  md={1} lg={4} >
              <IconButton
                className={classes.themeButton}
                onClick={() => dispatch(appActions.changeTheme(theme === 'light' ? 'dark' : 'light'))}
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
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state:AppState): {theme : string} => ({
  theme: state.app.theme,
});

export default connect(mapStateToProps)(Header);
