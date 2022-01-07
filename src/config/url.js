//app pages
export const HOME = '/';
export const BLOG = '/blog';
export const VERSION2 = '/public/blog/version-2-launched';
export const ABOUT = '/public/about-us';
export const CONTACT = '/public/contact-us';
export const TERMS_AND_CONDITIONS = '/terms-and-conditions';
export const PRIVACY_POLICY = '/privacy-and-policy';
export const OAUTH_FAILED = '/auth/oauth/error';

//classroom
export const CLASSROOMS = '/classrooms/locale/all'
export const JOIN_CLASSROOM = '/classrooms/join/:classroom'
export const CLASSROOM = '/c/classroom/:classroom'
export const CLASSROOM_NEW = '/classroom/create'
export const PROTECTED_CLASSROOM_PREVIEW = '/c/classroom/setup/:classroomKid'
export const CLASSROOM_PREVIEW_NEW_TAB = '/c/classroom/preview/:classroomKid';
export const CLASSROOM_NOT_FOUND = '/error/classroom/not-found'
export const REPORT_CLASSROOM = '/classroom/report/:kid';
export const ASK_A_QUESTION = '/classroom/question/:kid';
export const CLASSROOM_QUESTIONS = '/classroom/questions/view/:kid'

// Authentication
export const AUTH_SIGN_IN  = '/auth/signin';
export const AUTH_SIGN_UP  = '/auth/signup';
export const AUTH_FORGOT_PASSWORD = '/auth/account/recovery';
export const AUTH_CHANGE_PASSWORD = '/auth/user/account/password/reset/:token/:user';
export const AUTH_LOGOUT  = '/auth/user/logout';
export const OAUTH_URL = '/auth/user/oauth/success/:token/:user'
export const EMAIL_VERIFICATION = '/account/confirmed/:verified/'
export const COMMUNITY_ACCOUNT_SIGNUP_PAGE = '/auth/signup/community'
export const OAUTH_FINAL_STEPS = '/auth/account/user/finalSteps/:auth_setup_token/:user_kid'

export const ACCOUNT_SETTINGS = '/user/account/settings'
export const ACCOUNT_BILLING = '/user/account/billing'
export const USER_PROFILE = '/u/' //:username
export const USER_PROFILE_EDIT = '/u/profile/edit'
export const COMMUNITY_DASHBOARD = '/community/dashboard/:kid'
export const COMMUNITY_INDEX =  '/communities/'
export const COMMUNITY_SINGLE = '/community/'

//app routes
export const ROUTE_COMMUNITY_SINGLE = '/community/:kid'

export const CROSS_DOMAIN_AUTH = '/auth/crossdomain'

//blog
export const MAY_RELEASE = '/blog/v1.1/may/2020'
export const JUNE_RELEASE = '/blog/v1.2/june/2020'