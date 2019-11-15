import Link from 'next/link'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import QuestionBox from '../../components/QuestionBox';

const useStyles = makeStyles((theme : Theme) =>
  createStyles({
    marginTopOne: {
      marginTop: theme.spacing(0.7),
    },
    marginBottomOne: {
      marginBottom: theme.spacing(1),
    },
    bg : {
      [theme.breakpoints.up('md')]: {
        backgroundImage : `url(${"/static/images/constituency.png"})`,
        backgroundRepeat : "no-repeat",
        backgroundSize : "100%",
        height : "70vh",
      },
    },
    cardBox : {
      [theme.breakpoints.up('md')]: {
        backgroundColor : "black",
        color : "#fff",
        opacity : 0.3,
        width : "20%",
        margin : theme.spacing(2,0,0,2)
      },
    },
    table: {
      minWidth: 650,
    },
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    flexDisplay : {
      display : 'flex',
      alignItems : 'center',
    },
    paddingOnLeft : {
      paddingLeft: theme.spacing(1)
    },
    link : {
      textDecoration : 'none',
      color : "inherit"
    }
  }),
);


const constituencyPages = () => {
  const classes = useStyles();

  function createData(photo : string, name :string, party : string, from : number , to : number | string ){
    return { photo, name , party, from , to }
  }
  const rows = [
    createData('https://material-ui.com/static/images/avatar/1.jpg', "MP Full Name" , "Party name" , 2019 , "present"),
    createData('https://material-ui.com/static/images/avatar/2.jpg', "MP Full Name" , "Party name" , 2014 , 2019),
    createData('https://material-ui.com/static/images/avatar/3.jpg', "MP Full Name" , "Party name" , 2009 , 2014),
    createData('https://material-ui.com/static/images/avatar/4.jpg', "MP Full Name" , "Party name" , 2004 , 2009),
    createData('https://material-ui.com/static/images/avatar/5.jpg', "MP Full Name" , "Party name" , 1999 , 2004),
    createData('https://material-ui.com/static/images/avatar/6.jpg', "MP Full Name" , "Party name" , 1994 , 1999),
  ];
  return (
    <div >
      <Card className={classes.bg}>
        <CardContent className={classes.cardBox}>
            <Typography>
              Name : Guntur
            </Typography>
            <Typography>
              State : Andhra Pradesh
            </Typography>
            <Typography>
              Pincodes : 500072
            </Typography>
            <Typography>
              From : 1951
            </Typography>
            <Typography>
              To : present
            </Typography>
            <Typography>
              No .of terms : 17
            </Typography>
            <Typography>
              No .of terms : 17
            </Typography>
        </CardContent>
      </Card>
      <Card className={classes.marginTopOne}>
        <CardHeader
          title = "List of all MP's"
        />
        <CardContent className={classes.root}>
          <Table className={classes.table} aria-label="list of MP's">
            <TableHead>
              <TableRow>
                <TableCell >Name</TableCell>
                <TableCell >Party</TableCell>
                <TableCell >From</TableCell>
                <TableCell >To</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell>
                    <Link href="/members/[mid]" as="/members/1">
                      <a className={classes.link}>
                        <div className={classes.flexDisplay}>
                          <Avatar alt="Mp's image" src={row.photo}/>
                          <div className={classes.paddingOnLeft}>{row.name}</div>
                        </div>
                      </a>  
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href="/parties/[pid]" as="/parties/1">
                      <a className={classes.link}>{row.party}</a>
                    </Link>
                  </TableCell>
                  <TableCell>{row.from}</TableCell>
                  <TableCell>{row.to}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className={classes.marginTopOne}>
        <CardHeader
          title = "Questions"
          action = {
            <Link href = {`/search?states=1`}>
              <Button>
                All Questions
              </Button>
            </Link>
          }
        />
        <CardContent>
          <div className={classes.marginBottomOne}>
            <QuestionBox/>
          </div>
          <div className={classes.marginBottomOne}>
            <QuestionBox/>
          </div>
          <div className={classes.marginBottomOne}>
            <QuestionBox/>
          </div>
          <div>
            <QuestionBox/>
          </div >
        </CardContent>
      </Card>
    </div>
  )
}

export default constituencyPages;

