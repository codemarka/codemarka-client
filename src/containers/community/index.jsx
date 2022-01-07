/* eslint-disable react/prop-types */
import React,{ useLayoutEffect,useState, useRef } from 'react';
import { connect } from 'react-redux'

import { Redirect,Link } from 'react-router-dom'
import { dispatchAppEnvironment  } from '../../store/actions/app';
import { convertToReadableDateFormat } from '../../utility/shared'
import * as APIURL from '../../config/api_url';
import * as APPURL from '../../config/url';

import Helmet from '../../components/SEO/helmet';

import './style/index.css';

import img from '../../media/images/logo/dark.png'
import header from '../../media/images/images.png';

function Dashboard(props) {

  useLayoutEffect(() => {
      props.onEnvSwtich('app')
  })
  const {
    match: { params },
  } = props
  const communitykid = params.kid

  const [isLoaded, setIsLoaded] = useState(false);
  const [communityDetails, setCommunityDetails] = useState({});
  const [upcomingClassrooms, setupcomingClassrooms] = useState([]);
  const upcomingSessionRefs = useRef('loading..');
  const [isOwner, setisOwner] = useState(props.userid === communitykid);
  const [isMember, setisMember] = useState(null);
  const [memberShipRequest, setmemberShipRequest] = useState({loading:false});

  window.clis__codem = {upcomingClassrooms,setisOwner};

  useLayoutEffect(() => {
      if (isLoaded) return
      const url = APIURL.GET_SINGLE_COMMUNITY + communitykid

      const request = new Request(url, {
          method: 'GET',
          cache: 'default',
          mode: 'cors',
          
      })

      const upcomingClassroomsRequest = new Request(
          APIURL.GET_UPCOMING_CLASS_SESSIONS + communitykid,
          {
              method: 'GET',
              cache: 'default',
              mode: 'cors',
              
          }
      )

      fetch(request)
          .then((data) => data.json())
          .then((d) => {
              if (d.data) {
                  setCommunityDetails({ ...d.data })
                  const members = d.data.members
                  if (members.length > 0) {
                      const memberShipStatus = members.filter(
                          (member) => member.kid === props.userid
                      )
                      memberShipStatus.length > 0
                          ? setisMember(true)
                          : setisMember(false)
                  }

                  fetch(upcomingClassroomsRequest)
                      .then((data) => data.json())
                      .then((d) => {
                          if (!d.data[0]) {
                              setupcomingClassrooms(d.data)
                              upcomingSessionRefs.current =
                                  'No Upcoming classes!'
                          } else {
                              setupcomingClassrooms(d.data)
                              upcomingSessionRefs.current = d.data.map(
                                  (session) => {
                                      return (
                                          <div
                                              class="row align-items-center mb-3 shadow-none"
                                              key={ session.kid }>
                                              <div class="col-auto">
                                                  <div class="icon icon-shape bg-soft-primary text-primary">
                                                      <img
                                                          alt="gravatar"
                                                          src={
                                                              session.gravatarUrl
                                                          }
                                                      />
                                                  </div>
                                              </div>
                                              <div class="col pl-0">
                                                  <Link
                                                      to={ `/c/classroom/${ session.kid }` }>
                                                      <span class="d-block h6 text-sm mb-0">
                                                          {session.topic}
                                                      </span>
                                                  </Link>

                                                  <p class="mb-0 text-xs">
                                                      {convertToReadableDateFormat(
                                                          session.schedule
                                                      )}
                                                  </p>
                                              </div>
                                              <div class="col-auto actions">
                                                  <div
                                                      class="dropdown"
                                                      data-toggle="dropdown">
                                                      <a
                                                          href="#!"
                                                          class="action-item"
                                                          role="button"
                                                          data-toggle="dropdown"
                                                          aria-haspopup="true"
                                                          aria-expanded="false">
                                                          <i className="fa fa-dot"></i>
                                                      </a>
                                                      <div class="dropdown-menu dropdown-menu-right">
                                                          <a
                                                              href="#!"
                                                              class="dropdown-item">
                                                              Remind Me
                                                          </a>
                                                          <a
                                                              href="#!"
                                                              class="dropdown-item"
                                                              onClick={ copyUrl(
                                                                  session.shortUrl
                                                              ) }>
                                                              copy url
                                                          </a>
                                                      </div>
                                                  </div>
                                              </div>
                                              <hr class="my-3" />
                                          </div>
                                      )
                                  }
                              )
                          }
                          setIsLoaded(true)
                      })
                      .catch((er) => {
                          setIsLoaded(true)
                          setupcomingClassrooms([])
                      })
              }
          })
          .catch((er) => {
              setIsLoaded(false)
          })
  }, [setIsLoaded])

  const handleLogoUpload = (e) => {
    e.preventDefault();
    document.querySelector('#logoUpdateInput').click();
  }

  // const turnNotificationsForCommunity = (e) => {

  // }

  const joinCommunityAsMember = (e) => {

    if(Number(props.accountType) === 102){
      alert('Failed to perform operation with account type,community.')
      return;
    } else {

    const action = isMember ? 'leave':'join';

      const myHeaders =  new Headers();
      myHeaders.append('Content-Type', 'Application/json')
   
      const membershipRequest = new Request(
          APIURL.JOIN_COMMUNITY + communitykid,
          {
              method: 'POST',
              cache: 'default',
              mode: 'cors',
              headers: myHeaders,
              body: JSON.stringify({ user: props.userid, action }),
              
          }
      )

    setmemberShipRequest({loading:true});
    fetch(membershipRequest).then(d => d.json()).then(dd => {
      const newMembers = dd.data;
      const memberShipStatus = newMembers.filter(member => member.kid === props.userid);
      memberShipStatus.length > 0 ? setisMember(true) : setisMember(false); 
      setmemberShipRequest({loading:false});
      setCommunityDetails({ ...communityDetails,members:dd.data});
    }).catch(er => {
    //   
      setmemberShipRequest({ loading: false });

    })
    }

  }

  // const setReminderForClassroomSession = (e,roomid) => {

  // }
  function copyUrl(id){

  };

  const getStarRating = (rating) => {
    const star = rating;
    const leftStars = 5 - star;

    if(star === 0) return;

    for (let index = 1; index <= star; index++) {
      return (
          <i className="fa fa-star starred"></i>
      )
    }

    for (let index = 0; index < leftStars; index++) {
      return (
          <i className="fa fa-star"></i>
      )
    }
  }

  const displayMembers = (members) => {
    if(members.length === 0){
      return(<p>No members yet.</p>)
    }
    else {
      return members.map(mem => {
        return (
            <div className="col-auto text-center my-1 px-1" key={ mem.kid } title={ mem.username }>
                <Link
                    to={ `/u/${ mem.username }` }
                    className="hover-scale-105">
                    <img src={ mem.profileImg } height="2rem" className="avatar avatar-sm rounded-circle"/>
                </Link>
            </div>
        )
      })
    }
  }

  if (!props.isAuthenticated && props.authState === 'done') {
    return (<Redirect to={ `${ APPURL.AUTH_SIGN_IN }/?authCheck=failed&redir=/community/${ communitykid }` } />)
  }
  if(!isLoaded){
    return (
        <div className="h-100vh d-flex" style={ {alignItems:'center',justifyContent:'center'} }>
            <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
  }
  return (
      <section className="community_container">
          <Helmet
              title={ communityDetails.communityName + ' - Codemarka Community' }
              metaDescription={ communityDetails.description || '' }
          />

          <div
              className="top-header-container"
              style={ { backgroundImage: `url(${ header })` } }>
              <div className="action-container">
                  {/* <i className="fa fa-bell" onClick={turnNotificationsForCommunity}></i>
          <i className="fa fa-plus" onClick={joinCommunityAsMember}></i> */}
                  <button
                      onClick={ joinCommunityAsMember }
                      className={ `btn btn-sm ${
                          isOwner || isMember ? 'bg-success' : 'bg-dark'
                      }` }>
                      {memberShipRequest.loading ? (
                          <div
                              className="spinner-grow"
                              style={ { backgroundColor: '#fff' } }
                              role="status">
                              <span className="sr-only">Loading...</span>
                          </div>
                      ) : (
                          <b>
                              {isOwner || isMember ? (
                                  <span>
                                      Following{' '}
                                  </span>
                              ) : (
                                  'Follow'
                              )}
                          </b>
                      )}
                  </button>
              </div>
              <div className="logo_container">
                  <img
                      src={ communityDetails.Logo || img }
                      alt="logo"
                      className="avatar header-image rounded-circle avatar-lg"
                  />
                  <input type="file" hidden id="logoUpdateInput" />
                  {/* {isOwner ? (<button onClick={ handleLogoUpload } type="file"><i className="fa fa-camera"></i></button>): ''} */}
              </div>
          </div>

          <div className="row">
              <div className="col-md-8 col-12">
                  <div
                      class="card shadow-lg border-0"
                      style={ { maxWidth: '100%', margin: 20 } }>
                      <div class="card-body px-5 py-5 text-md-left">
                          <div class="row align-items-center">
                              <div class="col-md-12 col-12">
                                  <p class="mb-0">
                                      <i className="fa fa-at mr-2"></i>
                                      {communityDetails.communityName} (
                                      {communityDetails.communityAcronym})
                                  </p>
                                  <p class="mb-0">
                                      <i className="fa fa-globe mr-2"></i>
                                      {communityDetails.city},
                                      {communityDetails.country}.
                                  </p>
                                  <a
                                      href={ communityDetails.publicWebsite.toString() }
                                      target="_blank"
                                      className="text-underline"
                                      rel="noopener noreferrer">
                                      <i
                                          className="fa fa-link mr-2"
                                          style={ { color: '#8492a6' } }></i>

                                      {communityDetails.publicWebsite || (
                                          <b>No public website</b>
                                      )}
                                  </a>

                                  <p>
                                      <i className="fa fa-book mr-2"></i>
                                      {Number(
                                          communityDetails.privateClassCreated
                                      ) +
                                          Number(
                                              communityDetails.publicClassCreated
                                          )}{' '}
                                      classrooms created since{' '}
                                      {new Date(
                                          communityDetails.createdAt
                                      ).getFullYear()}
                                  </p>
                                  <p>
                                      {getStarRating(communityDetails.rating)}
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div
                      className="card shadow-lg border-0"
                      style={ { maxWidth: '100%', margin: 20 } }>
                      <div className="card-body px-5 py-5 text-md-left">
                          <div className="row align-items-center">
                              <div className="col-md-12 col-12">
                                  <h5 className="mb-2">Contact Info</h5>

                                  <p className="mb-0">
                                      <i className="fa fa-envelope mr-2"></i>
                                      {communityDetails.email}
                                  </p>
                                  <p className="mb-0">
                                      <i className="fa fa-phone mr-2"></i>
                                      {communityDetails.telephone}
                                  </p>
                                  <p className="mb-0">
                                      <i className="fa fa-map-pin mr-2"></i>
                                      {communityDetails.physicalAddress}
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div
                      className="card shadow-lg border-0"
                      style={ { maxWidth: '100%', margin: 20 } }>
                      <div className="card-body px-5 py-5 text-md-left">
                          <div className="row align-items-center">
                              <div className="col-md-12 col-12">
                                  <h5 className="mb-2">Socials</h5>

                                  <p className="mb-0">
                                      <i className="fab fa-facebook mr-2"></i>
                                      {communityDetails.facebookUrl ? (
                                          <a
                                              target="_blank"
                                              className="text-primary-soft"
                                              rel="noopener noreferrer"
                                              href={
                                                  communityDetails.facebookUrl
                                              }>
                                              {communityDetails.facebookUrl}
                                          </a>
                                      ) : (
                                          'Not available'
                                      )}
                                  </p>
                                  <p className="mb-0">
                                      <i className="fab fa-twitter mr-2"></i>
                                      {communityDetails.twitterUrk ? (
                                          <a
                                              target="_blank"
                                              className="text-primary-soft"
                                              rel="noopener noreferrer"
                                              href={
                                                  communityDetails.twitterUrk
                                              }>
                                              {communityDetails.twitterUrk}
                                          </a>
                                      ) : (
                                          'Not available'
                                      )}
                                  </p>
                                  <p className="mb-0">
                                      <i className="fab fa-instagram mr-2"></i>
                                      {communityDetails.instagramUrl ? (
                                          <a
                                              target="_blank"
                                              className="text-primary-soft"
                                              rel="noopener noreferrer"
                                              href={
                                                  communityDetails.instagramUrl
                                              }>
                                              {communityDetails.instagramUrl}
                                          </a>
                                      ) : (
                                          'Not available'
                                      )}
                                  </p>

                                  <p className="mb-0">
                                      <i className="fab fa-meetup mr-2"></i>
                                      {communityDetails.meetupUrl ? (
                                          <a
                                              target="_blank"
                                              className="text-primary-soft"
                                              rel="noopener noreferrer"
                                              href={ communityDetails.meetupUrl }>
                                              {communityDetails.meetupUrl}
                                          </a>
                                      ) : (
                                          'Not available'
                                      )}
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div
                      className="card shadow-lg border-0"
                      style={ { maxWidth: '100%', margin: 20 } }>
                      <div className="card-body px-5 py-5 text-md-left">
                          <div className="row align-items-center">
                              <div className="col-md-12 col-12">
                                  <h5 className="mb-2">Organizers</h5>

                                  <div className="mb-1 organizers-container">
                                      {/* <img
                                          alt="oragn_1_img"
                                          src={ img }
                                          className="avatar  rounded-circle pr-2"
                                      /> */}
                                      <div className="organizers-details">
                                          <p style={ { margin: 0 } }>
                                              Lead -{' '}
                                              {
                                                  communityDetails.organizers
                                                      .lead.fullname
                                              }
                                          </p>

                                          <p style={ { margin: 0 } }>
                                              <a
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  href={ `mailto:${ communityDetails.organizers.lead.email }` }>
                                                  <i className="fa fa-envelope text-muted"></i>
                                              </a>
                                          </p>
                                      </div>
                                  </div>

                                  <div className="mb-1 organizers-container">
                                      {/* <img
                                          alt="oragan_1_img"
                                          src={ img }
                                          className="avatar  rounded-circle pr-2"
                                      /> */}
                                      <div className="organizers-details">
                                          <p style={ { margin: 0 } }>
                                              CoLead -{' '}
                                              {
                                                  communityDetails.organizers
                                                      .coLead.fullname
                                              }
                                          </p>
                                          <p style={ { margin: 0 } }>
                                              <a
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  href={ `mailto:${ communityDetails.organizers.coLead.email }` }>
                                                  <i className="fa fa-envelope text-muted"></i>
                                              </a>
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-md-4 col-12">
                  <div className="card" style={ { margin: 20 } }>
                      <div className="card-header">
                          <span className="h6">
                              Members({communityDetails.members.length})
                          </span>
                      </div>
                      <div className="card-body py-3">
                          <div className="row mx-n1">
                              {displayMembers(communityDetails.members)}
                          </div>
                      </div>
                  </div>

                  <div class="card" style={ { margin: 20 } }>
                      <div class="card-header pb-3">
                          <div class="d-flex justify-content-between align-items-center">
                              <div>
                                  <span class="h6">Upcoming Sessions</span>
                              </div>
                              <div class="text-right">
                                  <div class="actions mr-n2">
                                      <a href="#!" class="action-item">
                                          <i data-feather="refresh-ccw"></i>
                                      </a>
                                      <div
                                          class="dropdown action-item"
                                          data-toggle="dropdown">
                                          <a href="#!" class="action-item">
                                              <i data-feather="more-horizontal"></i>
                                          </a>
                                          <div class="dropdown-menu dropdown-menu-right">
                                              <a
                                                  href="#!"
                                                  class="dropdown-item">
                                                  Refresh
                                              </a>
                                              <a
                                                  href="#!"
                                                  class="dropdown-item">
                                                  turn on notifications
                                              </a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div class="card-body">{upcomingSessionRefs.current}</div>
                  </div>
              </div>
          </div>
      </section>
  )
}

const mapStateToProps = ({ auth, classroom }) => {
  return {
    isAuthenticated: auth.user.token !== null,
    userid: auth.user.accountid,
    username: auth.user.displayName,
    user_t: auth.user.token,
    authState: auth.authState,
    accountType: auth.user.accountType
    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onEnvSwtich: state => dispatch(dispatchAppEnvironment(state))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
