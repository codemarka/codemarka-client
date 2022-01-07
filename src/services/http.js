import Axios from 'axios';

export default function HttpService(){
  const token = window.localStorage.getItem('wx1298')
  const userkid = window.localStorage.getItem('u342345')

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ token }`
  }

  return {
    GET: function(url){
        return Axios.get(url,{headers}).then(response => {
            return response;
        }).catch(err => {
           throw err;
        });
    },
    POST: function(url,data){
      return Axios.post(url,data,{headers}).then(response => {
        return response;
      }).catch(err => {
        throw err;
      })
    }
  }  
}
