import React from 'react'
import Head from "next/head";
import Router from 'next/router';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1)
  },
  appBarContent: {
    margin: 'auto'
  },
  logo: {
    height: '20px'
  },
  search: {
    backgroundColor: 'white',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  inputInput: {
    padding: theme.spacing(1, 2, 1, 2),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
  iconButton: {
    padding: theme.spacing(1),
  },
}));

const DefaultLayout = ({ children }) => {
  const classes = useStyles();
  const [term, setTerm] = React.useState("")

  var searchFunc = function(q){
    Router.push('/search?q='+term)
  }

  return (
    <div>
      <Head>
        <title>Factly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <div>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar className={classes.appBarContent}>
            <img className={classes.logo} src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_4ee2f9.png" />
            <div className={classes.search}>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={term}
                onChange={(event) => {setTerm(event.target.value)}}
                inputProps={{ 'aria-label': 'search' }}
              />
              <IconButton className={classes.iconButton} aria-label="Search" onClick={() => searchFunc()}>
                <SearchIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Toolbar/>
        <Container maxWidth={false} className={classes.container}>{children}</Container>
      </div>
    </div>
  )
}
export default DefaultLayout;