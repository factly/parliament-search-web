import React from 'react';
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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

const useStyles = makeStyles(theme => ({
  eachFilter: {
    borderBottomWidth: 1,
    borderBottomColor: "#5e5b61"
  },
  paddingOne: {
    padding: theme.spacing(1),
  },
}));

const HomePage = (props) => {
  const classes = useStyles();
  
  const [sort, setSort]= React.useState("popular")
  return (
      <Grid container xl spacing={2}>
        <Grid item xs={2}>
          <Paper>
            <div className={classes.eachFilter}>
              <SelectedFilters/>
            </div>
            <Divider />
            <div className={classes.eachFilter}>
              <CheckBoxFilter 
                limit={5}
                search
                show
                heading={"State"}
                list={props.filters.states}
                setFunc={"addState"}
                type="states"
              />
            </div>
            <Divider />
            <div className={classes.eachFilter}>
              <CheckBoxFilter 
                limit={5}
                search
                show
                heading={"Party"}
                list={props.filters.parties}
                setFunc={"addParty"}
                type="parties"
              />
            </div>
            <Divider />
            <div className={classes.eachFilter}>
              <CheckBoxFilter
                limit={props.filters.education.length}
                heading={"Education"}
                list={props.filters.education}
                setFunc={"addEducation"}
                type="education"
              />
            </div>
            <Divider />
            <div className={classes.eachFilter}>
              <SliderFilter
                heading={"Age"} 
              />
            </div>
            <Divider />
            <div className={classes.eachFilter}>
              <CheckBoxFilter
                limit={props.filters.genders.length}
                heading={"Gender"}
                list={props.filters.genders}
                setFunc={"setGender"}
                type="genders"
              />
            </div>
            <Divider />
            <div className={classes.eachFilter}>
              <CheckBoxFilter
                limit={props.filters.marital.length} 
                heading={"Marital"}
                list={props.filters.marital}
                setFunc={"addMarital"}
                type="marital"
              />
            </div>
          </Paper>
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
  filters: state.filters
});

export default connect(mapStateToProps)(HomePage);