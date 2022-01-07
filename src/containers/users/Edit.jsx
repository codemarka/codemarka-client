/* eslint-disable no-undef */
/** @format */

import React,{ useEffect, useState} from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as API_URL from '../../config/api_url'
import { useSelector } from 'react-redux'
import DashboardTab from '../../components/Partials/User/DashboardTab'
import Helmet from '../../components/SEO/helmet'
import countries from '../../utility/country.json';
toast.configure({
    autoClose: 6000,
    draggable: true,
})
export default function EditProfile() {
    const {  auth } = useSelector((state) => state)
    const [profile, setProfile] = useState({})
    const [isSaving,setIsSaving] =  useState(false);

     const jwt = localStorage.getItem('wx1298')

     async function fetch__(url = '', method = 'POST', body) {
         const response = await fetch(url, {
             method, // *GET, POST, PUT, DELETE, etc.
             mode: 'cors', // no-cors, *cors, same-origin
             cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
             credentials: 'same-origin', // include, *same-origin, omit
             headers: {
                 'Content-Type': 'application/json',
                 Authorization: `Bearer ${ jwt }`,
             },
             body: body ?  JSON.stringify(body) : undefined,
             redirect: 'follow', // manual, *follow, error
             referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
         })
         return response.json() // parses JSON response into native JavaScript objects
     }

     useEffect(() => {
        const userInformation = API_URL.GET_USER_DATA + auth.user.displayName

        fetch__(userInformation,'GET').then(data => {
            setProfile(data.data);
        })
     }, [auth.user.token]);

     const updateProfileInformation = (e) => {
            setIsSaving(true)

         const updateUserInformation = API_URL.UPDATE_USER_INFORMATION;

        fetch__(updateUserInformation,'PATCH',{profile:profile.profile,social: profile.social}).then(response => {
            setTimeout(() => {
                 setIsSaving(false)
                 toast.success(<div>Action Successful</div>, {
                     position: 'bottom-center',
                 })
            }, 1500);
           
        }).catch(err => {
            setIsSaving(false)
             toast.error(<div>Action Failed</div>, {
                 position: 'bottom-center',
             })

        })
     }

     const handleInputChage = (e) => {
        setProfile({...profile,profile: {...profile.profile,[e.target.id]: e.target.value}});
     }

     const handleSocialsChange = (e) => {
                 setProfile({
                     ...profile,
                     social: {
                         ...profile.social,
                         [e.target.id]: e.target.value,
                     },
                 })
     }
    return (
        <div className="header-container-fluid">
            <Helmet title="Edit Profile" metaDescription="" />
            <DashboardTab user={ auth }>
                <span class="surtitle">Your account</span>
                <h1 class="h2 mb-0">Settings</h1>
            </DashboardTab>

            <div class="slice slice-sm bg-section-secondary">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-9">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row row-grid align-items-center">
                                                <div class="col-lg-8">
                                                    <div class="media align-items-center">
                                                        <span class="avatar bg-danger text-white rounded-circle mr-3">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="1em"
                                                                height="1em"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                class="feather feather-bell">
                                                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                                                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                                            </svg>
                                                        </span>
                                                        <div class="media-body">
                                                            <h5 class="mb-0">
                                                                Free Account
                                                            </h5>
                                                            <p class="text-muted lh-150 text-sm mb-0">
                                                                Your account
                                                                will auto-renew
                                                                on January 1st,
                                                                2021
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-auto flex-fill mt-4 mt-sm-0 text-sm-right d-none d-lg-block">
                                                    <a
                                                        href="#"
                                                        class="btn btn-sm btn-neutral rounded-pill">
                                                        Manage
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 class="mb-3">
                                            General information
                                        </h5>
                                        <form>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            First name
                                                        </label>{' '}
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            value={
                                                                profile.profile
                                                                    ? profile
                                                                          .profile
                                                                          .firstname
                                                                    : ''
                                                            }
                                                            id="firstname"
                                                            onInput={
                                                                handleInputChage
                                                            }
                                                            placeholder="Enter your first name"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            Last name
                                                        </label>{' '}
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            id="lastname"
                                                            onInput={
                                                                handleInputChage
                                                            }
                                                            value={
                                                                profile.profile
                                                                    ? profile
                                                                          .profile
                                                                          .lastname
                                                                    : ''
                                                            }
                                                            placeholder="Also your last name"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row align-items-center">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            Birthday
                                                        </label>{' '}
                                                        <input
                                                            value={
                                                                profile.profile
                                                                    ? profile
                                                                          .profile
                                                                          .birthday
                                                                    : ''
                                                            }
                                                            onChange={
                                                                handleInputChage
                                                            }
                                                            id="birthday"
                                                            type="date"
                                                            class="form-control"
                                                            placeholder="Select your birth date"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            Gender
                                                        </label>{' '}
                                                        <select
                                                            onChange={
                                                                handleInputChage
                                                            }
                                                            class="custom-select"
                                                            id="gender">
                                                            <option value="0">
                                                                Select option
                                                            </option>
                                                            <option value="1">
                                                                Female
                                                            </option>
                                                            <option value="2">
                                                                Male
                                                            </option>
                                                            <option value="2">
                                                                Rather not say
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            Email
                                                        </label>{' '}
                                                        <input
                                                            class="form-control"
                                                            type="email"
                                                            disabled
                                                            placeholder={
                                                                profile
                                                                    ? profile.email
                                                                    : ''
                                                            }
                                                        />{' '}
                                                        <small class="form-text text-muted mt-2">
                                                            This is the main
                                                            email address that
                                                            we'll send
                                                            notifications.
                                                        </small>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            Phone
                                                        </label>{' '}
                                                        <input
                                                            id="phone"
                                                            onInput={
                                                                handleInputChage
                                                            }
                                                            value={
                                                                profile.profile
                                                                    ? profile
                                                                          .profile
                                                                          .phone
                                                                    : ''
                                                            }
                                                            class="form-control"
                                                            type="text"
                                                            placeholder="+40-777 245 549"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <hr />
                                    <div>
                                        <h5 class="mb-3">
                                            Contact information
                                        </h5>
                                        <form>
                                            <div class="row">
                                                <div class="col-sm-9">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            Address
                                                        </label>{' '}
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            onInput={
                                                                handleInputChage
                                                            }
                                                            id="address"
                                                            value={
                                                                profile.profile
                                                                    ? profile
                                                                          .profile
                                                                          .address
                                                                    : ''
                                                            }
                                                            placeholder="Enter your home address"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-4">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            City
                                                        </label>{' '}
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            id="city"
                                                            onInput={
                                                                handleInputChage
                                                            }
                                                            placeholder="City"
                                                            value={
                                                                profile.profile
                                                                    ? profile
                                                                          .profile
                                                                          .city
                                                                    : ''
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-sm-4">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            Country
                                                        </label>{' '}
                                                        <select
                                                            onChange={
                                                                handleInputChage
                                                            }
                                                            id="country"
                                                            class="form-control"
                                                            title="Country">
                                                            {countries.map(
                                                                (country) => {
                                                                    return (
                                                                        <option
                                                                            value={
                                                                                country.code
                                                                            }>
                                                                            {
                                                                                country.name
                                                                            }
                                                                        </option>
                                                                    )
                                                                }
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-sm-4">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            ZIP
                                                        </label>{' '}
                                                        <input
                                                            id="zip"
                                                            class="form-control"
                                                            type="tel"
                                                            onInput={
                                                                handleInputChage
                                                            }
                                                            value={
                                                                profile.profile
                                                                    ? profile
                                                                          .profile
                                                                          .zip
                                                                    : ''
                                                            }
                                                            placeholder="ZIP"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <hr />

                                    <div>
                                        <h5 class="mb-3">Socials</h5>
                                        <form>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            Facebook
                                                        </label>{' '}
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            onInput={
                                                                handleSocialsChange
                                                            }
                                                            id="facebook"
                                                            value={
                                                                profile.social
                                                                    ? profile
                                                                          .social
                                                                          .facebook
                                                                    : ''
                                                            }
                                                            placeholder="Facebook username"
                                                        />
                                                    </div>
                                                </div>

                                                <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            Twitter
                                                        </label>{' '}
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            onInput={
                                                                handleSocialsChange
                                                            }
                                                            id="twitter"
                                                            value={
                                                                profile.social
                                                                    ? profile
                                                                          .social
                                                                          .twitter
                                                                    : ''
                                                            }
                                                            placeholder="Twitter username"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            Linkedin
                                                        </label>{' '}
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            onInput={
                                                                handleSocialsChange
                                                            }
                                                            id="linkedin"
                                                            value={
                                                                profile.social
                                                                    ? profile
                                                                          .social
                                                                          .linkedin
                                                                    : ''
                                                            }
                                                            placeholder="Linkedin username"
                                                        />
                                                    </div>
                                                </div>

                                                <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            Github
                                                        </label>{' '}
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            onInput={
                                                                handleSocialsChange
                                                            }
                                                            id="github"
                                                            value={
                                                                profile.social
                                                                    ? profile
                                                                          .social
                                                                          .github
                                                                    : ''
                                                            }
                                                            placeholder="Github username"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="mt-3">
                                                <button
                                                    type="button"
                                                    disabled={ isSaving }
                                                    onClick={
                                                        updateProfileInformation
                                                    }
                                                    class="btn btn-sm btn-primary">
                                                    {isSaving
                                                        ? 'Updating..'
                                                        : 'Save'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <hr />
                                    <div>
                                        {/* <div class="page-inner-header mb-4">
                                            <h5 class="mb-1">Delete account</h5>
                                            <p class="text-muted mb-0">
                                                Once you delete your account,
                                                there is no going back. Please
                                                be certain.
                                            </p>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-8">
                                                <button
                                                    type="button"
                                                    class="btn btn-danger"
                                                    data-toggle="modal"
                                                    data-target="#modal_account_deactivate">
                                                    Delete your account
                                                </button>
                                            </div>
                                        </div> */}
                                        <div
                                            class="modal fade"
                                            id="modal_account_deactivate"
                                            tabIndex="-1"
                                            role="dialog"
                                            aria-labelledby="modal_account_deactivate"
                                            aria-hidden="true">
                                            <div
                                                class="modal-dialog modal-dialog-centered"
                                                role="document">
                                                <div class="modal-content">
                                                    <div class="modal-body">
                                                        <div class="pt-5 text-center">
                                                            <div class="icon text-danger">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    stroke-width="2"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    class="feather feather-user-x">
                                                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                                    <circle
                                                                        cx="8.5"
                                                                        cy="7"
                                                                        r="4"></circle>
                                                                    <line
                                                                        x1="18"
                                                                        y1="8"
                                                                        x2="23"
                                                                        y2="13"></line>
                                                                    <line
                                                                        x1="23"
                                                                        y1="8"
                                                                        x2="18"
                                                                        y2="13"></line>
                                                                </svg>
                                                            </div>
                                                            <h4 class="h5 mt-5 mb-3">
                                                                Extremely
                                                                important
                                                            </h4>
                                                            <p>
                                                                We will
                                                                immediately
                                                                delete all of
                                                                your personal
                                                                data from our
                                                                database. This
                                                                action can not
                                                                be undone. Are
                                                                you sure you
                                                                want to do this?
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button
                                                            type="button"
                                                            class="btn btn-sm btn-link text-danger btn-zoom--hover font-weight-600">
                                                            Delete
                                                        </button>{' '}
                                                        <button
                                                            type="button"
                                                            class="btn btn-sm btn-secondary"
                                                            data-dismiss="modal">
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
