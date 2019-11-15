import * as React from 'react';
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

function createData(photo: string, name: string, terms: number , constituency: string) {
  return { photo, name, terms , constituency };
}

const rows = [
  createData('https://material-ui.com/static/images/avatar/1.jpg', "MP Full Name" , 1, "Constituency name" ),
  createData('https://material-ui.com/static/images/avatar/2.jpg', "MP Full Name" , 3,"Constituency name1, Constituency name2" ), 
  createData('https://material-ui.com/static/images/avatar/3.jpg', "MP Full Name" , 2,"Constituency name" ),
  createData('https://material-ui.com/static/images/avatar/4.jpg', "MP Full Name" , 1,"Constituency name" ),
  createData('https://material-ui.com/static/images/avatar/5.jpg', "MP Full Name" , 1,"Constituency name, Constituency name2" ),
  createData('https://material-ui.com/static/images/avatar/1.jpg', "MP Full Name" , 1,"Constituency name" ),
  createData('https://material-ui.com/static/images/avatar/2.jpg', "MP Full Name" , 1,"Constituency name1, Constituency name2" ), 
  createData('https://material-ui.com/static/images/avatar/3.jpg', "MP Full Name" , 2,"Constituency name" ),
  createData('https://material-ui.com/static/images/avatar/4.jpg', "MP Full Name" , 4,"Constituency name" ),
  createData('https://material-ui.com/static/images/avatar/5.jpg', "MP Full Name" , 1,"Constituency name, Constituency name2" ),
];

const partiesPage = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows:number = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
  return (
   <Card>
     <CardHeader
       title = "Party Name"
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
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
            <TableRow key={row.name}>
              <TableCell>
                <Link href="/members/[mid]" as="/members/1" >
                  <a className={classes.link}>
                    <div className={classes.flexDisplay}>
                      <Avatar alt="Mp's image" src={row.photo}/>
                      <div className={classes.paddingOnLeft}>{row.name}</div>
                    </div>
                  </a>  
                </Link>
              </TableCell>
              <TableCell >{row.terms}</TableCell>
              <TableCell >{row.constituency}</TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={rows.length}
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
}

export default partiesPage;