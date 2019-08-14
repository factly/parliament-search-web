import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import { selectedActions } from '../store/actions';

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(0),
  },
  cardHeader: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },
  selectedRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: theme.spacing(1),
  },
  selected: {
    borderRadius: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  eachFilter: {
    borderRadius: 0,
  },
}));

const SelectedFilters = ({ selected, filters, dispatch }) => {
  const classes = useStyles();

  return (
    <Card className={classes.eachFilter}>
      <CardHeader
        className={classes.cardHeader}
        title={(
          <Typography variant="h5" gutterBottom>
            Filters
          </Typography>
        )}
      />
      <CardContent className={classes.cardContent}>
        <div className={classes.selectedRoot}>
          {
            selected.states.map((value) => (
              <Chip
                size="small"
                key={`state${value}`}
                className={classes.selected}
                label={filters.states.find((each) => each.id === value).name}
                onDelete={() => dispatch(selectedActions.addState(value))}
              />
            ))
          }
          {
            selected.parties.map((value) => (
              <Chip
                size="small"
                key={`party${value}`}
                className={classes.selected}
                label={filters.parties.find((each) => each.id === value).name}
                onDelete={() => dispatch(selectedActions.addParty(value))}
              />
            ))
          }
          {
            selected.education.map((value) => (
              <Chip
                size="small"
                key={`education${value}`}
                className={classes.selected}
                label={filters.education.find((each) => each.id === value).name}
                onDelete={() => dispatch(selectedActions.addEducation(value))}
              />
            ))
          }
          {
            selected.age[0] !== 25 || selected.age[1] !== 100 ? (
              <Chip
                size="small"
                className={classes.selected}
                label={`${selected.age[0]}-${selected.age[1]}`}
                onDelete={() => dispatch(selectedActions.setAge([25, 100]))}
              />
            ) : null
          }
          {
            selected.marital.map((value) => (
              <Chip
                size="small"
                key={`marital${value}`}
                className={classes.selected}
                label={filters.marital.find((each) => each.id === value).name}
                onDelete={() => dispatch(selectedActions.addMarital(value))}
              />
            ))
          }
        </div>
      </CardContent>
    </Card>
  );
};
const arrayOfFilter = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
SelectedFilters.propTypes = {
  selected: PropTypes.shape({
    states: PropTypes.arrayOf(PropTypes.number).isRequired,
    parties: PropTypes.arrayOf(PropTypes.number).isRequired,
    education: PropTypes.arrayOf(PropTypes.number).isRequired,
    marital: PropTypes.arrayOf(PropTypes.number).isRequired,
    age: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  filters: PropTypes.shape({
    states: PropTypes.arrayOf(PropTypes.shape(arrayOfFilter)).isRequired,
    parties: PropTypes.arrayOf(PropTypes.shape(arrayOfFilter)).isRequired,
    education: PropTypes.arrayOf(PropTypes.shape(arrayOfFilter)).isRequired,
    marital: PropTypes.arrayOf(PropTypes.shape(arrayOfFilter)).isRequired,
    age: PropTypes.arrayOf(PropTypes.shape(arrayOfFilter)).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selected: state.selected,
  filters: state.filters,
});

export default connect(mapStateToProps)(SelectedFilters);
