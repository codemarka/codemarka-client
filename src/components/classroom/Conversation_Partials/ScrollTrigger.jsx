import React from 'react'
import PropTypes from 'prop-types'

export default function ScrollTrigger({ status, goToBottom }) {
    return (
        <React.Fragment>
            {!status ? (
                <div
                    onClick={ goToBottom }
                    style={ {
                        position: 'relative',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bottom: '15%'
                    } }>
                    <i className="toButtomIcon fa fa-angle-double-down"></i>
                </div>
            ) : (
                ''
            )}
        </React.Fragment>
    )
}

ScrollTrigger.propTypes = {
    status: PropTypes.bool.isRequired,
}
