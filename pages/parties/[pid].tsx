import * as React from 'react';
import { useRouter } from 'next/router';
import {connect} from 'react-redux';
import Link from 'next/link'
import { makeStyles , createStyles, Theme } from '@material-ui/core/styles';
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
import { getPartyById } from '../../store/apollo';
import { typePartyMember, typeTermConstituency } from '../../types';
import { AppState } from '../../store/reducers';

const useStyles = makeStyles( (theme : Theme ) => 
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    table: {
      minWidth: 500,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    flexDisplay : {
      display : 'flex',
      alignItems : 'center'
    },
    paddingOnLeft : {
      paddingLeft: theme.spacing(1)
    },
    link : {
      textDecoration : 'none',
      color : 'inherit'
    }
}));

const partiesPage = ({dispatch, parties }:any ) => {
  const pid:number = +(useRouter().query.pid);
  let party = parties[pid];
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  React.useEffect(() => {
    if(!party){
      dispatch(getPartyById(pid));
    }
  })
  if(!party){
    return <div>Loading ....</div>  }
  else {
  return (
   <Card>
     <CardHeader
       title = {party.name}
     />
     <CardContent>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell >Name</TableCell>
            <TableCell >No. of terms</TableCell>
            <TableCell >Constituency</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {party.members.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((member: typePartyMember) => (
            <TableRow key={member.name}>
              <TableCell>
                <Link href="/members/[mid]" as={`/members/${member.MID}`} >
                  <a className={classes.link}>
                    <div className={classes.flexDisplay}>
                      <Avatar alt="Mp's image" src={'https://material-ui.com/static/images/avatar/1.jpg'}/>
                      <div className={classes.paddingOnLeft}>{member.name}</div>
                    </div>
                  </a>  
                </Link>
              </TableCell>
              <TableCell >{member.terms.map((each:typeTermConstituency) => each.constituency).length}</TableCell>
              <TableCell ><Link href="/constituencies/[cid]" as={`/constituencies/${member.terms[0].constituency.CID}`}><a className={classes.link}>{member.terms[0].constituency.name}</a></Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={party.members.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'previous page',
              }}
              nextIconButtonProps={{
                'aria-label': 'next page',
              }}
              onChangePage={(event, newPage: number) => setPage(newPage)}
              onChangeRowsPerPage={(event) => {setRowsPerPage(parseInt(event.target.value, 10));setPage(0);}}
            />
          </TableRow>
        </TableFooter>
      </Table>
     </CardContent>
   </Card>
  )
}}

const mapStateToProps = (state:AppState) => ({
  parties : state.parties
})
export default connect(mapStateToProps)(partiesPage);