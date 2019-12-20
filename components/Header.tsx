import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import HighlightIcon from '@material-ui/icons/Highlight';

import { appActions } from '../store/actions';
import { AppState } from '../store/reducers';
import { AppActions } from '../types';
import { Dispatch } from 'redux';

import Grid from '@material-ui/core/Grid';
import Autosuggest from 'react-autosuggest';

interface HeaderProps {
  dispatch: Dispatch<AppActions>;
  theme: string;
}
interface SuggestionProps {
  name: string;
}
const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    height: '20px',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  search: {
    backgroundColor: theme.palette.common.white,
    color: 'black',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: theme.spacing(1),
    maxWidth: 600
  },

  searchButton: {
    color: theme.palette.common.black,
    padding: theme.spacing(1)
  },
  themeButton: {
    color: theme.palette.common.white,
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  container: {
    position: 'relative',
    width: 550
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    border: '1px solid #aaa',
    alignContent: 'left'
  },
  suggestionsList: {
    backgroundColor: '#fff',
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  inputAuto: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(0, 1),
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5
  },
  searchBox: {
    padding: theme.spacing(0, 1),
    margin: 0,
    height: theme.spacing(4),
    textAlign: 'right',
    textTransform: 'lowercase'
  },
  suggestionHighlighted: {
    backgroundColor: '#DCDCDC'
  },
  link: {
    cursor: 'pointer'
  }
}));

const Header = ({ dispatch, theme }: HeaderProps) => {
  const classes = useStyles();
  const suggestionsList: SuggestionProps[] = [
    {
      name: 'Hi-tech city startup hub'
    },
    {
      name: 'Government schools'
    },
    {
      name: 'hyderabad'
    },
    {
      name: 'gandhinagar'
    }
  ];

  const [value, setValue] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([{ name: '' }]);

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : suggestionsList.filter(
          (each: SuggestionProps) =>
            each.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: SuggestionProps) => suggestion.name;

  const renderSuggestion = (suggestion: SuggestionProps) => (
    <Button
      className={classes.searchBox}
      onClick={() => Router.push('/members/[mid]', '/members/1')}
    >
      {suggestion.name}
    </Button>
  );
  const searchFunc = () => {
    Router.push(`/search?q=${value}`);
  };
  const onChange = (
    event: React.FormEvent<HTMLInputElement>,
    { newValue }: { newValue: string }
  ) => {
    setValue(newValue);
  };
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Grid container spacing={3} alignItems="center">
            <Grid item sm={4} md={3} lg={2} xl={2}>
              <Link href="/" as="/">
                <a className={classes.link}>
                  <img
                    className={classes.logo}
                    alt="Home"
                    src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_4ee2f9.png"
                  />
                </a>
              </Link>
            </Grid>
            <Grid item sm={5} md={8} lg={6} xl={2}>
              <div className={classes.search}>
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    input: classes.inputAuto,
                    suggestionHighlighted: classes.suggestionHighlighted
                  }}
                  inputProps={{
                    placeholder: 'search ...',
                    value,
                    onChange: onChange,
                    id: 'auto'
                  }}
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
            <Grid item md={1} lg={4}>
              <IconButton
                className={classes.themeButton}
                onClick={() =>
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

const mapStateToProps = (state: AppState): { theme: string } => ({
  theme: state.app.theme
});

export default connect(mapStateToProps)(Header);
