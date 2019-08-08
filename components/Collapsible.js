import React from 'react';
import { connect } from "react-redux";

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
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';

import { selectedActions } from './../store/actions'
const useStyles = makeStyles(theme => ({
  paddingZero: {
    padding: theme.spacing(0)
  },
  cardContent: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(0)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  CardHeader: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    cursor: 'pointer'
  },
  input: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  selectedRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: theme.spacing(1)
  },
  selected: {
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    borderRadius: theme.spacing(0.5)
  },
}));

const Collapsible = (props) => {
  const classes = useStyles();
  const [show, setShow] = React.useState(false)
  const [term, setTerm] = React.useState("")
  
  const filtersList  = function () {
    if(term.length === 0) 
      return props.list
    else {
      let newList = []
      props.list.map(value => {
        if(value.name.toLowerCase().includes(term.toLowerCase())) newList.push(value)
      })
      return newList
    }
  }

  return (
    <div>
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
          <Input
            placeholder="Search..."
            value={term}
            onChange={(event) => {setTerm(event.target.value)}}
            className={classes.input}
          />
          <List>
            {filtersList().slice(0, 5).map(value => {
              const labelId = `checkbox-list-label-${value.id}`;
            
              return (
                <ListItem key={value.id} dense onClick={() => props.dispatch(selectedActions[props.setFunc](value.id))}>
                  <ListItemIcon>
                    <Checkbox
                      className={classes.paddingZero}
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
    </div>
  )
}
const mapStateToProps = state => ({
  selected: state.selected
});

export default connect(mapStateToProps)(Collapsible);