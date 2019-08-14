import React from 'react';
import { connect } from 'react-redux';
import Router, { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CheckBoxFilter from '../../components/CheckBoxFilter';
import SliderFilter from '../../components/SliderFilter';
import SelectedFilters from '../../components/SelectedFilters';
import QuestionBox from '../../components/QuestionBox';

import { selectedActions } from '../../store/actions';

const SearchPage = ({ dispatch, selected, filters }) => {
  const router = useRouter();

  React.useEffect(() => {
    dispatch(selectedActions.setAll(router.query));
  }, []);

  React.useEffect(() => {
    const query = {};
    if (selected.q && selected.q.trim() !== '') query.q = selected.q.trim();
    if (selected.states.length > 0) query.states = selected.states;
    if (selected.parties.length > 0) query.parties = selected.parties;
    if (selected.education.length > 0) query.education = selected.education;
    if (selected.marital.length > 0) query.marital = selected.marital;
    if (selected.sort !== 'popular') query.sort = selected.sort;
    if (selected.age.length === 2
      && (selected.age[0] !== 25
      || selected.age[1] !== 100)
    ) query.age = selected.age;
    Router.push({
      pathname: '/search',
      query,
    });
  }, [selected]);

  const [sort, setSort] = React.useState('popular');
  return (
    <Grid container xl spacing={2}>
      <Grid item xs={2}>
        <div>
          <SelectedFilters />
          <CheckBoxFilter
            limit={5}
            search
            defaultShow
            heading="State"
            list={filters.states}
            toogle={(value) => dispatch(selectedActions.addState(value))}
            selected={selected.states}
            type="states"
          />
          <CheckBoxFilter
            limit={5}
            search
            defaultShow
            heading="Party"
            list={filters.parties}
            toogle={(value) => dispatch(selectedActions.addParty(value))}
            selected={selected.parties}
            type="parties"
          />
          <CheckBoxFilter
            limit={filters.education.length}
            heading="Education"
            list={filters.education}
            toogle={(value) => dispatch(selectedActions.addEducation(value))}
            selected={selected.education}
            type="education"
          />
          <SliderFilter
            heading="Age"
            selected={selected.age}
            toogle={(event, value) => dispatch(selectedActions.setAge(value))}
          />
          <CheckBoxFilter
            limit={filters.marital.length}
            heading="Marital"
            list={filters.marital}
            toogle={(value) => dispatch(selectedActions.addMarital(value))}
            selected={selected.marital}
            type="marital"
          />
        </div>
      </Grid>
      <Grid item xs={10}>
        <Card>
          <CardHeader
            title="Questions"
            action={(
              <Select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                displayEmpty
                disableUnderline
                name="sorting"
              >
                <MenuItem value="popular">Popular</MenuItem>
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="alphabetical">Subject</MenuItem>
              </Select>
)}
          />
          <Divider />
          <CardContent>
            <QuestionBox />
          </CardContent>
          <CardContent>
            <QuestionBox />
          </CardContent>
          <CardContent>
            <QuestionBox />
          </CardContent>
          <CardContent>
            <QuestionBox />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const arrayOfFilter = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
SearchPage.propTypes = {
  selected: PropTypes.shape({
    q: PropTypes.string.isRequired,
    states: PropTypes.arrayOf(PropTypes.number).isRequired,
    parties: PropTypes.arrayOf(PropTypes.number).isRequired,
    education: PropTypes.arrayOf(PropTypes.number).isRequired,
    marital: PropTypes.arrayOf(PropTypes.number).isRequired,
    age: PropTypes.arrayOf(PropTypes.number).isRequired,
    sort: PropTypes.string.isRequired,
  }).isRequired,
  filters: PropTypes.shape({
    states: PropTypes.arrayOf(PropTypes.shape(arrayOfFilter)).isRequired,
    parties: PropTypes.arrayOf(PropTypes.shape(arrayOfFilter)).isRequired,
    education: PropTypes.arrayOf(PropTypes.shape(arrayOfFilter)).isRequired,
    marital: PropTypes.arrayOf(PropTypes.shape(arrayOfFilter)).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filters: state.filters,
  selected: state.selected,
});

export default connect(mapStateToProps)(SearchPage);
