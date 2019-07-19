import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DefaultLayout from '../layouts/index';
import Grid from '@material-ui/core/Grid';

const searchWidth = 600;

const useStyles = makeStyles({
  inputroot: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto', 
    width: searchWidth,
    padding: '2px 8px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 16
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
  header: {
    marginTop: 60
  }
});

export default function Home() {
  const classes = useStyles();
  const [which, setWhich] = React.useState('all');
  const [search, setSearch] = React.useState('');

  return (
    <DefaultLayout>
      <div className={classes.header}>
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
          <Divider className={classes.divider} />
          <InputBase
            onChange={(event) => {setSearch(event.target.value)}}
            value={search}
            className={classes.input}
            placeholder="Search anything"
          />
          <IconButton className={classes.iconButton} aria-label="Search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <div>
          <Grid container spacing={3}>
            <Grid item md={2} sm={6}>
              <Paper>xs=6 sm=3</Paper>
            </Grid>
            <Grid item md={2} sm={6}>
              <Paper>xs=6 sm=3</Paper>
            </Grid>
            <Grid item md={2} sm={6}>
              <Paper>xs=6 sm=3</Paper>
            </Grid>
            <Grid item md={2} sm={6}>
              <Paper>xs=6 sm=3</Paper>
            </Grid>
            <Grid item md={2} sm={6}>
              <Paper>xs=6 sm=3</Paper>
            </Grid>
            <Grid item md={2} sm={6}>
              <Paper>xs=6 sm=3</Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </DefaultLayout>
  );
}