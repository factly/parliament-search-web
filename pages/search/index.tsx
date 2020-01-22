import * as React from 'react';
import { Store, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ParsedUrlQuery } from 'querystring';
import url from 'url';

import Router from 'next/router';

// import material-ui components
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// import material-ui card components
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

// import material-ui list components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// import material-ui expansion components
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

// import material-ui radio components
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

// import components
import CheckBoxFilter from '../../components/CheckBoxFilter';
import AgeFilter from '../../components/AgeFilter';
import QuestionBox from '../../components/QuestionBox';
import MemberBox from '../../components/MemberBox';
import TermsFilter from '../../components/TermsFilter';
import SelectedFilters from '../../components/SelectedFilters';

// import actions
import {
  selectedActions,
  searchPageInitial,
  getSearchPageResults
} from '../../store/actions';

// import types
import {
  TypeFilter,
  TypeQuestionBox,
  TypeSelected,
  TypeMinistries,
  TypeMemberData,
  TypeSetAll,
  AppState,
  AppActions
} from '../../types';

// import constants
import { selectedConstants, searchConstants } from './../../store/constants';

const SearchPage = ({
  dispatch,
  selected,
  results,
  total,
  filters,
  ministries
}: {
  dispatch: Dispatch<AppActions>;
  selected: TypeSelected;
  results: TypeMemberData[] | TypeQuestionBox[];
  total: number;
  filters: TypeFilter;
  ministries: TypeMinistries;
}): JSX.Element => {
  React.useEffect(() => {
    const query: any = {};
    if (selected.page && selected.page > 1) query.page = selected.page;
    if (selected.sort && selected.sort !== 'newest') query.sort = selected.sort;
    if (selected.q) query.q = selected.q;
    if (selected.gender && selected.gender.length > 0)
      query.gender = selected.gender;
    if (selected.terms && selected.terms > 0) query.terms = selected.terms;
    if (selected.questionBy && selected.questionBy.length > 0)
      query.questionBy = selected.questionBy;
    if (selected.constituency && selected.constituency.length > 0)
      query.constituency = selected.constituency;
    if (selected.party && selected.party.length > 0)
      query.party = selected.party;
    if (selected.state && selected.state.length > 0)
      query.state = selected.state;
    if (selected.education && selected.education.length > 0)
      query.education = selected.education;
    if (selected.marital && selected.marital.length > 0)
      query.maritalStatus = selected.marital;
    if (selected.ageMin && selected.ageMin !== 25)
      query.ageMin = selected.ageMin;
    if (selected.ageMax && selected.ageMax !== 100)
      query.ageMax = selected.ageMax;
    if (selected.topic && selected.topic.length > 0) {
      query.topic = selected.topic;
    }
    if (selected.house && selected.house.length > 0)
      query.house = selected.house;
    if (selected.category && selected.category !== 'questions') {
      query.category = selected.category;
    }
    const as = url.format({
      pathname: '/search',
      query: query
    });
    Router.push('/search', as, { shallow: true });

    query.ministry = [];

    if (query.topic && query.topic.length > 0)
      query.topic.forEach((each: number) => {
        if (ministries[each])
          query.ministry = query.ministry.concat(ministries[each]);
      });
    if (selected.category) query.category = selected.category;
    if (query.ministry.length === 0) delete query.ministry;
    dispatch({
      type: searchConstants.SET_SEARCHPAGE,
      data: { ids: [], total: -1 }
    });
    //total is equal to -1 indicates loading results for selected filters

    (dispatch as ThunkDispatch<AppState, undefined, AppActions>)(
      getSearchPageResults(query)
    );
    window.scrollTo(0, 0);
  }, [selected]);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
        <ExpansionPanel defaultExpanded={true}>
          <ExpansionPanelSummary>
            <Typography variant="h5">Filters</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <RadioGroup
              aria-label="category"
              name="category"
              value={selected.category}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement>
              ): TypeSetAll =>
                dispatch({
                  type: selectedConstants.SET_CATEGORY,
                  data: { category: (event.target as HTMLInputElement).value }
                })
              }
            >
              <FormControlLabel
                value="questions"
                control={<Radio />}
                label="Questions"
              />
              <FormControlLabel
                value="members"
                control={<Radio />}
                label="Members"
              />
            </RadioGroup>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {selected.category === 'questions' ? (
          <CheckBoxFilter
            limit={5}
            search
            defaultShow
            heading="Topics"
            list={filters.topic}
            toogle={(value): TypeSetAll =>
              dispatch(selectedActions.toogle(value, 'topic'))
            }
            selected={selected.topic}
          />
        ) : null}
        <CheckBoxFilter
          limit={5}
          search
          defaultShow
          heading="State"
          list={filters.state}
          toogle={(value): TypeSetAll =>
            dispatch(selectedActions.toogle(value, 'state'))
          }
          selected={selected.state}
        />
        <CheckBoxFilter
          limit={5}
          search
          defaultShow
          heading="Party"
          list={filters.party}
          toogle={(value): TypeSetAll =>
            dispatch(selectedActions.toogle(value, 'party'))
          }
          selected={selected.party}
        />
        <CheckBoxFilter
          limit={filters.house.length}
          heading="House"
          list={filters.house}
          toogle={(value): TypeSetAll =>
            dispatch(selectedActions.toogle(value, 'house'))
          }
          selected={selected.house}
        />
        <CheckBoxFilter
          limit={filters.education.length}
          heading="Education"
          list={filters.education}
          toogle={(value): TypeSetAll =>
            dispatch(selectedActions.toogle(value, 'education'))
          }
          selected={selected.education}
        />
        <AgeFilter
          heading="Age"
          selected={[selected.ageMin, selected.ageMax]}
          toogle={(event, value): TypeSetAll =>
            dispatch(selectedActions.setAge(value as number[]))
          }
        />
        <CheckBoxFilter
          limit={filters.marital.length}
          heading="Marital"
          list={filters.marital}
          toogle={(value): TypeSetAll =>
            dispatch(selectedActions.toogle(value, 'marital'))
          }
          selected={selected.marital}
        />
        <CheckBoxFilter
          limit={filters.gender.length}
          heading="Gender"
          list={filters.gender}
          toogle={(value): TypeSetAll =>
            dispatch(selectedActions.toogle(value, 'gender'))
          }
          selected={selected.gender}
        />
        <TermsFilter
          heading="Terms"
          selected={selected.terms}
          toogle={(event, value): TypeSetAll =>
            dispatch(selectedActions.setTerms(value as number))
          }
        />
      </Grid>
      <Grid item xs={12} sm={4} md={7} lg={7} xl={8}>
        <Card>
          <CardContent>
            <SelectedFilters
              selected={selected}
              filters={filters}
              dispatch={dispatch}
            />
          </CardContent>
          <CardHeader
            title={selected.category.toUpperCase()}
            action={
              <Select
                value={selected.sort}
                onChange={(
                  event: React.ChangeEvent<{ value: unknown }>
                ): TypeSetAll =>
                  dispatch(
                    selectedActions.setSort(event.target.value as string)
                  )
                }
                displayEmpty
                disableUnderline
                name="sorting"
              >
                <MenuItem value="newest">New</MenuItem>
                <MenuItem value="oldest">Old</MenuItem>
              </Select>
            }
          />
          <CardContent className="questionList">
            {results && results.length > 0 ? (
              <div>
                <List>
                  {selected.category === 'questions'
                    ? (results as TypeQuestionBox[]).map(
                        (question: TypeQuestionBox) => (
                          <ListItem key={question.QID}>
                            <QuestionBox question={question} />
                          </ListItem>
                        )
                      )
                    : selected.category === 'members'
                    ? (results as TypeMemberData[]).map(
                        (member: TypeMemberData) => (
                          <ListItem key={member.MID}>
                            <MemberBox member={member} />
                          </ListItem>
                        )
                      )
                    : null}
                </List>
                <TablePagination
                  component="nav"
                  rowsPerPageOptions={[10]}
                  count={total >= 0 ? total : 0}
                  rowsPerPage={10}
                  page={total ? selected.page - 1 : 0}
                  onChangePage={(event, newPage: number): TypeSetAll =>
                    dispatch(selectedActions.setPage(newPage + 1))
                  }
                />
              </div>
            ) : total === -1 ? (
              <div className="progress">
                <CircularProgress />
              </div>
            ) : (
              <div className="notFoundtext">
                <Typography variant="body1">
                  No results found for selected filters
                </Typography>
              </div>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

SearchPage.getInitialProps = async ({
  store,
  query
}: {
  store: Store;
  query: ParsedUrlQuery;
}): Promise<void> => {
  if (
    store.getState().filters.state.length > 0 &&
    store.getState().filters.party.length > 0
  ) {
    await store.dispatch(selectedActions.setAll(query));
  } else {
    await (store.dispatch as ThunkDispatch<AppState, undefined, AppActions>)(
      searchPageInitial(query)
    );
  }
};

const mapStateToProps = (
  state: AppState
): {
  selected: TypeSelected;
  results: TypeMemberData[] | TypeQuestionBox[];
  total: number;
  filters: TypeFilter;
  ministries: TypeMinistries;
} => ({
  filters: state.filters,
  selected: state.selected,
  results:
    state.selected.category === 'members'
      ? state.search.ids
          .filter((each: number) => state.members[each] !== undefined)
          .map((each: number) => state.members[each])
      : state.search.ids
          .filter((each: number) => state.questions[each] !== undefined)
          .map((each: number) => state.questions[each]),
  total: state.search.total,
  ministries: state.ministries
});

export default connect(mapStateToProps)(SearchPage);
