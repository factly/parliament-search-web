import React from 'react';
import { connect } from "react-redux";

import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Chip from '@material-ui/core/Chip';

import { selectedActions } from '../store/actions'
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

const SelectedFilters = (props) => {
  const classes = useStyles();

  return (
    <div>
      <CardHeader 
        className={classes.CardHeader}
        title={
          <Typography variant="h6" gutterBottom >
            Filters
          </Typography>
        }
      />
      <CardContent className={classes.cardContent}>
        <div className={classes.selectedRoot}>
        {
          props.selected.parties.map(value => {
            return (
              <Chip 
                size="small"
                className={classes.selected} 
                label={props.filters.parties.find(each => each.id === value)['name']} 
                onDelete={() => props.dispatch(selectedActions.addParty(value))}
              />         
            )
          })
        }
        {
          props.selected.states.map(value => {
              return (
                <Chip 
                  size="small"
                  className={classes.selected} 
                  label={props.filters.states.find(each => each.id === value)['name']} 
                  onDelete={() => props.dispatch(selectedActions.addState(value))}
                />         
              )
            })
        }
        </div>
      </CardContent>
    </div>
  )
}
const mapStateToProps = state => ({
  selected: state.selected,
  filters: state.filters
});

export default connect(mapStateToProps)(SelectedFilters);