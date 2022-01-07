import React,{ useState, useEffect } from 'react'

export default function ThreadReplies(props) {
  const { subscribers } =  props.message;

  const [threadCount, setThreadCount] = useState(1);

 useEffect(() => {
    setThreadCount(props.thread.length ? props.thread.length : 1)
    if(props.socket){
        
     props.socket.on('thread_reply', (thread) => {
         if (thread[0].messageId === props.msgId) {
             setThreadCount(thread.length)
         }
     })
    }
 }, [])
  return (
      <div className="message__reply_bar">
          {subscribers.map((subscriber,i) => {
            if(i <= 4){
return (
    <div key={ subscriber.image } className="thread_message_reply_user_image">
        <img height="24" width="24" role="img" src={ subscriber.image } />
    </div>
)
            }
              
          })}
          <a className="thread_link" onClick={ props.showThread }>
              {threadCount} {threadCount <= 1 ? 'reply' : 'replies'}
          </a>
          <div class="c-message__reply_bar_description">
              <span class="c-message__reply_bar_last_reply"></span>
          </div>
      </div>
  )
}
