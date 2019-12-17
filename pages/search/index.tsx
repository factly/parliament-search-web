import * as React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

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
import { AppState } from '../../store/reducers/index';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';


import {
  AppActions,
  typeSelected,
  typeFilter,
  typeMarks,
  typeQuestionBox,
  typeQuestionObject,
  typeSetAllState
} from '../../types';
import { Dispatch } from 'redux';
import { CardMedia, Typography } from '@material-ui/core';
import {getSearchPageQuestions, getSearchPageQuestionsInti} from '../../store/actions'

interface Iprops {
  dispatch: any;
  selected: typeSetAllState;
  questions : typeQuestionBox[],
  total: number
}
const useStyles = makeStyles((theme: Theme) => ({
  marginBottomOne: {
    marginBottom: theme.spacing(1.5)
  },
  cardSuggestion: {
    marginBottom: theme.spacing(1)
  },
  asked: {
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    cursor: 'pointer'
  },
  suggestion: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardImage: {
    height: 100
  },
  avatar: {
    width: 70,
    height: 70
  }
}));

const SearchPage = ({
  dispatch,
  selected,
  questions,
  total
}: Iprops): JSX.Element => {
  React.useEffect(() => {
    dispatch(getSearchPageQuestions(selected))
  }, [selected]);
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
        
      </Grid>
      <Grid item xs={12} sm={4} md={7} lg={7} xl={8}>
        <Card>
          <CardHeader
            title="Questions"
            action={
              <Select
                value={selected.sort}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
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
                { questions && questions.length > 0 ? 
                questions.map((question : typeQuestionBox) => 
                    <TableRow key={question.QID}>
                      <TableCell>
                        <QuestionBox question={question} />
                      </TableCell>
                    </TableRow> 
                    )
                : null }
              </TableBody>
              <TableFooter>
              <TableRow>
                <TablePagination
                  count={total}
                  rowsPerPage={10}
                  page={selected.page-1}
                  onChangePage={(event, newPage: number) => dispatch(selectedActions.setPage(newPage + 1))}
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

interface StateProps {
  selected: typeSetAllState;
  questions: typeQuestionBox[];
  total: number
}

SearchPage.getInitialProps = async ({ store, query }: any) => {
  await store.dispatch(getSearchPageQuestionsInti(query));
};

const mapStateToProps = (state: AppState): StateProps => ({
  selected: state.selected,
  questions : state.search.qids.map((each: number) => state.questions[each]),
  total: state.search.total
});

export default connect(mapStateToProps)(SearchPage);
