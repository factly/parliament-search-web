import React from 'react';
import { connect } from "react-redux";

import DefaultLayout from '../../layouts/index';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles(theme => ({
  paddingZero: {
    padding: theme.spacing(0)
  },
  paddingOne: {
    padding: theme.spacing(1)
  }
}));

const HomePage = ({ filters }) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const [show, setShow] = React.useState(false)
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <DefaultLayout>
       <Grid container spacing={2}>
        <Grid item xs={2}>
          <Card>
            <CardHeader className={classes.paddingOne} 
              title={
                <Typography variant="h6" gutterBottom>
                  LIst 1
                </Typography>
              }
              action={
                <IconButton aria-label="settings" onClick={() => setShow(!show)}>
                { show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} 
                </IconButton>
              }
            />
            { 
              show ? (
                <CardContent className={classes.paddingZero}>
                  <List>
                    {[0, 1, 2, 3].map(value => {
                      const labelId = `checkbox-list-label-${value}`;

                      return (
                        <ListItem key={value} dense button onClick={handleToggle(value)}>
                          <ListItemIcon>
                            <Checkbox
                              className={classes.paddingZero}
                              edge="start"
                              checked={checked.indexOf(value) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                        
                        </ListItem>
                      );
                    })}
                  </List>
                </CardContent> 
              ) : null
            }
          </Card>
        </Grid>
        <Grid item xs={10}>
        </Grid>
       </Grid>
    </DefaultLayout>
  );
}

const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(mapStateToProps)(HomePage);