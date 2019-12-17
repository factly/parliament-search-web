import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import { selectedActions } from '../store/actions';
import { AppActions, typeFilter , typeSelectedFilter } from '../types';
import { Dispatch } from 'redux';

interface typeLists {
  id: number;
  type: string;
  label: string | undefined;
}

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 'inherit'
  },
  selectedRoot: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  selected: {
    borderRadius: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  }
}));

const SelectedFilters = ({
  selected,
  filters,
  dispatch
}: {
  selected: typeSelectedFilter;
  filters: typeFilter;
  dispatch: Dispatch<AppActions>;
}) => {
  const classes = useStyles();
  const list: typeLists[] = [];
  const typeList = [
    'states',
    'parties',
    'education',
    'marital',
    'gender',
    'type'
  ];
  let name: { id: number; name: string } | undefined;
  typeList.forEach(type => {
    selected[type].forEach((element: number) => {
      name = filters[type].find(
        (each: { id: number; name: string }) => each.id === element
      );
      if (name) {
        list.push({
          type: type,
          id: element,
          label: name.name
        });
      }
    });
  });

  return (
    <ExpansionPanel square>
      <ExpansionPanelSummary>
        <Typography variant="h5">Filters</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={classes.selectedRoot}>
          {list.map(value => (
            <Chip
              size="small"
              key={value.type + value.id}
              className={classes.selected}
              label={value.label}
              onDelete={() =>
                dispatch(selectedActions.toogle(value.id, value.type))
              }
            />
          ))}
          {selected.age[0] !== 25 || selected.age[1] !== 100 ? (
            <Chip
              size="small"
              className={classes.selected}
              label={`${selected.age[0]}-${selected.age[1]}`}
              onDelete={() => dispatch(selectedActions.setAge([25, 100]))}
            />
          ) : null}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
const arrayOfFilter = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};
SelectedFilters.propTypes = {
  selected: PropTypes.shape({
    states: PropTypes.arrayOf(PropTypes.number).isRequired,
    parties: PropTypes.arrayOf(PropTypes.number).isRequired,
    education: PropTypes.arrayOf(PropTypes.number).isRequired,
    marital: PropTypes.arrayOf(PropTypes.number).isRequired,
    age: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired,
  filters: PropTypes.shape({
    states: PropTypes.arrayOf(PropTypes.shape(arrayOfFilter)).isRequired,
    parties: PropTypes.arrayOf(PropTypes.shape(arrayOfFilter)).isRequired,
    education: PropTypes.arrayOf(PropTypes.shape(arrayOfFilter)).isRequired,
    marital: PropTypes.arrayOf(PropTypes.shape(arrayOfFilter)).isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default SelectedFilters;
