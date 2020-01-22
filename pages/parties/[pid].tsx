import * as React from 'react';
import { Store, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ParsedUrlQuery } from 'querystring';

import { withRouter, SingletonRouter } from 'next/router';
import Link from 'next/link';

// import material-ui components
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

// import material-ui table components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

// import material-ui card components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

// import party actions
import { getPartyById, getPartyMembers } from '../../store/actions';

// import types
import {
  TypePartyMember,
  TypePartyData,
  AppState,
  AppActions
} from '../../types';

const PartiesPage = ({
  dispatch,
  party
}: {
  dispatch: Dispatch<AppActions>;
  party: TypePartyData;
}): JSX.Element => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    if (
      party &&
      party.members.length !== party.total &&
      party.members.length < (page + 1) * rowsPerPage
    ) {
      const required: number =
        (page + 1) * rowsPerPage < party.total
          ? (page + 1) * rowsPerPage - party.members.length
          : party.total - page * rowsPerPage;
      (dispatch as ThunkDispatch<AppState, undefined, AppActions>)(
        getPartyMembers(party.PID, rowsPerPage, page + 1, required)
      );
    }
    window.scrollTo(0, 0);
  }, [page, rowsPerPage]);
  if (!party) {
    return (
      <div className="progress">
        <CircularProgress />
      </div>
    );
  }
  return (
    <Card>
      <CardHeader title={`${party.name} (${party.abbr})`} />
      <CardContent>
        {party.total === 0 ? (
          <div className="notFoundtext">
            <Typography variant="body1">
              No members from {party.name}
            </Typography>
          </div>
        ) : party.members[page * rowsPerPage] ? (
          <Table className="table" aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>No. of terms</TableCell>
                <TableCell>Constituency</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {party.members
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((member: TypePartyMember) => (
                  <TableRow key={member.MID}>
                    <TableCell>
                      <Link href="/members/[mid]" as={`/members/${member.MID}`}>
                        <a className="link">
                          <div className="flexDisplay">
                            <Avatar
                              alt="Mp's image"
                              src={`/static/images/${member.gender.toLowerCase()}.png`}
                            />
                            <div className="paddingOnLeft">{member.name}</div>
                          </div>
                        </a>
                      </Link>
                    </TableCell>
                    <TableCell>{member.terms.length}</TableCell>
                    <TableCell>
                      <Link
                        href="/geographies/[gid]"
                        as={`/geographies/${member.terms[0].geography.GID}`}
                      >
                        <a className="link">
                          {member.terms[0].geography.name},{' '}
                          {member.terms[0].geography.parent.name}
                        </a>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20]}
                  count={party.total}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'previous page'
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'next page'
                  }}
                  onChangePage={(event, newPage: number): void =>
                    setPage(newPage)
                  }
                  onChangeRowsPerPage={(event): void => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <div className="progress">
            <CircularProgress />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

PartiesPage.getInitialProps = async ({
  store,
  query
}: {
  store: Store<AppState>;
  query: ParsedUrlQuery;
}): Promise<void> => {
  const pid = +(query.pid as string);
  if (!store.getState().parties[pid])
    await (store.dispatch as ThunkDispatch<AppState, undefined, AppActions>)(
      getPartyById(pid)
    );
};

const mapStateToProps = (
  state: AppState,
  props: {
    router: SingletonRouter;
  }
): {
  party: TypePartyData;
} => ({
  party: state.parties[+(props.router.query.pid as string)]
});
export default withRouter(connect(mapStateToProps)(PartiesPage));
