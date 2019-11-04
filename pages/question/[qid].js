// TODO add answer by ministry
import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import ShareIcon from '@material-ui/icons/Share';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles , createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) =>
  createStyles({
    asked: {
      marginRight: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
    }
  }),
);

const questionPage = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8} md={9} lg={9} xl={10}>
          <Card>
            <div>
              <CardHeader
                title = "Government Medical College"
                subheader="26 July, 2019 · Lok Sabha"
                action={
                  <IconButton aria-label="share">
                    <ShareIcon/>
                  </IconButton>
                }
              />
            </div>
            <CardContent>
              <Typography variant="h6">Question</Typography>
              <div >
                <Typography variant="body1">
                  (a) whether the Government proposes/plans to start a Government Medical College in Amravati, Maharashtra;
                </Typography>
                <Typography variant="body1">
                  (b) if so, the details thereof; and
                </Typography>
                <Typography variant="body1">
                  (c) if not, the reasons therefor?
                </Typography>
              </div>
            </CardContent>
            <CardContent>
              <Typography variant="h6">Asked By</Typography>
              <div >
                <Chip className={classes.asked} label="MP Name Full"  avatar={<Avatar src="https://material-ui.com/static/images/avatar/1.jpg" />} />
                <Chip className={classes.asked} label="MP Name Full"  avatar={<Avatar src="https://material-ui.com/static/images/avatar/2.jpg" />} />
                <Chip className={classes.asked} label="MP Name Full"  avatar={<Avatar src="https://material-ui.com/static/images/avatar/3.jpg" />} />
                <Chip className={classes.asked} label="MP Name Full"  avatar={<Avatar src="https://material-ui.com/static/images/avatar/4.jpg" />} />
              </div>
            </CardContent>
            <CardContent>
              <Typography variant="h6">Answer</Typography>
              <Typography variant="body1">
                (a) to (c): As per information provided by Medical Council of India (MCI), the Council
                has not received any proposal / application from the State Government of Maharashtra
                for establishment of new medical college at Amravati, Maharashtra for the academic year
                2020-2021.
                Further, the Government is implementing a Centrally Sponsored Scheme namely
                ‘Establishment of new medical colleges attached with existing district/referral hospitals’
                to increase the availability of doctors in the country. Under the Phase-I of this Scheme,
                one medical college has been approved in Gondia, Maharashtra at a cost of Rs.189 crore
                to be shared between Centre and State in the ratio of 60:40. This medical college has
                become functional. Further, under the Phase-II of the Scheme, an analysis was done to
                ensure the availability of at least one medical college for every 3 Parliamentary
                Constituencies and at least 1 Government Medical College in each State of the country.
                Accordingly, mapping was done and requirement of 24 new medical colleges under
                Phase-II of the Scheme has been identified. Amravati, Maharashtra already has a private
                medical college in the name of Dr. Panjabrao Alias Bhausaheb Deshmukh Memorial
                Medical College and hence it can not be considered under the Scheme.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={3} xl={2}>
          <Card>
            <CardHeader
              title = "Recent Questions to Ministry"
            />
            <CardContent>
              <Typography variant="body1">
                Government Medical College
              </Typography>
              <Typography variant="body1">
                Government Medical College
              </Typography>
              <Typography variant="body1">
                Government Medical College
              </Typography>
              <Typography variant="body1">
                Government Medical College
              </Typography>
            </CardContent>
          </Card>
        </Grid> 
      </Grid>
    </div>            
  );
};

export default questionPage;
