import React from 'react';
import { Dispatch } from 'redux';

// import material-ui components
import Chip from '@material-ui/core/Chip';

// import selected actions
import { selectedActions } from '../store/actions';

// import types
import {
  AppActions,
  TypeFilter,
  TypeSelected,
  TypeSetAll,
  TypeCheckBoxFilter
} from '../types';

interface TypeLists {
  id: number;
  type: string;
  label: string;
}

interface TypeIDObject {
  [key: number]: TypeCheckBoxFilter;
}

const SelectedFilters = ({
  selected,
  filters,
  dispatch
}: {
  selected: TypeSelected;
  filters: TypeFilter;
  dispatch: Dispatch<AppActions>;
}): JSX.Element => {
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
    <div className="askedRoot">
      {list.map(value => (
        <Chip
          size="small"
          key={value.type + value.id}
          className="selected"
          label={value.label}
          onDelete={(): TypeSetAll =>
            dispatch(selectedActions.toogle(value.id, value.type))
          }
        />
      ))}
      {selected.ageMin !== 25 || selected.ageMax !== 100 ? (
        <Chip
          size="small"
          className="selected"
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
