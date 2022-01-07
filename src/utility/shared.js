import { isFuture, isPast,isToday } from 'date-fns';
import { formatToTimeZone } from 'date-fns-timezone'

export const randomNumber = function (length) {
     const chars =
         '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHUJKLMNOPQRSTUVWXYZ'
     let result = ''
     for (let i = 0; i < length; i += 1) {
         result += chars.charAt(Math.floor(Math.random() * chars.length))
     }
     return Number(result);
}

export const randomString = (length)  => {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHUJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < length; i += 1) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
}

export const updateObject = (oldObject, UpdatedProperties) => {
    return {
        ...oldObject,
        ...UpdatedProperties
    }
}

export const checkValidity = (value,rules) => {

    let isValid = true;

// add other rules
if(rules.isEmail){
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
}

if(rules.minLength){
    isValid = value.length >= rules.minLength && isValid;
}

if(rules.maxlength){
    isValid = value.length <= rules.maxlength && isValid;
}
if(rules.isFutureDate){
    isValid = isFuture(new Date(value)) && isValid;
}

if(!rules.isPastDate){
    if(isToday(new Date(value))){
        isValid = true;
    } else{
        isValid = !isPast(new Date(value)) && isValid;
    }
}
if (rules.notwhitespace) {
    isValid = !value.includes(' ') && isValid
}

if(rules.url){
      var pattern = new RegExp(
          '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
              '(\\#[-a-z\\d_]*)?$',
          'i'
      ) // fragment locator
      isValid = !!pattern.test(value) && isValid;
}

if (rules.required) {
    isValid = value.trim() !== '' && isValid
}
return isValid;

}

export const resolvePromise = (promise) => {
    return promise.then(data => data).catch(error => error);
}

export function trimString(string, newlength, suffix) {
    const trimmedString =
        string.length > newlength
            ? string.substring(0, newlength) + String(suffix)
            : string
    return trimmedString
}

export const convertToReadableDateFormat = (UTC,format,specifiedTimeZone) => {
    const usersTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

     const dateTime = new Date(UTC)
     const dtime = formatToTimeZone(
         dateTime,
         format ? format : 'Do MMMM YYYY - h:mm A',
         {
             timeZone: specifiedTimeZone ? specifiedTimeZone : usersTimeZone,
         }
     )
     return dtime;
}

export const copyToClipboard = (text) => {
    navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
        if (result.state === 'granted' || result.state === 'prompt') {
  navigator.clipboard.writeText(text).then(
      function () {
          alert('Copied To Clipboard');
          /* clipboard successfully set */
      },
      function () {
          /* clipboard write failed */
      }
  )
          }
    })
}