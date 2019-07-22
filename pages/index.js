import React from 'react';
import Router from 'next/router';
import { connect } from "react-redux";

import DefaultLayout from '../layouts/index';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const searchWidth = 600;

const useStyles = makeStyles({
  wrapper: {
    padding: 32,
  },
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
  const [which, setWhich] = React.useState('all');
  const [search, setSearch] = React.useState('');

  var searchFunc = function(){
    Router.push('/search')
  }
  
  return (
    <DefaultLayout>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <CardMedia
            className={classes.parliament}
            image="/static/images/parliament.png"
            title="Contemplative Reptile"
          />
          <Paper className={classes.inputroot}>
            <Select
              disableUnderline={true}
              onChange={(event) => {setWhich(event.target.value)}}
              className={classes.select}
              value={which}
            >
              <MenuItem value={'all'}>All</MenuItem>
              <MenuItem value={'topics'}>Topics</MenuItem>
              <MenuItem value={'members'}>Members</MenuItem>
            </Select>
            <InputBase
              onChange={(event) => {setSearch(event.target.value)}}
              value={search}
              className={classes.input}
              placeholder="Search anything"
            />
            <IconButton className={classes.iconButton} aria-label="Search" onClick={() => searchFunc()}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <div className={classes.topics}>
          <Paper>
            <Grid container spacing={3}>
            {
              filters.topics.map((x, i) => (
                <Grid item md={2} sm={6} key={i}>
                  <div className={classes.topic}>
                    <CardMedia
                      className={classes.media}
                      image={x.src}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography align="center" variant="subtitle2" gutterBottom>
                        {x.name}
                      </Typography>
                    </CardContent>   
                  </div>
                </Grid>
              ))
            }
            </Grid>
          </Paper>
        </div>
      </div>
    </DefaultLayout>
  );
}

const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(mapStateToProps)(HomePage);