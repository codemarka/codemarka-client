import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { dispatchAppEnvironment } from '../../store/actions/app';

import * as APIURL from '../../config/api_url';

 function FetchCommunities(props) {
  const [state, setstate] = useState({ fetched: false, results: null });
  const content = useRef('');
  
  const returnStars = (stars) => {
    if(stars === 0) return;
    for (let index = 0; index <= stars; index++) {
      return (
          <i className="fa fa-star" style={ {color:'yellow'} }></i>
      )
    }
    const remaining = 5 - stars;
    for (let index = 0; index <= remaining; index++) {
      return (
          <i className="fa fa-star"></i>
      )
    }
  }
  //  const upcomingSessionRefs = useRef('loading..');
   const [memberShipRequest, setmemberShipRequest] = useState({ loading: false });
  window.mem__bb__ = memberShipRequest;

   const joinCommunityAsMember = (e, communitykid, isAMember) => {

    if (Number(props.accountType) === 102) {
      alert('Failed to perform operation with account type,community.')
      return;
    } else {

      const action = isAMember ? 'leave' : 'join';

      const myHeaders = new Headers();
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

      setmemberShipRequest({ loading: true });
      fetch(membershipRequest).then(d => d.json()).then(dd => {
        const newMembers = dd.data;
        const memberShipStatus = newMembers.filter(member => member.kid === props.userid);
        if(memberShipStatus.length > 0){
          document.querySelector(`#btn-com-${ communitykid }`).innerHTML = "<span>Member <i class='fa fa-check pl-2'></i></span>"
        } else {
          document.querySelector(`#btn-com-${ communitykid }`).innerHTML = '<span>Join</span>'
        }
        document.querySelector(`#btn-com-${ communitykid }`).removeEventListener('click',e);
        document.querySelector(`#btn-con-${ communitykid }`).addEventListener('click', joinCommunityAsMember(e, communitykid, !isAMember))
       
      }).catch(er => {
        
       return;
      })
    }

  }

  useEffect(() => {
    if (!state.fetched) {

      const url = APIURL.GET_COMMUNITIES;

      const request = new Request(url, {
          method: 'GET',
          cache: 'default',
          mode: 'cors',
          
      })

      fetch(request).then(data => data.json()).then(d => {
        if (d.data) {
          content.current = d.data.map((comm) => {
            const memberShipStatus = comm.members.filter(member => member.kid === props.userid);
            const isAMember = memberShipStatus.length > 0 ?  true : false;

            return (
                <div className="col-md-3 col-12" key={ comm.kid }>
                    <div class="card hover-shadow-lg hover-translate-y-n3">
                        <div class="card-body py-5 text-center h-100">
                            <Link
                                to={ `community/${ comm.kid }` }
                                class="avatar avatar-md rounded-circle avatar-lg hover-translate-y-n3">
                                <img src={ comm.logo } alt="community_logo" />
                            </Link>
                            <p className="font-weight-bold">{comm.name}</p>
                            <b>
                                {comm.city},{comm.country}
                            </b>
                            {/* <span class="static-rating d-block">
                                {returnStars(comm.rating)}
                            </span> */}
                            {/* <h5 class="h6 mt-4 mb-1">{comm.rating} out of 5 stars</h5>
                            <p class="text-muted text-sm mb-0">
                                from {comm.reviews.length} reviews
                            </p> */}
                            <span className="clearfix"></span>
                            <div class="mt-3 pt-3 delimiter-top">
                                <div class="actions">
                                    <button
                                        className={ `btn btn-soft-success
                                        btn-sm rounded-pill` }
                                        id={ `btn-com-${ comm.kid }` }
                                        onClick={ (e) =>
                                            joinCommunityAsMember(
                                                e,
                                                comm.kid,
                                                isAMember
                                            )
                                        }>
                                        {isAMember ? (
                                            <span>
                                                Following{' '}
                                                <i className="fa fa-check pl-2"></i>
                                            </span>
                                        ) : (
                                            'Follow'
                                        )}
                                    </button>
                                    <button className="btn btn-soft-info text-white btn-sm rounded-pill">
                                        <Link to={ `/community/${ comm.kid }` }>
                                            Visit
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
          });
          setstate({ fetched: true, results: d.data });

        }
      }).catch((err) => {
        setstate({ fetched: true, results: [] });
      });

    }
  })

  return (
      <div className="pt-5 pb-5 text-center">
          <div className="row text-center align-content-center">
              {content.current}
          </div>
      </div>

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
export default connect(mapStateToProps, mapDispatchToProps)(FetchCommunities)
