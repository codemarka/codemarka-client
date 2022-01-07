import React from 'react'
import Reaction from './Reaction';

export default function Reactions({ reactions, user, messageid }) {
    if (reactions && reactions.length > 0)
        return (
            <div className="message_reaction_container">
                {reactions.map((reaction_) => {
                    return (
                        <Reaction
                            messageid={ messageid }
                            data={ reaction_ }
                            user={ user }
                            key={ reaction_.emojiObject.id }
                        />
                    )
                })}
            </div>
        )
    else return <></>
}
