import React from 'react';
import { connect } from "react-redux";

import DefaultLayout from '../../layouts/index';

import { makeStyles } from '@material-ui/core/styles';

const searchWidth = 600;

const useStyles = makeStyles({
  header: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto', 
    width: searchWidth,
  },
  topics: {
    marginTop: 48
  },
  inputroot: {
    padding: '2px 8px',
    display: 'flex',
    alignItems: 'center',
    marginTop : 16,
  },
  select: {
    width: searchWidth / 6,
    backgroundColor: ''
  },
  input: {
    marginLeft: 16,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: '28',
    margin: 4,
  },
  wrapper: {
    padding: 32,
  },
  parliament: {
    height: 300
  },
  media: {
    width: 100,
    height: 100,
    margin: 'auto'
  },
  topic: {
    minWidth: 100
  }
});

const HomePage = ({ filters }) => {
  const classes = useStyles();
  
  return (
    <DefaultLayout>
      <div className={classes.wrapper}>
        <h1>HEllo</h1>
      </div>
    </DefaultLayout>
  );
}

const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(mapStateToProps)(HomePage);