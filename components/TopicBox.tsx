import React from 'react';
import Link from 'next/link';
import { TypeCheckBoxFilter } from '../types';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      height: 250
    },
    cover: {
      height: 150
    }
  })
);

const TopicBox = ({ topic }: { topic: TypeCheckBoxFilter }): JSX.Element => {
  const classes = useStyles();
  const { id, name } = topic;
  return (
    <Card className={classes.card}>
      <Link href={`/search?topic=${id}`}>
        <a className="link">
          <CardMedia
            className={classes.cover}
            image="/static/images/live-from-space.jpg"
            title="Live from space album cover"
          />
          <CardContent>
            <Typography color="textPrimary" component="h6" variant="h6">
              {name}
            </Typography>
          </CardContent>
        </a>
      </Link>
    </Card>
  );
};

export default TopicBox;
