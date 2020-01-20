import React from 'react';
import Link from 'next/link';
import { TypeCheckBoxFilter } from '../types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const TopicBox = ({ topic }: { topic: TypeCheckBoxFilter }): JSX.Element => {
  const { id, name } = topic;
  return (
    <Card className="topicBox">
      <Link href={`/search?topic=${id}`}>
        <a className="link">
          <CardMedia
            className="topicBoxImage"
            image="/static/images/topics.jpg"
            title={name}
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
