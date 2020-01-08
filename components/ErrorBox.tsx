import React from 'react';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';

const ErrorBox = ({ error }: { error: string }): JSX.Element => {
  return (
    <Card className="errorBoxCard">
      <CardHeader
        avatar={<ErrorIcon />}
        title={<Typography variant="body1">Error</Typography>}
        className="errorBoxHeader"
      />
      <CardContent>
        {error === 'INVALID_ID' ? (
          <Typography variant="body1">Resource not found</Typography>
        ) : null}
        {error === 'NETWORK_ERROR' ? (
          <Typography variant="body1">Network error</Typography>
        ) : null}
        {error === 'GRAPHQL_ERROR' ? (
          <Typography variant="body1">Internal server error</Typography>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default ErrorBox;
