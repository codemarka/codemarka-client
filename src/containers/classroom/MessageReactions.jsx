/** @format */

import React, { useState, useLayoutEffect } from 'react'
import { Picker } from 'emoji-mart'
import './css/reactions.css';

function MessageReactions(props) {
    const [display, setDisplay] = useState('none')
    const onEmojiClick = (emojiObject) => {
        props.socket.emit('addReactionToMessage',emojiObject, props.messageThread)
    }

     const clickedOutside = (e) => {
         if (e.target.id === 'message_reaction_picker') {
             props.hideMessageReactionPicker(false)
         }
     }

     useLayoutEffect(() => {
        if(props.messageReaction){
            props.messageReaction.isShowing
                ? setDisplay('block')
                : setDisplay('none')
        } 
     }, [props.messageReaction])

    return (
        <div
            style={ { display } }
            id="message_reaction_picker"
            onClick={ clickedOutside }
            className="picker-message picker-container">
            <Picker
                autoFocus
                theme="auto"
                title=""
                onFocusOut={ (e) => setDisplay('none') }
                onSelect={ onEmojiClick }
            />
        </div>
    )
}

export default MessageReactions
