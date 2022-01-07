const host =
    process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'
        ? process.env.REACT_APP_REMOTE_API_URL
        : process.env.REACT_APP_LOCAL_API_URL

export const CLASSROOM_VERIFY_URL = `${ host }classroom/verify/`;
export const CLASSROOM_CREATE = `${ host }classroom/create`;
export const CLASSROOM_FILE_DOWNLOAD = `${ host }classroom/download/`;

export const USER_SIGN_UP = `${ host }auth/user/signup`;
export const USER_SIGN_IN = `${ host }auth/user/signin`;
export const AUTO_LOGIN_USER = `${ host }auth/user/token/verify`;
export const ACCOUNT_RECOVERY =  `${ host }auth/user/account/recovery`;
export const ACCOUNT_PASSWORD_RESET = `${ host }auth/user/account/password/reset`;
export const GET_USER_DATA = `${ host }user/u/` //:kid
export const FOLLOW_USER = `${ host }user/follow/`;
export const UNFOLLOW_USER = `${ host }user/unfollow/`  
export const CHECK_USERNAME = `${ host }user/username`;
export const UPDATE_USER_INFORMATION = `${ host }auth/user/profile/update`
export const FORCE_ROOM_ENTRANCE =  `${ host }classroom/socket/disconnect`;
export const VERIFY_FINAL_STEPS_TOKEN = `${ host }auth/user/oauth/verify/` //:token
export const COMPLETE_ACCOUNT_OAUTH_SETUP =  `${ host }auth/user/oauth/complete/`
export const FIND_USER_BY_EMAIL_OR_USERNAME = `${ host }user/find/`; // :emailOrUsername

// Oauth

export const GITHUB_AUTH_URL = `${ host }auth/github`;
export const GOOGLE_AUTH_URL = `${ host }auth/google`;

//community creation
export const COMMUNITY_ACCOUNT_CREATE_INFO_TEMP = `${ host }community/auth/create/info/temp`;
export const COMMUNITY_ACCOUNT_CREATE_CONTACT_INFO_TEMP = `${ host }community/auth/create/contactInfo/temp`
export const COMMUNITY_ACCOUNT_CREATE_LOGO_TEMP = `${ host }community/auth/create/logo/temp`
export const COMMUNITY_ACCOUNT_CREATE_SOCIAL_MEDIA_INFO_TEMP = `${ host }community/auth/create/socialInfo/temp`
export const COMMUNITY_ACCOUNT_CREATE_ORGANIZERS_TEMP = `${ host }community/auth/create/organizers/temp`
export const COMMUNITY_ACCOUNT_CREATE_FINAL = `${ host }community/auth/create/final`;

//community
export const GET_COMMUNITIES = `${ host }community/`;
export const GET_SINGLE_COMMUNITY = `${ host }community/`; //:kid param
export const RATE_COMMUNITY = `${ host }community/rate/`; //:kid param
export const JOIN_COMMUNITY = `${ host }community/membership/join/` //:kid param
export const LEAVE_COMMUNITY = `${ host }community/membership/join/` //:kid param
export const GET_CLASSROOMS_BY_COMMUNITY = `${ host }community/classrooms/` //:kid param
export const GET_UPCOMING_CLASS_SESSIONS = `${ host }community/upcoming/`; //:kid param
export const GET_LIVE_CLASS_SESSIONS = `${ host }community/live/`; //:kid

//classrooms
export const GET_UPCOMING_CLASSRROM_SESSIONS = `${ host }classroom/upcoming/`; //:kid param
export const DOWNLOAD_CLASSROOM_ATTENDANCE = `${ host }classroom/attendance/download`
export const GET_CLASSROOM_CSS_SETTINGS =  `${ host }classroom/settings/language/css`//:classroomkid param
export const GET_CLASSROOM_JS_SETTINGS =  `${ host }classroom/settings/language/js`//:classroomkid param
export const GET_CLASSROOM_HTML_SETTINGS =  `${ host }classroom/language/settings/html`//:classroomkid param
export const REPORT_CLASSROOM = `${ host }classroom/report`
export const ASK_A_QUESTION = `${ host }classroom/question`
export const FETCH_MESSAGE_THREAD =  `${ host }classroom/thread/` // :kid
export const FETCH_EDITOR_CONTRIBUTORS = `${ host }classroom/editor/contributors/` //
export const INVITE_USER_AS_EDITOR_COLLABORATOR = `${ host }classroom/editor/collaborator/invite/` // :