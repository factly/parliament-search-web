import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DefaultLayout from '../layouts/index'

const useStyles = makeStyles({
  inputroot: {
    padding: '2px 8px',
    display: 'flex',
    alignItems: 'center',
    width: 600,
  },
  select: {
    width: 100,
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
    height: 28,
    margin: 4,
  },
  header: {
    position: 'fixed',
    left: '50%',
    width: 600,
    marginLeft: -300,
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
      </div>
    </DefaultLayout>
  );
}