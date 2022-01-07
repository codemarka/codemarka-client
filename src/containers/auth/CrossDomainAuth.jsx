import React,{ useEffect} from 'react'

export default function CrossDomainAuth() {
  function messageHandler(event) {
    
 const domains = [
  'https://www.domain1.com',
  'https://www.domaine2.com',
  'http://localhost:3006'
]
window.addEventListener('message', messageHandler, false);
function messageHandler(event) {
  if (!domains.includes(event.origin))
    return;
  const { action, key, value } = event.data
  if (action == 'save'){
    window.localStorage.setItem(key, JSON.stringify(value))
  } else if (action == 'get') {
    event.source.postMessage({
      action: 'returnData',
      key,
      d: JSON.parse(window.localStorage.getItem(key))
    }, '*')
  }
}
}
  useEffect(() => {
    window.addEventListener('message', messageHandler, false)
  }, [])
  return (
      <div>
          ok
      </div>
  )
}
