import React from 'react';
import { connect } from 'react-redux';
import { withRouter, SingletonRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
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
import { getGeographyById } from '../../store/actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  TypeGeographyMember,
  TypeGeographyData,
  TypeQuestionData,
  AppState,
  AppActions
} from '../../types';
import { Store } from 'redux';
import { ParsedUrlQuery } from 'querystring';
import { ThunkDispatch } from 'redux-thunk';

const MapWithNoSSR = dynamic(() => import('../../components/Maps'), {
  ssr: false
});

const GeographyPage = ({
  geography,
  questions
}: {
  geography: TypeGeographyData;
  questions: TypeQuestionData[];
}): JSX.Element => {
  if (!geography) {
    return (
      <div className="progress">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div>
      <Card>
        <CardHeader title={geography.name} />
        {/* {geography.type === 'constituency' ? (
          <CardContent className="map">
            <MapWithNoSSR geographyId={geography.GID} />
          </CardContent>
        ) : null} */}
      </Card>
      <Card className="marginTopOne">
        <CardHeader
          title={`MP's from ${geography.name} (${geography.parent.name})`}
        />
        <CardContent>
          <Table className="table" aria-label="list of MP's">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Party</TableCell>
                <TableCell>House</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {geography.members.map(
                (member: TypeGeographyMember, index: number) => (
                  <TableRow key={member.MID + index}>
                    <TableCell>
                      <Link href="/members/[mid]" as={`/members/${member.MID}`}>
                        <a className="link">
                          <div className="flexDisplay">
                            <Avatar
                              alt="Mp's image"
                              src="/static/images/mp.jpg"
                            />
                            <div className="paddingOnLeft">{member.name}</div>
                          </div>
                        </a>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href="/parties/[pid]"
                        as={`/parties/${member.terms[0].party.PID}`}
                      >
                        <a className="link">
                          {member.terms[0].party.name} (
                          {member.terms[0].party.abbr})
                        </a>
                      </Link>
                    </TableCell>
                    <TableCell>
                      {member.terms[0].session}, {member.terms[0].house.name}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="marginTopOne">
        <CardHeader
          title="Questions"
          action={
            <Link href={`/search?constituency=${geography.GID}`}>
              <Button>All Questions</Button>
            </Link>
          }
        />
        <CardContent>
          {questions ? (
            questions.map((question: TypeQuestionData) => (
              <div key={question.QID} className="marginBottomOne">
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

GeographyPage.getInitialProps = async ({
  store,
  query
}: {
  store: Store<AppState>;
  query: ParsedUrlQuery;
}): Promise<void> => {
  const gid = +(query.gid as string);
  if (!store.getState().geographies[gid])
    await (store.dispatch as ThunkDispatch<AppState, undefined, AppActions>)(
      getGeographyById(gid)
    );
};

const mapStateToProps = (
  state: AppState,
  props: {
    router: SingletonRouter;
  }
): { geography: TypeGeographyData; questions: TypeQuestionData[] } => {
  const geography = state.geographies[+(props.router.query.gid as string)];
  return {
    geography: geography,
    questions:
      geography && geography.popularQuestionIds
        ? geography.popularQuestionIds.map(
            (each: number) => state.questions[each]
          )
        : []
  };
};

export default withRouter(connect(mapStateToProps)(GeographyPage));
