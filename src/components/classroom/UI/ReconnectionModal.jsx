import React from 'react'
import './index.css';

export default function ReconnectionModal(props) {
  
  const { show, attemptNumber, failed } = props

  return (
      <div
          style={ { display: show && attemptNumber > 10 || failed ? 'flex' : 'none' } }
          className="codemarka-reconnecting">
          {failed  ? (<div>
              💔 Re-connection TimedOut, check your internet connection.
          </div>) : <React.Fragment>
              
              <div className="spinner-border text-success mb-2" role="status">
                  <span className="sr-only">Loading...</span>
              </div>
              Attempting to reconnect.. ({attemptNumber || 0} / 30)
          </React.Fragment>}
      </div>
  )
}
