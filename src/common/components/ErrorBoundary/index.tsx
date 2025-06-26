import React, {ReactNode} from 'react';
import ErrorFallBack from './componetns/ErrorFallBack';

export type Props = {
  children: Exclude<NonNullable<ReactNode>, string | number | boolean>;
  onError?: (error: Error, stackTrace: string) => void;
};

type State = {error: Error | null};

class ErrorBoundary extends React.Component<Props, State> {
  state: State = {error: null};

  componentDidCatch(error: Error, info: {componentStack: string}) {
    if (typeof this.props.onError === 'function') {
      this.props.onError(error, info.componentStack);
    }
  }
  static getDerivedStateFromError(error: Error): State {
    return {error};
  }

  resetError: () => void = () => {
    this.setState({error: null});
  };

  render() {
    return this.state.error ? (
      <ErrorFallBack error={this.state.error} resetError={this.resetError} />
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
