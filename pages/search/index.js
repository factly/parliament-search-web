import React from 'react';
import { connect } from 'react-redux';
import Router, { useRouter } from 'next/router';

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
    if (selected.sort) query.sort = selected.sort;
    if (selected.genders) query.genders = selected.genders;
    if (selected.age) query.age = selected.age;
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
            setFunc="addState"
            type="states"
          />
          <CheckBoxFilter
            limit={5}
            search
            defaultShow
            heading="Party"
            list={filters.parties}
            setFunc="addParty"
            type="parties"
          />
          <CheckBoxFilter
            limit={filters.education.length}
            heading="Education"
            list={filters.education}
            setFunc="addEducation"
            type="education"
          />
          <SliderFilter
            heading="Age"
          />
          <CheckBoxFilter
            limit={filters.genders.length}
            heading="Gender"
            list={filters.genders}
            setFunc="setGender"
            type="genders"
          />
          <CheckBoxFilter
            limit={filters.marital.length}
            heading="Marital"
            list={filters.marital}
            setFunc="addMarital"
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

const mapStateToProps = (state) => ({
  filters: state.filters,
  selected: state.selected,
});

export default connect(mapStateToProps)(SearchPage);
