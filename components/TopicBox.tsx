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
    },
    link: {
      pointer: 'cursor',
      textDecoration: 'none'
    }
  })
);

const QuestionBox = ({
  topic,
  ministries
}: {
  topic: TypeCheckBoxFilter;
  ministries: string[];
}): JSX.Element => {
  const classes = useStyles();
  const { id, name } = topic;
  return (
    <Card className={classes.card}>
      <Link href={`/search?topic=${id}`}>
        <a className={classes.link}>
          <CardMedia
            className={classes.cover}
            image="/static/images/live-from-space.jpg"
            title="Live from space album cover"
          />
        </a>
      </Link>
      <CardContent>
        <Link href={`/search?topic=${id}`}>
          <a className={classes.link}>
            <Typography color="textPrimary" component="h6" variant="h6">
              {name}
            </Typography>
          </a>
        </Link>
        <Typography variant="caption" color="textSecondary">
          {ministries.join(', ')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default QuestionBox;
