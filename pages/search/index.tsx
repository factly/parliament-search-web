import * as React from 'react';
import { connect } from 'react-redux';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
//import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CheckBoxFilter from '../../components/CheckBoxFilter';
import SliderFilter from '../../components/SliderFilter';
import SelectedFilters from '../../components/SelectedFilters';
import QuestionBox from '../../components/QuestionBox';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { selectedActions } from '../../store/actions';
import {AppState} from '../../store/reducers/index';
import {AppActions, typeSelected, typeFilter, typeMarks, typeQuestionBox} from '../../types';
import { Dispatch } from 'redux';
import { CardMedia, Typography } from '@material-ui/core';

interface Iprops{
  dispatch : Dispatch<AppActions>;
  selected: typeSelected;
  filters : typeFilter;
  marks : typeMarks
}
const useStyles = makeStyles((theme : Theme) => ({
    marginBottomOne : {
      marginBottom : theme.spacing(1.5)
    },
    cardSuggestion: {
      marginBottom : theme.spacing(1),
    },
    asked: {
      marginRight: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
      cursor: 'pointer'
    },
    suggestion : {
      display : 'flex',
      flexDirection : 'row',
      justifyContent : 'space-between'
    },
    cardImage : {
      height : 100
    },
    avatar : {
      width: 70,
      height : 70
    }
  }),
);

