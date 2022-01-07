import {
    SHOW_NOTIFICATION,
} from './Types'

export const showNotification = (payload) => {
    return{
        type: SHOW_NOTIFICATION,
        payload
    }
}
