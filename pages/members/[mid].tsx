import { makeStyles, createStyles , Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import QuestionBox from '../../components/QuestionBox';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Link from 'next/link';

function createData(house : string, constituency : string , party : string, from : number , to : string | number ){
  return {house, constituency , party, from , to}
};

const rows = [
  createData('Lok Sabha', 'Hyderabad' , 'TRS' , 2019 , "present"),
  createData('Lok Sabha', 'Hyderabad' , 'TRS' , 2014 , 2019),
  createData('Lok Sabha', 'Hyderabad' , 'TRS' , 2009 , 2004),
 ];

const useStyles = makeStyles((theme : Theme) =>
  createStyles({
    img : {
      margin : theme.spacing(2),
      width: '80%',
      height: '80%',
    },
    table: {
      minWidth: 650,
    },
    marginTopOne : {
      marginTop : theme.spacing(0.7)
    },
    marginBottomOne : {
      marginBottom : theme.spacing(1.5)
    },
    link : {
      textDecoration : 'none',
      color : "inherit"
    }
  }),
);


const membersPage = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid >
        <Card>
          <CardHeader
            title= "Ajay Kumar"
          />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item md={2}>
                <Avatar alt="Mp's image" src="/static/images/mp.jpg" className={classes.img}/>
              </Grid>
              <Grid item md={8}>
                <Typography>
                  Gender : Male
                </Typography>
                <Typography>
                  Birthplace : Hyderabad 
                </Typography>
                <Typography>
                  Birthdate : 26-01-1989 
                </Typography>
                <Typography>
                  Marital Status : Married 
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Card className={classes.marginTopOne}>
        <CardHeader
          title = "Overview"
        />
        <CardContent>
          <Table className={classes.table} aria-label="MP's terms">
            <TableHead>
              <TableRow>
                <TableCell >House</TableCell>
                <TableCell >Constituency</TableCell>
                <TableCell >Party</TableCell>
                <TableCell >From</TableCell>
                <TableCell >To</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.from}>
                  <TableCell>
                    <Link href="/houses/[hid]" as="/houses/1">
                      <a className={classes.link}>{row.house}</a>  
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href="/constituencies/[cid]" as={`/constituencies/${201}`}>
                      <a className={classes.link}>{row.constituency}</a>
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
          title = "Popular Questions"
          action = {
            <Link href={`/search`}>
              <Button>
                All Questions
              </Button>
            </Link>
          }
        />
        <CardContent>
          <div className={classes.marginBottomOne}>
            <QuestionBox />
          </div>
          <div className={classes.marginBottomOne}>
            <QuestionBox />
          </div>
          <div className={classes.marginBottomOne}>
            <QuestionBox />
          </div>
          <div className={classes.marginBottomOne}>
            <QuestionBox />
          </div>
          <div className={classes.marginBottomOne}>
            <QuestionBox />
          </div>
          <div className={classes.marginBottomOne}>
            <QuestionBox />
          </div>
          <div className={classes.marginBottomOne}>
            <QuestionBox />
          </div>
          <div className={classes.marginBottomOne}>
            <QuestionBox />
          </div>
        </CardContent>  
      </Card>
    </div>
  )
}

export default membersPage;