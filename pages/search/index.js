import React from 'react';
import { connect } from 'react-redux';
import Router, { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CheckBoxFilter from '../../components/CheckBoxFilter';
import SliderFilter from '../../components/SliderFilter';
import SelectedFilters from '../../components/SelectedFilters';
import QuestionBox from '../../components/QuestionBox';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { selectedActions } from '../../store/actions';

const useStyles = makeStyles((theme) =>
  createStyles({
    marginBottomOne : {
      marginBottom : theme.spacing(1.5)
    }
  }),
);

const SearchPage = ({ dispatch, selected, filters, marks }) => {
  const router = useRouter();
  const classes = useStyles();
  React.useEffect(() => {
    dispatch(selectedActions.setAll(router.query));
  }, []);

  React.useEffect(() => {
    const querySelected = {};
    const {age, education, states, marital, parties ,q , sort , terms , type, gender} = selected;

    if(age && age.length === 2  ) 
      {
      if( age[0] && age[1] && age[1] - age[0] !== 75 )
      querySelected.age = age.map((value) => value);
      }
    if(education && education.length > 0) querySelected.education = education.map((value) => value );
    if(states && states.length > 0) querySelected.states = states.map((value) => value);
    if(marital && marital.length > 0) querySelected.marital = marital.map((value) => value);
    if(parties && parties.length > 0) querySelected.parties = parties.map((value) => value);
    if(sort !== 'popular') querySelected.sort = sort;
    if(terms !== 1) querySelected.terms = terms;
    if(type && type.length >0 ) querySelected.type = type.map((value) => value) ;
    if(gender && gender.length >0 ) querySelected.gender = gender.map((value) => value) ;
    if(q) querySelected.q = q;
    Router.push({
      pathname: '/search',
      query: querySelected,
    });
  }, [selected]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
        <div>
          <SelectedFilters />
          <CheckBoxFilter
            limit={2}
            heading="Type"
            list={filters.type}
            toogle={(value) => dispatch(selectedActions.toogle(value, 'type'))}
            selected={selected.type}
          />
          <CheckBoxFilter
            limit={5}
            search
            defaultShow
            heading="State"
            list={filters.states}
            toogle={(value) => dispatch(selectedActions.toogle(value, 'states'))}
            selected={selected.states}
          />
          <CheckBoxFilter
            limit={5}
            search
            defaultShow
            heading="Party"
            list={filters.parties}
            toogle={(value) => dispatch(selectedActions.toogle(value, 'parties'))}
            selected={selected.parties}
          />
          <SliderFilter
            heading="Terms"
            marks = {marks.marksTerm}
            selected={selected.numberOfTerms}
            toogle={(event, value) => dispatch(selectedActions.setTerms(value))}
          />
          <CheckBoxFilter
            limit={filters.education.length}
            heading="Education"
            list={filters.education}
            toogle={(value) => dispatch(selectedActions.toogle(value, 'education'))}
            selected={selected.education}
          />
          <SliderFilter
            heading="Age"
            marks = {marks.marksAge}
            selected={selected.age}
            toogle={(event, value) => dispatch(selectedActions.setAge(value))}
          />
          <CheckBoxFilter
            limit={3}
            heading="Gender"
            list={filters.gender}
            toogle={(value) => dispatch(selectedActions.toogle(value, 'gender'))}
            selected={selected.gender}
          />
          <CheckBoxFilter
            limit={filters.marital.length}
            heading="Marital"
            list={filters.marital}
            toogle={(value) => dispatch(selectedActions.toogle(value, 'marital'))}
            selected={selected.marital}
          />
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
        <Card>
          <CardHeader
            title="Questions"
            action={(
              <Select
                value={selected.sort}
                onChange={(event) => dispatch(selectedActions.setSort(event.target.value))}
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
          <CardContent>
            <div className={classes.marginBottomOne}>
              <QuestionBox />
            </div>
            <div className={classes.marginBottomOne}>
              <QuestionBox />
            </div>
            <div className={classes.marginBottomOne}>
              <QuestionBox />
            </div>
            <div className={classes.marginBottomOne}>
              <QuestionBox />
            </div>
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
const arrayOfMarks = {
  value : PropTypes.number.isRequired,
  label : PropTypes.string.isRequired
}
SearchPage.propTypes = {
  selected: PropTypes.shape({
    q: PropTypes.string.isRequired,
    states: PropTypes.arrayOf(PropTypes.number).isRequired,
    parties: PropTypes.arrayOf(PropTypes.number).isRequired,
    education: PropTypes.arrayOf(PropTypes.number).isRequired,
    marital: PropTypes.arrayOf(PropTypes.number).isRequired,
    age: PropTypes.arrayOf(PropTypes.number).isRequired,
    sort: PropTypes.string.isRequired,
    terms: PropTypes.number.isRequired
  }).isRequired,
  filters: PropTypes.shape({
    states: PropTypes.arrayOf(PropTypes.shape(arrayOfFilter)).isRequired,
    parties: PropTypes.arrayOf(PropTypes.shape(arrayOfFilter)).isRequired,
    education: PropTypes.arrayOf(PropTypes.shape(arrayOfFilter)).isRequired,
    marital: PropTypes.arrayOf(PropTypes.shape(arrayOfFilter)).isRequired,
    type: PropTypes.arrayOf(PropTypes.shape(arrayOfFilter)).isRequired,
    gender: PropTypes.arrayOf(PropTypes.shape(arrayOfFilter)).isRequired,
  }).isRequired,
  marks : PropTypes.shape({
    marksAge : PropTypes.arrayOf(PropTypes.shape(arrayOfMarks)).isRequired,
    marksTerm : PropTypes.arrayOf(PropTypes.shape(arrayOfMarks)).isRequired
  }),
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filters: state.filters,
  selected: state.selected,
  marks : state.marks
});

export default connect(mapStateToProps)(SearchPage);
