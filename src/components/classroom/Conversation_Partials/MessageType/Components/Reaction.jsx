import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

 function Reaction({ data, user, messageid, match, socket }) {
     const userReacted = data.subscribers.find((sub) => sub === user)
     const addReactionToMessage = () => {
         const emoji = data.emojiObject
         socket.emit(
             'add_reaction_to_message',
             emoji,
             messageid,
             match.params.classroom,
             user
         )
     }
     return (
         <button
             onClick={ addReactionToMessage }
             className={ `c-button-unstyled c-reaction c-reaction--light ${
                 userReacted ? 'c-reaction--reacted' : ''
             }` }
             data-qa="reactji"
             type="button">
             <img
                 src={ `https://github.githubassets.com/images/icons/emoji/unicode/${ data.emojiObject.unified }.png` }
                 aria-label="blush emoji"
                 alt={ `:${ data.emojiObject.id } ${ data.emojiObject.native } :` }
                 className="c-emoji c-emoji__small"
                 data-qa="emoji"
                 data-stringify-type="emoji"
                 data-stringify-emoji={ `:${ data.emojiObject.id } ${ data.emojiObject.native } :` }
             />
             <span class="c-reaction__count">{data.count}</span>
         </button>
     )
 }

const mapStateToProps = ({ classroom }) => {
    return {
        socket: classroom.socket
    }
}

export default withRouter(
    connect(mapStateToProps, null)(Reaction)
)
