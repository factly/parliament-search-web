import React from 'react';
import { connect } from "react-redux";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { selectedActions } from './../store/actions'
const useStyles = makeStyles(theme => ({
  paddingZero: {
    padding: theme.spacing(0)
  },
  cardContent: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(0)
  },
  CardHeader: {
    padding: theme.spacing(1),
    cursor: 'pointer'
  }
}));

const Collapsible = (props) => {
  const classes = useStyles();
  const [show, setShow] = React.useState(false)
  
  return (
    <Card>
      <CardHeader 
        onClick={() => setShow(!show)}
        className={classes.CardHeader}
        title={
          <Typography variant="body2" gutterBottom >
            {props.heading}
          </Typography>
        }
        action={
          <IconButton aria-label="settings">
          { show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} 
          </IconButton>
        }
      />
      <Collapse in={show} timeout="auto" unmountOnExit>
        <CardContent className={classes.cardContent}>
          <List>
            {props.list.map(value => {
              const labelId = `checkbox-list-label-${value.id}`;

              return (
                <ListItem key={value.id} dense onClick={() => props.dispatch(selectedActions[props.setFunc](value.id))}>
                  <ListItemIcon>
                    <Checkbox
                      className={classes.paddingZero}
                      edge="start"
                      checked={props.selected[props.type].indexOf(value.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value.name} />
                </ListItem>
              );
            })}
          </List> 
        </CardContent>
      </Collapse>
    </Card>
  )
}
const mapStateToProps = state => ({
  selected: state.selected
});

export default connect(mapStateToProps)(Collapsible);