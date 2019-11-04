import { useRouter } from 'next/router';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import QuestionBox from '../../components/QuestionBox';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) =>
  createStyles({
    marginBottomOne: {
      marginBottom: theme.spacing(3),
    },
    img : {
      margin : theme.spacing(0.5),
      width: '80%',
      height: '80%',
    },
  }),
);


const constituencyPages = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8} md={9} lg={9} xl={10}>
          <Card>
            <CardHeader
              title = "Recent Questions from Constituency"
            />
            <CardContent>
              <div>
                <QuestionBox/>
              </div>
              <div>
                <QuestionBox/>
              </div>
              <div>
                <QuestionBox/>
              </div>
              <div>
                <QuestionBox/>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8} md={9} lg={3} xl={10}>
          <Card className={classes.marginBottomOne}>
            <CardContent>
              <CardHeader
                title = "Constituency"
              />
              <Typography>
                Name : Hyderabad
              </Typography>
              <Typography>
                State : Telangana
              </Typography>
              <Typography>
                Pincodes : 500072
              </Typography>
              <Typography>
                from : 1951
              </Typography>
              <Typography>
                to : ---
              </Typography>
              <Typography>
                No .of terms : 17
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader
              title = "Member of Parliament"
            />
            <CardContent>
              <Grid container spacing={1}>
                <Grid md={4}>
                  <Avatar alt="Mp's image" src="/static/images/mp.jpg" className={classes.img}/>
                </Grid>
                <Grid md={8}>
                  <Typography>
                    Name : Ajay
                  </Typography>
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
                  <Typography>
                    No. of Questions : 76
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default constituencyPages;


