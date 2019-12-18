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
import Link from 'next/link';
import { typeMemberTerms, typeMemberData, typeQuestionData } from '../../types';
import { AppState } from '../../store/reducers';
import moment from 'moment';

interface Props {
  member: typeMemberData;
  questions: typeQuestionData[];
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      margin: theme.spacing(2),
      width: '80%',
      height: '80%'
    },
    table: {
      minWidth: 650
    },
    marginTopOne: {
      marginTop: theme.spacing(0.7)
    },
    marginBottomOne: {
      marginBottom: theme.spacing(1.5)
    },
    link: {
      textDecoration: 'none',
      color: 'inherit'
    }
  })
);

const MembersPage = ({ member, questions }: Props) => {
  const classes = useStyles();

  if (!member) return <div>loading...</div>;

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
                <Grid>
                  <Typography variant="h5">{member.name}</Typography>
                </Grid>
                <Grid container direction="row" justify="space-between">
                  <Grid>
                    <Typography>Gender : {member.gender}</Typography>
                    {member.birth_place ? (
                      <Typography>
                        {' '}
                        Birthplace : {member.birth_place}
                      </Typography>
                    ) : null}
                    {member.dob ? (
                      <Typography>
                        {' '}
                        Age : {moment.unix(+member.dob / 1000).fromNow(true)}
                      </Typography>
                    ) : null}
                    {member.marital_status ? (
                      <Typography>
                        Marital Status : {member.marital_status}{' '}
                      </Typography>
                    ) : null}
                    {member.email && member.email.length > 0 ? (
                      <Typography>
                        E-mail : {member.email.join(', ')}
                      </Typography>
                    ) : null}
                    {member.phone && member.phone.length > 0 ? (
                      <Typography>
                        {' '}
                        Phone number : {member.phone.join(', ')}{' '}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid>
                    {member.education ? (
                      <Typography>Education : {member.education}</Typography>
                    ) : null}
                    {member.profession && member.profession.length > 0 ? (
                      <Typography>
                        {' '}
                        Profession : {member.profession.join(', ')}
                      </Typography>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Card className={classes.marginTopOne}>
        <CardHeader title="Overview" />
        <CardContent>
          <Table className={classes.table} aria-label="MP's terms">
            <TableHead>
              <TableRow>
                <TableCell>Constituency</TableCell>
                <TableCell>Party</TableCell>
                <TableCell>House</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {member.terms &&
                member.terms.map((term: typeMemberTerms) => (
                  <TableRow key={term.party.name}>
                    <TableCell>
                      <Link
                        href="/geographies/[gid]"
                        as={`/geographies/${term.geography.GID}`}
                      >
                        <a className={classes.link}>
                          {term.geography.name} ({term.geography.parent.name})
                        </a>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href="/parties/[pid]"
                        as={`/parties/${term.party.PID}`}
                      >
                        <a className={classes.link}>
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
      <Card className={classes.marginTopOne}>
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

MembersPage.getInitialProps = async ({ store, query }: any) => {
  if (!store.getState().members[+query.mid])
    await store.dispatch(getMemberById(+query.mid));
};
const mapStateToProps = (state: AppState, props: any) => {
  const member = state.members[props.router.query.mid];
  return {
    member: member,
    questions: member.popularQuestionIds
      ? member.popularQuestionIds.map((each: number) => state.questions[each])
      : []
  };
};
export default withRouter(connect(mapStateToProps)(MembersPage));
