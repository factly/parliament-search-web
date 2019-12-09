import React from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link'
import { makeStyles, Theme } from '@material-ui/core/styles';
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
import Paper from '@material-ui/core/Paper';
import Spinner from '../../components/Spinner';
import { getConstituencyById } from '../../store/apollo';
import { typeConstituencyMember } from '../../types';
import { AppState } from '../../store/reducers';

const MapWithNoSSR = dynamic(() => import('../../components/Maps'), {
  ssr: false,
  loading: () => <Spinner/>
});

const useStyles = makeStyles((theme: Theme) =>({
  marginTopOne: {
    marginTop: theme.spacing(0.7),
  },
  marginBottomOne: {
    marginBottom: theme.spacing(1),
  },
  paper:{
    height : '70%'
  },
  cardBox : {
    backgroundColor : 'black',
    opacity : 0.4,
    color: 'white',
    zIndex: 500,
    position: 'absolute',
    top: 200,
    right: 30,
    maxWidth: 300,
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

const constituencyPages = ({dispatch , constituencies , questions}: any) => {
  const cid:number = +(useRouter().query.cid);
  const constituency = constituencies[cid];
  const classes = useStyles();
  React.useEffect(()=>{
    if(!constituency)
      dispatch(getConstituencyById(cid));
  });

  if(!constituency){
    return <Spinner/>
  }
  else{
    return (
      <div >
        <Paper className={classes.paper} >
          <MapWithNoSSR constituencyId={201}/>
        </Paper>
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
                  <TableCell >Session</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {constituency.members.map((member: typeConstituencyMember) => (
                  <TableRow key={member.MID}>
                    <TableCell>
                      <Link href="/members/[mid]" as={`/members/${member.MID}`}>
                        <a className={classes.link}>
                          <div className={classes.flexDisplay}>
                            <Avatar alt="Mp's image" src='/static/images/mp.jpg' />
                            <div className={classes.paddingOnLeft}>{member.name}</div>
                          </div>
                        </a>  
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href="/parties/[pid]" as={`/parties/${member.terms[0].party.PID}`}>
                        <a className={classes.link}>{member.terms[0].party.name}</a>
                      </Link>
                    </TableCell>
                    <TableCell>{member.terms[0].session}</TableCell>
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
            { 
              constituency.popularQuestionIds.length > 0 ? constituency.popularQuestionIds
                .map((each: number) => 
                  <div className={classes.marginBottomOne}>
                    <QuestionBox question={questions[each]} />
                  </div>)
              : <p> No questions </p> 
            }
          </CardContent>
        </Card>
      </div>
    )
  }  
};

const mapStateToProps = (state: AppState) => ({
  constituencies : state.constituencies,
  questions : state.questions
});

export default connect(mapStateToProps)(constituencyPages);