const SearchPage  = ({ dispatch, selected, filters, marks }: Iprops):JSX.Element => {
  const router = useRouter();
  const classes = useStyles();
  const question:typeQuestionBox = {
    QID : 106062,
    subject : "Government Hospitals in Delhi",
    questionBy : [
      {
        MID : 4758,
        name : "Shri Parvesh Sahib Singh"
      }
    ],
    ministry : "HEALTH AND FAMILY WELFARE",
    date : "2019-06-21",
    type : "starred"
  }
  React.useEffect(() => {
    
    const { age , q, states , education , parties , sort , marital, terms, gender, type } = router.query;
    const querySelected:any = { age : age , q : q, states:  states, education : education , parties : parties , sort : sort ,marital : marital, terms : terms, gender : gender, type :  type};
    let state = {age : [ 0, 0 ], q : '' , states: [0] , education: [0] , parties : [0], sort: '' , marital : [0], terms : 1 , gender : [0] , type : [0]};
    if(age && age.length === 2) state.age =  querySelected.age.map((value: string) => parseInt(value))
    if(education && education.length === 2) state.education = querySelected.education.map((value:string) => parseInt(value))
    if(states && states.length === 2) state.states = querySelected.states.map((value:string) => parseInt(value))
    if(marital && marital.length === 2) state.marital = querySelected.marital.map((value:string) => parseInt(value))
    if(parties && parties.length === 2) state.parties = querySelected.parties.map((value:string) => parseInt(value))
    if(gender && gender.length === 2) state.gender = querySelected.gender.map((value:string) => parseInt(value))
    if(type && type.length === 2) state.type = querySelected.type.map((value:string) => parseInt(value))
    if(q) state.q = querySelected.q;
    if(sort) state.sort = querySelected.sort;
    if(terms) state.terms = parseInt(querySelected.terms);
  
    dispatch(selectedActions.setAll(state));
  }, []);

  React.useEffect(() => {
    const {age, education, states, marital, parties ,q , sort , terms , type, gender} = selected;
    const querySelected:any = {};
    if(age && age.length === 2  ) 
      {
      if( age[0] && age[1] && age[1] - age[0] !== 75 )
      querySelected.age = age.map((value:number):number => value);
    }
    if(education && education.length > 0) querySelected.education = education && education.length > 0 ? education.map((value:number) => `${value}`) : undefined;
    if(states && states.length > 0) querySelected.states = states.map((value:number) => `${value}`);
    if(marital && marital.length > 0) querySelected.marital = marital.map((value:number) => `${value}`);
    if(parties && parties.length > 0) querySelected.parties = parties.map((value:number) => `${value}`);
    if(sort !== 'popular') querySelected.sort = sort;
    if(q) querySelected.q = q;
    if(terms !== 1) querySelected.terms = terms;
    if(type && type.length >0 ) querySelected.type = type.map((value:number) => value) ;
    if(gender && gender.length >0 ) querySelected.gender = gender.map((value:number) => `${value}`) ;
    Router.push({
      pathname: '/search',
      query: {...querySelected},
    });
  }, [selected]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
        <div>
          <SelectedFilters selected={selected} filters={filters} dispatch={dispatch} />
          <CheckBoxFilter
            limit={2}
            heading="Type"
            list={filters.type}
            toogle={(value:number) => dispatch(selectedActions.toogle(value, 'type'))}
            selected={selected.type}
          />
          <CheckBoxFilter
            limit={5}
            search
            defaultShow
            heading="State"
            list={filters.states}
            toogle={(value:number) => dispatch(selectedActions.toogle(value, 'states'))}
            selected={selected.states}
          />
          <CheckBoxFilter
            limit={5}
            search
            defaultShow
            heading="Party"
            list={filters.parties}
            toogle={(value:number) => dispatch(selectedActions.toogle(value, 'parties'))}
            selected={selected.parties}
          />
          <SliderFilter
            heading="Terms"
            marks = {marks.marksTerm}
            selected={selected.terms}
            toogle={(event, value) => dispatch(selectedActions.setTerms(value))}
          />
          <CheckBoxFilter
            limit={filters.education.length}
            heading="Education"
            list={filters.education}
            toogle={(value: number) => dispatch(selectedActions.toogle(value, 'education'))}
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
            toogle={(value:number) => dispatch(selectedActions.toogle(value, 'gender'))}
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
      <Grid item xs={12} sm={4} md={7} lg={7} xl={8}>
        <div className={classes.suggestion}>
        <Card className={classes.cardSuggestion} >
          <CardMedia 
            className ={classes.cardImage}
            image={'/static/images/mp.jpg'}
            title= {'Mp full name'}
          />
          <CardContent className={classes.cardSuggestion} >
            <Link>
              <a>Mp Full Name</a>
            </Link>
          </CardContent>
        </Card>
        <Card className={classes.cardSuggestion} >
          <CardMedia 
            className ={classes.cardImage}
            image={'/static/images/mp.jpg'}
            title= {'Mp full name'}
          />
          <CardContent>
            <Link>
              <a>Mp Full Name</a>
            </Link>
          </CardContent>
        </Card>
        <Card className={classes.cardSuggestion} >
          <CardMedia 
            className ={classes.cardImage}
            image={'/static/images/mp.jpg'}
            title= {'Mp full name'}
          />
          <CardContent>
            <Link>
              <a>Mp Full Name</a>
            </Link>
          </CardContent>
        </Card>
        <Card className={classes.cardSuggestion} >
          <CardMedia 
            className ={classes.cardImage}
            image={'/static/images/mp.jpg'}
            title= {'Mp full name'}
          />
          <CardContent>
            <Link>
              <a>Mp Full Name</a>
            </Link>
          </CardContent>
        </Card>
        <Card className={classes.cardSuggestion} >
          <CardMedia 
            className ={classes.cardImage}
            image={'/static/images/mp.jpg'}
            title= {'Mp full name'}
          />
          <CardContent>
            <Link>
              <a>Mp Full Name</a>
            </Link>
          </CardContent>
        </Card>
        </div>
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
              <QuestionBox question={question}/>
            </div>
            <div className={classes.marginBottomOne}>
              <QuestionBox question={question}/>
            </div>
            <div className={classes.marginBottomOne}>
              <QuestionBox question={question}/>
            </div>
            <div className={classes.marginBottomOne}>
              <QuestionBox question={question}/>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4} md={3} lg={3} xl={2}>
        <Card>
          <CardHeader
            title = "MP Full Name"
            subheader="Hyderabad, Telangana"
            avatar = {
              <Avatar
                src={'/static/images/mp.jpg'}
                  className= {classes.avatar}
              />
            }
          />
          <CardContent>
            <Typography>
              Party : Telangana Rashtra Samithi
            </Typography>
            <Typography>
             Education : 
            </Typography>
            <Typography>
             Profession :
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
/*
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
*/
interface StateProps{
  filters: typeFilter;
  selected: typeSelected;
  marks: typeMarks
};

const mapStateToProps = (state: AppState): StateProps => ({
  filters: state.filters,
  selected: state.selected,
  marks : state.marks
});

export default connect(mapStateToProps)(SearchPage);
