import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
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
import { getConstituencyById } from '../../store/actions';
import {
  typeConstituencyMember,
  typeConstituencyData,
  typeQuestionData
} from '../../types';
import { AppState } from '../../store/reducers';

interface Props {
  constituency: typeConstituencyData;
  questions: typeQuestionData[];
}
const MapWithNoSSR = dynamic(() => import('../../components/Maps'), {
  ssr: false
});

const useStyles = makeStyles((theme: Theme) => ({
  marginTopOne: {
    marginTop: theme.spacing(0.7)
  },
  marginBottomOne: {
    marginBottom: theme.spacing(1)
  },
  paper: {
    height: '70%'
  },
  cardBox: {
    backgroundColor: 'black',
    opacity: 0.4,
    color: 'white',
    zIndex: 500,
    position: 'absolute',
    top: 200,
    right: 30,
    maxWidth: 300
  },
  table: {
    minWidth: 650
  },
  root: {
    width: '100%',
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
}));

const ConstituencyPages = ({ constituency, questions }: Props) => {
  const classes = useStyles();

  if (!constituency) {
    return <p> loading ...</p>;
  }
  return (
    <div>
      <Paper className={classes.paper}>
        <MapWithNoSSR constituencyId={201} />
      </Paper>
      <Card className={classes.marginTopOne}>
        <CardHeader
          title={`List of all MP's from ${constituency.name} (${constituency.state})`}
        />
        <CardContent className={classes.root}>
          <Table className={classes.table} aria-label="list of MP's">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Party</TableCell>
                <TableCell>House</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {constituency.members.map(
                (member: typeConstituencyMember, index: number) => (
                  <TableRow key={member.MID + index}>
                    <TableCell>
                      <Link href="/members/[mid]" as={`/members/${member.MID}`}>
                        <a className={classes.link}>
                          <div className={classes.flexDisplay}>
                            <Avatar
                              alt="Mp's image"
                              src="/static/images/mp.jpg"
                            />
                            <div className={classes.paddingOnLeft}>
                              {member.name}
                            </div>
                          </div>
                        </a>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href="/parties/[pid]"
                        as={`/parties/${member.terms[0].party.PID}`}
                      >
                        <a className={classes.link}>
                          {member.terms[0].party.name} (
                          {member.terms[0].party.abbr})
                        </a>
                      </Link>
                    </TableCell>
                    <TableCell>
                      {member.terms[0].session}, {member.terms[0].house}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className={classes.marginTopOne}>
        <CardHeader
          title="Questions"
          action={
            <Link href={`/search?states=1`}>
              <Button>All Questions</Button>
            </Link>
          }
        />
        <CardContent>
          {questions ? (
            questions.map((question: typeQuestionData) => (
              <div key={question.QID} className={classes.marginBottomOne}>
                <QuestionBox question={question} />
              </div>
            ))
          ) : (
            <p> No questions </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

ConstituencyPages.getInitialProps = async ({ store, query }: any) => {
  if (!store.getState().constituencies[+query.cid])
    await store.dispatch(getConstituencyById(+query.cid));
};

const mapStateToProps = (state: AppState, props: any) => {
  const constituency = state.constituencies[props.router.query.cid];
  return {
    constituency: constituency,
    questions:
      constituency && constituency.popularQuestionIds
        ? constituency.popularQuestionIds.map(
            (each: number) => state.questions[each]
          )
        : []
  };
};

export default withRouter(connect(mapStateToProps)(ConstituencyPages));
