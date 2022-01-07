import React from 'react';
import failedImg from '../../media/images/vectors/rush-14.png';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, info) {
      // You can also log the error to an error reporting service
    //   logErrorToMyService(error, info);
      console.error(error)
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
            <div
                style={ { height: '100vh' } }
                className="text-dark pt-7 text-center justify-content-center">
                <div className="m-auto">
                    <h1 className="text-dark">Heads Up!</h1>
                    <p className="p-3 text-dark">
                        {' '}
                        <span className="text-dark">
                            Something went wrong, it's not you. Try refreshing, it 
                            might scratch the itch.{' '}
                        </span>
                        <br />
                        return{' '}
                        <a
                            href="/"
                            className="text-dark text-uppercase font-weight-bold">
                            Home
                        </a>
                    </p>
                    <hr className="divider" />
                    <div className="m-3">
                        <img
                            style={ { height: '300px' } }
                            src={ failedImg }
                            alt="failed"
                            className="img-fluid"
                        />
                    </div>
                </div>
            </div>
        )
      }
  
      return this.props.children; 
    }
  }