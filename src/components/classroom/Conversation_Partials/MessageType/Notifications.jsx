/** @format */

import React, { useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

function Text(props) {
      useLayoutEffect(() => {
          var objDiv = document.getElementById('fala')
          objDiv.scrollTop = objDiv.scrollHeight
      }, [])

    if (props.message.for === props.user) {
                    return (
                        <div
                            className="message_extra"
                            id={ props.message.msgId }>
                            You
                            {props.message.type === 'sLeft'
                                ? ' left'
                                : ' Joined'}
                        </div>
                    )
                }
                return (
                    <div
                        className="message_extra"
                        id={ props.message.msgId }>
                        {props.message.name}
                        {props.message.type === 'sLeft' ? ' left' : ' Joined'}
                    </div>
                )
}

Text.propTypes = {
    message: PropTypes.any.isRequired,
}

export default Text
