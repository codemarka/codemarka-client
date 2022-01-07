/* eslint-disable react/prop-types */
/**
 * /* eslint-disable react/prop-types
 *
 * @format
 */

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Switch, withRouter, Route, Redirect } from 'react-router-dom'

import * as actionType from './store/actions/Types'
import * as url from './config/url'

const classrooom = React.lazy(() =>
    import('./containers/classroom/Environment')
)
const newclassroom = React.lazy(() =>
    import('./containers/classroom/NewClassroom')
)
const logout = React.lazy(() => import('./containers/auth/Logout'))
const Home = React.lazy(() => import('./containers/public/Home/Index'))
const Login = React.lazy(() => import('./containers/auth/Login'))
const Register = React.lazy(() => import('./containers/auth/Register'))
const ForgotPassword = React.lazy(() =>
    import('./containers/auth/ForgotPassword')
)
const ChangePassword = React.lazy(() =>
    import('./containers/auth/ChangePassword')
)
const NotFound = React.lazy(() => import('./containers/public/404'))
const About = React.lazy(() => import('./containers/public/About'))
const oauthSuccess = React.lazy(() => import('./containers/auth/OauthSuccess'))
const classPreviewNewTab = React.lazy(() =>
    import('./containers/classroom/classPreviewNewTab')
)
const EmalVerification = React.lazy(() =>
    import('./containers/auth/EmalVerification')
)
const CommunityAccountRegistration = React.lazy(() =>
    import('./containers/auth/Community/index.jsx')
)
const UserEditProfile = React.lazy(() => import('./containers/users/Edit'));
const contactUs = React.lazy(() => import('./containers/public/Contact'))

const ClassRoomPreview = React.lazy(() =>
    import('./containers/classroom/ClassroomPreview')
)
const SingleCommunity = React.lazy(() => import('./containers/community/index'));
const Communities = React.lazy(() => import('./containers/community/all.jsx'));

//blog
const Blog = React.lazy(() => import('./containers/public/Blog'))
const BlogMayRelease = React.lazy(() => import('./containers/public/Blog/BlogMayRelease'))
const BlogJuneRelease = React.lazy(() => import('./containers/public/Blog/BlogJuneRelease'))
const UserProfile = React.lazy(() => import('./containers/users/Profile'));
const ClassNotFound = React.lazy(() => import('./components/classroom/AccessMessages/NotFound'))
const ReportClassroom = React.lazy(() => import('./containers/classroom/Report'));
const ClassroomQuestion = React.lazy(() => import('./containers/classroom/Enquire'));
const PrivacyAndPolicy = React.lazy(() => import('./containers/public/PrivacyAndPolicy'));
const TermsAndConditions = React.lazy(() => import('./containers/public/TermsAndConditions'));
const AuthFinalSteps = React.lazy(() => import('./containers/auth/AuthFinalSteps'));
const ACE = React.lazy(() => import('./containers/classroom/TEST/editor'));

const Routes = (props) => {

    useEffect(() => {
        if (props.location.pathname.includes('logout') === false){
            if (!props.isAutheticated) {
                props.onTryAutoSignIn()
            }
        };
    }, [props]);

    const routes = (
        <Switch>
            <Route exact component={ logout } path={ url.AUTH_LOGOUT } />
            <Route exact component={ Home } path={ url.HOME } />
            <Route exact component={ Blog } path={ url.BLOG } />
            <Route exact component={ Login } path={ url.AUTH_SIGN_IN } />
            <Route exact component={ Register } path={ url.AUTH_SIGN_UP } />
            <Route exact component={ About } path={ url.ABOUT } />
            <Route exact component={ oauthSuccess } path={ url.OAUTH_URL } />
            <Route exact component={ contactUs } path={ url.CONTACT } />
            <Route exact component={ BlogMayRelease } path={ url.MAY_RELEASE } />
            <Route exact component={ BlogJuneRelease } path={ url.JUNE_RELEASE } />
            <Route exact component={ PrivacyAndPolicy } path={ url.PRIVACY_POLICY } />
            <Route exact component={ TermsAndConditions } path={ url.TERMS_AND_CONDITIONS } />
            <Route exact component={ AuthFinalSteps } path={ url.OAUTH_FINAL_STEPS } />
            <Route exact component={ ACE } path="/test/editor" />
            <Route
                exact
                component={ ClassNotFound }
                path={ url.CLASSROOM_NOT_FOUND }
            />
            <Route
                exact
                component={ CommunityAccountRegistration }
                path={ url.COMMUNITY_ACCOUNT_SIGNUP_PAGE }
            />
            <Route
                exact
                component={ EmalVerification }
                path={ url.EMAIL_VERIFICATION }
            />
            <Route
                exact
                component={ ForgotPassword }
                path={ url.AUTH_FORGOT_PASSWORD }
            />
            <Route exact component={ ForgotPassword } path={ url.CLASSROOMS } />
            <Redirect from={ url.CLASSROOMS } to={ url.AUTH_SIGN_IN } />
            <Route
                exact
                component={ ClassRoomPreview }
                path={ url.PROTECTED_CLASSROOM_PREVIEW }
            />
            <Route exact component={ classrooom } path={ url.CLASSROOM } />
            <Route
                exact
                component={ classPreviewNewTab }
                path={ url.CLASSROOM_PREVIEW_NEW_TAB }
            />
            <Route
                exact
                component={ ChangePassword }
                path={ url.AUTH_CHANGE_PASSWORD }
            />
            <Route exact component={ classrooom } path={ url.CLASSROOM } />
            <Route
                exact
                component={ SingleCommunity }
                path={ url.ROUTE_COMMUNITY_SINGLE }
            />

            {props.isAutheticated ? (
                <>
                    <Route
                        exact
                        component={ oauthSuccess }
                        path={ url.OAUTH_URL }
                    />
                    <Route
                        exact
                        component={ Communities }
                        path={ url.COMMUNITY_INDEX }
                    />
                    <Route
                        exact
                        component={ ReportClassroom }
                        path={ url.REPORT_CLASSROOM }
                    />
                    <Route exact component={ ClassroomQuestion } path={ url.ASK_A_QUESTION } />
                    <Route
                        exact
                        path={ url.USER_PROFILE_EDIT }
                        component={ UserEditProfile }
                    />
                    <Route
                        exact
                        component={ UserProfile }
                        path={ url.USER_PROFILE + ':username' }
                    />
                    <Route
                        exact
                        component={ ChangePassword }
                        path={ url.AUTH_CHANGE_PASSWORD }
                    />
                    <Route exact component={ logout } path={ url.AUTH_LOGOUT } />
                    <Route
                        exact
                        component={ newclassroom }
                        path={ url.CLASSROOM_NEW }
                    />
                    <Route
                        exact
                        component={ classPreviewNewTab }
                        path={ url.CLASSROOM_PREVIEW_NEW_TAB }
                    />
                </>
            ) : (
                ''
            )}

            <Route component={ NotFound } />
        </Switch>
    )
    return <React.Fragment>{routes}</React.Fragment>
}
const mapStateToProps = (state) => {
    return {
        isAutheticated: state.auth.authenticated !== false,
    }
}

const matchDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignIn: () => dispatch({ type: actionType.AUTO_AUTH_INIT }),
    }
}

export default withRouter(
    connect(mapStateToProps, matchDispatchToProps)(Routes)
)
