import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { selectedActions } from '../store/actions';
import {
  AppActions,
  TypeFilter,
  TypeSelected,
  TypeSetAll,
  TypeCheckBoxFilter
} from '../types';
import { Dispatch } from 'redux';

interface TypeLists {
  id: number;
  type: string;
  label: string;
}

interface TypeIDObject {
  [key: number]: TypeCheckBoxFilter;
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
  selected: TypeSelected;
  filters: TypeFilter;
  dispatch: Dispatch<AppActions>;
}): JSX.Element => {
  const classes = useStyles();
  const list: TypeLists[] = [];
  const typeList = [
    'state',
    'party',
    'education',
    'marital',
    'gender',
    'topic',
    'house'
  ];

  typeList.forEach(type => {
    const filtersObject: TypeIDObject = {};
    filters[type as keyof TypeSelected].forEach(
      (element: TypeCheckBoxFilter) => {
        filtersObject[element.id] = element;
      }
    );

    /* New line */

    (selected[type as keyof TypeSelected] as number[]).forEach(
      (element: number) => {
        const name: TypeCheckBoxFilter | undefined = filtersObject[element];
        if (name) {
          list.push({
            type: type,
            id: element,
            label: name.name
          });
        }
      }
    );
  });

  return (
    <div className={classes.selectedRoot}>
      {list.map(value => (
        <Chip
          size="small"
          key={value.type + value.id}
          className={classes.selected}
          label={value.label}
          onDelete={(): TypeSetAll =>
            dispatch(selectedActions.toogle(value.id, value.type))
          }
        />
      ))}
      {selected.ageMin !== 25 || selected.ageMax !== 100 ? (
        <Chip
          size="small"
          className={classes.selected}
          label={`${selected.ageMin}-${selected.ageMax}`}
          onDelete={(): TypeSetAll =>
            dispatch(selectedActions.setAge([25, 100]))
          }
        />
      ) : null}
    </div>
  );
};
/*const arrayOfFilter = {
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
};*/

export default SelectedFilters;
