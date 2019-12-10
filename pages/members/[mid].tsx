import React from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { getMemberById } from '../../store/apollo';
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
import { typeMemberTerms, typeMemberObject, typeQuestionObject } from '../../types';
import { AppState } from '../../store/reducers';

interface Props{
  dispatch : any, 
  members : typeMemberObject, 
  questions : typeQuestionObject
}
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


const MembersPage = ({dispatch, members, questions} : Props) => {
  
  const mid:number = +(useRouter().query.mid);
  let member = members[mid];
  
  const classes = useStyles();
  React.useEffect(() => {
    if(!member)
      dispatch(getMemberById(mid))
  });

  if(!member){
    return (<div>loading...</div>)
  }
  else{
    return (
      <div>
        <Grid >
          <Card>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item md={2}>
                  <Avatar alt="Mp's image" src="/static/images/mp.jpg" className={classes.img}/>
                </Grid>
                <Grid item md={8}>
                  <Grid>
                    <Typography variant="h5">
                      {member.name}
                    </Typography>
                  </Grid>
                  <Grid container direction="row"   justify="space-between">
                    <Grid>
                      <Typography>
                        Gender : {member.gender}
                      </Typography>
                      <Typography>
                        Birthplace : {member.birth_place ? member.birth_place : 'Not available'} 
                      </Typography>
                      <Typography>
                        Birthdate : {member.dob? member.dob : 'Not available'}
                      </Typography>
                      <Typography>
                        Marital Status : {member.marital_status ? member.marital_status : 'Not available'} 
                      </Typography>
                      <Typography>
                        E-mail : {member.email ? member.email.join(", ") : 'Not available'} 
                      </Typography>
                      <Typography>
                        Phone number : { member.phone && member.phone.length > 0 ? member.phone.join(", ") : 'Not available'} 
                      </Typography>
                    </Grid>
                    <Grid>
                      <Typography>
                        Education : {member.education ? member.education : 'Not available'}
                      </Typography>
                      <Typography>
                        Expertise : {member.expertise && member.expertise.length > 0 ? member.expertise.join(", ") : 'Not available'} 
                      </Typography>
                      <Typography>
                        Profession : {member.profession && member.profession.length > 0? member.profession.join(", ") : 'Not available'}
                      </Typography>
                    </Grid>
                  </Grid>
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
                  <TableCell >Constituency</TableCell>
                  <TableCell >Party</TableCell>
                  <TableCell >House</TableCell>
                  <TableCell >Session</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { member.terms && member.terms.map((term: typeMemberTerms) => (
                  <TableRow key={term.party.name}>
                    <TableCell>
                      <Link href="/constituencies/[cid]" as={`/constituencies/${term.constituency.CID}`}>
                        <a className={classes.link}>{term.constituency.name}</a>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href="/parties/[pid]" as={`/parties/${term.party.PID}`}>
                        <a className={classes.link}>{term.party.name}</a>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href="/houses/[hid]" as="/houses/1">
                        <a className={classes.link}>{term.house}</a>  
                      </Link>
                    </TableCell>
                    <TableCell>{term.session}</TableCell>
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
            { 
              member.popularQuestionIds && member.popularQuestionIds.length > 0 ? member.popularQuestionIds
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
}
const mapStateToProps = (state:AppState) => ({
  members : state.members,
  questions: state.questions
})
export default connect(mapStateToProps)(MembersPage);