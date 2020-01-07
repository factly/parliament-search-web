import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { getMemberById } from '../../store/actions';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import QuestionBox from '../../components/QuestionBox';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from 'next/link';
import { TypeMemberTerms, TypeMemberData, TypeQuestionData } from '../../types';
import { AppState } from '../../store/reducers';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      margin: theme.spacing(2),
      width: '80%',
      height: '80%'
    },
    marginBottomOne: {
      marginBottom: theme.spacing(1.5)
    },
    list: {
      padding: theme.spacing(0, 1)
    },
    progress: {
      margin: '50%'
    }
  })
);

const MembersPage = ({
  member,
  questions
}: {
  member: TypeMemberData;
  questions: TypeQuestionData[];
}): JSX.Element => {
  const classes = useStyles();

  if (!member)
    return (
      <div className={classes.progress}>
        <CircularProgress />
      </div>
    );

  return (
    <div>
      <Grid>
        <Card>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item md={2}>
                <Avatar
                  alt="Mp's image"
                  src="/static/images/mp.jpg"
                  className={classes.img}
                />
              </Grid>
              <Grid item md={8}>
                <Grid container direction="row" justify="space-between">
                  <Grid>
                    <Typography variant="h5">{member.name}</Typography>
                    <Typography>Gender : {member.gender}</Typography>
                    {member.birthPlace ? (
                      <Typography>Birthplace : {member.birthPlace}</Typography>
                    ) : null}
                    {member.dob ? (
                      <Typography>
                        Age : {moment.unix(+member.dob / 1000).fromNow(true)}
                      </Typography>
                    ) : null}
                    {member.maritalStatus ? (
                      <Typography>
                        Marital Status : {member.maritalStatus}{' '}
                      </Typography>
                    ) : null}
                    {member.education ? (
                      <Typography>Education : {member.education}</Typography>
                    ) : null}
                    {member.profession && member.profession.length > 0 ? (
                      <Typography>
                        Profession : {member.profession.join(', ')}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid>
                    {member.email && member.email.length > 0 ? (
                      <List dense={true} className={classes.list}>
                        <ListSubheader>E-mail</ListSubheader>
                        {member.email.map((each: string, index: number) => (
                          <ListItem key={index}>
                            <a href={`mailto:${each}`} className="link">
                              <ListItemText primary={each} />
                            </a>
                          </ListItem>
                        ))}
                      </List>
                    ) : null}
                    {member.phone && member.phone.length > 0 ? (
                      <List dense={true} className={classes.list}>
                        <ListSubheader>Phone number</ListSubheader>
                        {member.phone.map((each: string, index: number) => (
                          <ListItem key={index}>
                            <ListItemText primary={each} />
                          </ListItem>
                        ))}
                      </List>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Card className="marginTopOne">
        <CardHeader title="Overview" />
        <CardContent>
          <Table className="table" aria-label="MP's terms">
            <TableHead>
              <TableRow>
                <TableCell>Constituency</TableCell>
                <TableCell>Party</TableCell>
                <TableCell>House</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {member.terms &&
                member.terms
                  .filter(
                    (term: TypeMemberTerms) =>
                      term.party && term.geography && term.house && term.session
                  )
                  .map((term: TypeMemberTerms) => (
                    <TableRow key={term.party.name}>
                      <TableCell>
                        <Link
                          href="/geographies/[gid]"
                          as={`/geographies/${term.geography.GID}`}
                        >
                          <a className="link">
                            {term.geography.name} ({term.geography.parent.name})
                          </a>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          href="/parties/[pid]"
                          as={`/parties/${term.party.PID}`}
                        >
                          <a className="link">
                            {term.party.name} ({term.party.abbr})
                          </a>
                        </Link>
                      </TableCell>
                      <TableCell>
                        {term.session}, {term.house.name}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="marginTopOne">
        <CardHeader
          title="Popular Questions"
          action={
            <Link href={`/search?member=${member.MID}`}>
              <Button>All Questions</Button>
            </Link>
          }
        />
        <CardContent>
          {questions ? (
            questions.map((question: TypeQuestionData) => (
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

MembersPage.getInitialProps = async ({ store, query }: any): Promise<void> => {
  if (
    !store.getState().members[+query.mid] ||
    !store.getState().members[+query.mid].maritalStatus
  )
    await store.dispatch(getMemberById(+query.mid));
};
const mapStateToProps = (
  state: AppState,
  props: any
): {
  member: TypeMemberData;
  questions: TypeQuestionData[];
} => {
  const member = state.members[props.router.query.mid];
  return {
    member: member,
    questions: member.popularQuestionIds
      ? member.popularQuestionIds.map((each: number) => state.questions[each])
      : []
  };
};
export default withRouter(connect(mapStateToProps)(MembersPage));
