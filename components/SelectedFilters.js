import React from 'react';
import { connect } from "react-redux";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import { selectedActions } from '../store/actions'
const useStyles = makeStyles(theme => ({
  cardContent: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(0)
  },
  cardHeader: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2)
  },
  selectedRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: theme.spacing(1)
  },
  selected: {
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  eachFilter: {
    borderRadius: 0
  }
}));

const SelectedFilters = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.eachFilter}>
      <CardHeader 
        className={classes.cardHeader}
        title={
          <Typography variant="h5" gutterBottom >
            Filters
          </Typography>
        }
      />
      <CardContent className={classes.cardContent}>
        <div className={classes.selectedRoot}>
        {
          props.selected.states.map(value => {
            return (
              <Chip 
                size="small"
                key={"state"+value}
                className={classes.selected} 
                label={props.filters.states.find(each => each.id === value)['name']} 
                onDelete={() => props.dispatch(selectedActions.addState(value))}
              />         
            )
          })
        }
        {
          props.selected.parties.map(value => {
            return (
              <Chip 
                size="small"
                key={"party"+value}
                className={classes.selected} 
                label={props.filters.parties.find(each => each.id === value)['name']} 
                onDelete={() => props.dispatch(selectedActions.addParty(value))}
              />         
            )
          })
        }
        {
          props.selected.education.map(value => {
              return (
                <Chip 
                  size="small"
                  key={"education"+value}
                  className={classes.selected} 
                  label={props.filters.education.find(each => each.id === value)['name']} 
                  onDelete={() => props.dispatch(selectedActions.addEducation(value))}
                />         
              )
            })
        }
        {
          props.selected.age[0] !== 25 || props.selected.age[1] !== 100 ? (
            <Chip 
              size="small"
              className={classes.selected} 
              label={props.selected.age[0] + "-" + props.selected.age[1]} 
              onDelete={() => props.dispatch(selectedActions.setAge([25, 100]))}
            /> 
          ) : null
        }
        {
          props.selected.genders[0] !== "all" ? (
            <Chip 
              size="small"
              className={classes.selected}
              label={props.selected.genders[0]} 
              onDelete={() => props.dispatch(selectedActions.setGender("all"))}
            /> 
          ) : null
        }
        {
          props.selected.marital.map(value => {
              return (
                <Chip 
                  size="small"
                  key={"marital"+value}
                  className={classes.selected} 
                  label={props.filters.marital.find(each => each.id === value)['name']} 
                  onDelete={() => props.dispatch(selectedActions.addMarital(value))}
                />         
              )
            })
        }
        </div>
      </CardContent>
    </Card>
  )
}
const mapStateToProps = state => ({
  selected: state.selected,
  filters: state.filters
});

export default connect(mapStateToProps)(SelectedFilters);