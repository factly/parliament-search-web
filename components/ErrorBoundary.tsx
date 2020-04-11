import React from 'react';
import ErrorBox from './ErrorBox';

type Props = {
  children: JSX.Element;
};

type State = {
  hasError: boolean;
};
export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render(): JSX.Element {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorBox error="GRAPHQL_ERROR" />;
    }

    return this.props.children;
  }
}
