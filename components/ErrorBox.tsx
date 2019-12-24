import React from 'react';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles, Button } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles(() => ({
  error: {
    width: 300,
    margin: 'auto'
  },
  header: {
    backgroundColor: '#d32f2f',
    padding: '8px',
    color: '#ffffff'
  }
}));
const ErrorBox = ({ error }: { error: string }): JSX.Element => {
  const classes = useStyles();
  return (
    <Card className={classes.error}>
      <CardHeader
        avatar={<ErrorIcon />}
        title={<Typography variant="body1">Error</Typography>}
        className={classes.header}
      />
      <CardContent>
        {error === 'INVALID_ID' ? (
          <Typography variant="body1">Resource not found</Typography>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default ErrorBox;
