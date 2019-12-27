import * as React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CheckBoxFilter from '../../components/CheckBoxFilter';
import AgeFilter from '../../components/AgeFilter';
import QuestionBox from '../../components/QuestionBox';
import { selectedActions, searchPageInitial } from '../../store/actions';
import { AppState } from '../../store/reducers/index';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import {
  TypeFilter,
  TypeQuestionBox,
  TypeSelected,
  TypeMinistries
} from '../../types';
import { getSearchPageQuestions } from '../../store/actions';
import TermsFilter from '../../components/TermsFilter';
import url from 'url';
import SelectedFilters from '../../components/SelectedFilters';

const SearchPage = ({
  dispatch,
  selected,
  questions,
  total,
  filters,
  ministries
}: {
  dispatch: any;
  selected: TypeSelected;
  questions: TypeQuestionBox[];
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
    if (selected.topic && selected.topic.length > 0)
      query.topic = selected.topic;
    if (selected.house && selected.house.length > 0)
      query.house = selected.house;

    const as = url.format({
      pathname: '/search',
      query: query
    });
    Router.push('/search', as, { shallow: true });

    query.ministry = [];

    if (selected.topic && selected.topic.length > 0)
      selected.topic.forEach((each: number) => {
        if (ministries[each])
          query.ministry = query.ministry.concat(ministries[each]);
      });

    if (query.ministry.length === 0) delete query.ministry;

    dispatch(getSearchPageQuestions(query));
  }, [selected]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
        <SelectedFilters
          selected={selected}
          filters={filters}
          dispatch={dispatch}
        />
        <CheckBoxFilter
          limit={5}
          search
          defaultShow
          heading="Topics"
          list={filters.topic}
          toogle={(value): void =>
            dispatch(selectedActions.toogle(value, 'topic'))
          }
          selected={selected.topic}
        />
        <CheckBoxFilter
          limit={5}
          search
          defaultShow
          heading="State"
          list={filters.state}
          toogle={(value): void =>
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
          toogle={(value): void =>
            dispatch(selectedActions.toogle(value, 'party'))
          }
          selected={selected.party}
        />
        <CheckBoxFilter
          limit={filters.house.length}
          heading="House"
          list={filters.house}
          toogle={(value): void =>
            dispatch(selectedActions.toogle(value, 'house'))
          }
          selected={selected.house}
        />
        <CheckBoxFilter
          limit={filters.education.length}
          heading="Education"
          list={filters.education}
          toogle={(value): void =>
            dispatch(selectedActions.toogle(value, 'education'))
          }
          selected={selected.education}
        />
        <AgeFilter
          heading="Age"
          selected={[selected.ageMin, selected.ageMax]}
          toogle={(event, value): void =>
            dispatch(selectedActions.setAge(value as number[]))
          }
        />
        <CheckBoxFilter
          limit={filters.marital.length}
          heading="Marital"
          list={filters.marital}
          toogle={(value): void =>
            dispatch(selectedActions.toogle(value, 'marital'))
          }
          selected={selected.marital}
        />
        <CheckBoxFilter
          limit={filters.gender.length}
          heading="Gender"
          list={filters.gender}
          toogle={(value): void =>
            dispatch(selectedActions.toogle(value, 'gender'))
          }
          selected={selected.gender}
        />
        <TermsFilter
          heading="Terms"
          selected={selected.terms}
          toogle={(event, value): void =>
            dispatch(selectedActions.setTerms(value as number))
          }
        />
      </Grid>
      <Grid item xs={12} sm={4} md={7} lg={7} xl={8}>
        <Card>
          <CardHeader
            title="Questions"
            action={
              <Select
                value={selected.sort}
                onChange={(
                  event: React.ChangeEvent<{ value: unknown }>
                ): void =>
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
          <CardContent>
            <Table>
              <TableBody>
                {questions && questions.length > 0
                  ? questions.map((question: TypeQuestionBox) => (
                      <TableRow key={question.QID}>
                        <TableCell>
                          <QuestionBox question={question} />
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[10]}
                    count={total}
                    rowsPerPage={10}
                    page={total ? selected.page - 1 : 0}
                    onChangePage={(event, newPage: number): void =>
                      dispatch(selectedActions.setPage(newPage + 1))
                    }
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

SearchPage.getInitialProps = async ({ store, query }: any): Promise<void> => {
  if (
    store.getState().filters.state.length > 0 &&
    store.getState().filters.party.length > 0
  ) {
    await store.dispatch(selectedActions.setAll(query));
  } else {
    await store.dispatch(searchPageInitial(query));
  }
};

const mapStateToProps = (
  state: AppState
): {
  selected: TypeSelected;
  questions: TypeQuestionBox[];
  total: number;
  filters: TypeFilter;
  ministries: TypeMinistries;
} => ({
  filters: state.filters,
  selected: state.selected,
  questions: state.search.qids.map((each: number) => state.questions[each]),
  total: state.search.total,
  ministries: state.ministries
});

export default connect(mapStateToProps)(SearchPage);
