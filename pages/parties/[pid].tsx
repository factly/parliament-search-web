import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { getPartyById, getPartyMembers } from '../../store/actions';
import { TypePartyMembe, TypePartyData } from '../../types';
import { AppState } from '../../store/reducers';

interface Props {
  dispatch: any;
  party: TypePartyData;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3)
    },
    table: {
      minWidth: 500
    },
    tableWrapper: {
      overflowX: 'auto'
    },
    flexDisplay: {
      display: 'flex',
      alignItems: 'center'
    },
    paddingOnLeft: {
      paddingLeft: theme.spacing(1)
    },
    link: {
      textDecoration: 'none',
      color: 'inherit'
    }
  })
);

const PartiesPage = ({ dispatch, party }: Props) => {
  const classes = useStyles();
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
      dispatch(getPartyMembers(party.PID, rowsPerPage, page + 1, required));
    }
  }, [page, rowsPerPage]);
  if (!party) {
    return <div>Loading ....</div>;
  }
  return (
    <Card>
      <CardHeader title={`${party.name} (${party.abbr})`} />
      <CardContent>
        <Table className={classes.table} aria-label="custom pagination table">
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
              .map((member: TypePartyMembe) => (
                <TableRow key={member.MID}>
                  <TableCell>
                    <Link href="/members/[mid]" as={`/members/${member.MID}`}>
                      <a className={classes.link}>
                        <div className={classes.flexDisplay}>
                          <Avatar
                            alt="Mp's image"
                            src={
                              'https://material-ui.com/static/images/avatar/1.jpg'
                            }
                          />
                          <div className={classes.paddingOnLeft}>
                            {member.name}
                          </div>
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
                      <a className={classes.link}>
                        {member.terms[0].geography.name},
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
                onChangePage={(event, newPage: number) => setPage(newPage)}
                onChangeRowsPerPage={event => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

PartiesPage.getInitialProps = async ({ store, query }: any) => {
  if (!store.getState().parties[+query.pid])
    await store.dispatch(getPartyById(+query.pid));
};

const mapStateToProps = (state: AppState, props: any) => ({
  party: state.parties[+props.router.query.pid]
});
export default withRouter(connect(mapStateToProps)(PartiesPage));
