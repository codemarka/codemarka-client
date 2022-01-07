/** @format */

import React, { useState,useEffect } from 'react'
import { Picker } from 'emoji-mart'
import './style.css'
const EmojiPicker = (props) => {
    const [displaying, setdisplaying] = useState('none')

    useEffect(() => {
       setdisplaying(props.shouldDisplay ? 'block' : 'none')
    }, [props.shouldDisplay])

    const onEmojiClick = (emojiObject) => {
        props.handleInputChange(emojiObject)
    }

    const clickedOutside = (e) => {
        if(e.target.id === 'picker-message picker-container'){
            props.setdisplaying('none')
        }
    }

    return (
        <div
            className="picker-message picker-container"
            id="picker-message picker-container"
            onClick={ clickedOutside }
            style={ { display: displaying } }>
            <Picker
                autoFocus
                theme="auto"
                title=""
                onSelect={ onEmojiClick }
                emojiTooltip
                disableSearchBar={ true }
            />
        </div>
    )
}

export default EmojiPicker;