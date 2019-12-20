import React from 'react';
import Link from 'next/link';
import { TypeId } from '../types';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

interface Props {
  topic: TypeId;
  ministries: string[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      height: 250
    },
    cover: {
      height: 150
    }
  })
);

const QuestionBox = ({ topic, ministries }: Props) => {
  const classes = useStyles();
  const { id, name } = topic;
  return (
    <Link href={`/search?topic=${id}`}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image="/static/images/live-from-space.jpg"
          title="Live from space album cover"
        />
        <CardContent>
          <Typography component="h6" variant="h6">
            {name}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {ministries.join(', ')}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default QuestionBox;
