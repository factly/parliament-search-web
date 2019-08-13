import React from 'react';
import { connect } from "react-redux";
import Router, { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CheckBoxFilter from '../../components/CheckBoxFilter';
import SliderFilter from "../../components/SliderFilter";
import SelectedFilters from '../../components/SelectedFilters';
import QuestionBox from '../../components/QuestionBox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { selectedActions } from '../../store/actions'
const useStyles = makeStyles(theme => ({
  eachFilter: {
    borderBottomWidth: 1,
    borderBottomColor: "#5e5b61"
  },
  paddingOne: {
    padding: theme.spacing(1),
  },
}));

const SearchPage = (props) => {
  const classes = useStyles();
  const router = useRouter()

  React.useEffect(() => {
    console.log(router.query)
    props.dispatch(selectedActions.setAll(router.query))
  }, []);

  React.useEffect(() => {
    let query = {}
    if(props.selected.q && props.selected.q.trim() !== "")
      query['q'] = props.selected.q.trim()
    if(props.selected.states.length > 0)
      query['states'] = props.selected.states.toString()
    if(props.selected.parties.length > 0)
      query['parties'] = props.selected.parties.toString()
    if(props.selected.education.length > 0)
      query['education'] = props.selected.education.toString()
    if(props.selected.marital.length > 0)
      query['marital'] = props.selected.marital.toString()
    if(props.selected.sort)
      query['sort'] = props.selected.sort
    if(props.selected.genders[0] !== 'all')
      query['genders'] = props.selected.genders[0]
    if(props.selected.age[0] !== 25 && props.selected.age[1] !== 100){
      query['minAge'] = props.selected.age[0]
      query['maxAge'] = props.selected.age[1]
    }
    Router.push({
      pathname: '/search',
      query: query, 
      shallow: true
    });
  }, [props.selected])

  const [sort, setSort]= React.useState("popular")
  return (
      <Grid container xl spacing={2}>
        <Grid item xs={2}>
          <div>
            <SelectedFilters/>
            <CheckBoxFilter 
              limit={5}
              search
              show
              heading={"State"}
              list={props.filters.states}
              setFunc={"addState"}
              type="states"
            />
            <CheckBoxFilter 
              limit={5}
              search
              show
              heading={"Party"}
              list={props.filters.parties}
              setFunc={"addParty"}
              type="parties"
            />
            <CheckBoxFilter
              limit={props.filters.education.length}
              heading={"Education"}
              list={props.filters.education}
              setFunc={"addEducation"}
              type="education"
            />
            <SliderFilter
              heading={"Age"} 
            />
            <CheckBoxFilter
              limit={props.filters.genders.length}
              heading={"Gender"}
              list={props.filters.genders}
              setFunc={"setGender"}
              type="genders"
            />
            <CheckBoxFilter
              limit={props.filters.marital.length} 
              heading={"Marital"}
              list={props.filters.marital}
              setFunc={"addMarital"}
              type="marital"
            />
          </div>
        </Grid>
        <Grid item xs={10}>
          <Card>
            <CardHeader 
              title="Questions" 
              action={
                <Select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  displayEmpty
                  disableUnderline={true}
                  name="sorting"
                >
                  <MenuItem value={"popular"}>Popular</MenuItem>
                  <MenuItem value={"new"}>New</MenuItem>
                  <MenuItem value={"alphabetical"}>Subject</MenuItem>
                </Select>
              }
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
}

const mapStateToProps = state => ({
  filters: state.filters,
  selected: state.selected
});

export default connect(mapStateToProps)(SearchPage);