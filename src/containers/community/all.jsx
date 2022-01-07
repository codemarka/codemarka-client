/* eslint-disable no-undef */
import React,{ useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as APPURL from '../../config/url';

import Helmet from '../../components/SEO/helmet';
import './style/all.css'

function AllCommunities() {
  const host = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? process.env.REACT_APP_REMOTE_API_URL : process.env.REACT_APP_LOCAL_API_URL

  const [communities, setcommunities] = useState([]);

  useLayoutEffect(() => {
      if (communities.length > 0) return
      const url = `${ host }community/`

      const request = new Request(url, {
          method: 'GET',
          cache: 'default',
          mode: 'cors',
          
      })

      fetch(request)
          .then((data) => data.json())
          .then((d) => {
              if (d.data) {
                  setcommunities(
                      d.data.map((comm) => {
                          return (
                              <div
                                  className="card shadow-lg"
                                  key={ comm.kid }
                                  style={ {
                                    borderRadius: '0'
                                  } }>
                                  <div className="card-body text-left ">
                                      <div className="row">
                                          <div className="col-md-12 col-12">
                                              <div className="community-data-container">
                                                  <div className="community-info w-100 pl-2 d-flex justify-content-between align-items-center">
                                                      <h5 className="mb-0 header-5 d-flex align-items-center">
                                                          <div className="community-logo">
                                                              <img
                                                                  alt="community_logo"
                                                                  src={
                                                                      comm.logo
                                                                  }
                                                                  class="avatar  rounded-circle"
                                                              />
                                                          </div>
                                                          {comm.name} (
                                                          {comm.acronym})
                                                      </h5>

                                                      <div className="community-action">
                                                          <button className="btn btn-soft-success btn-sm rounded-pill">
                                                              <Link
                                                                  to={ `/community/${ comm.kid }` }>
                                                                  Visit
                                                              </Link>
                                                          </button>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          )
                      })
                  )
              }
          })
          .catch((err) => {
              setcommunities([])
          })
  }, [communities, host])

  const [searchInput, setSearchInput] = useState({ touched: false, value: '' });
  const [results, setResults] = useState({ result: [] });

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'Application/json')

  const handleSearchInputChange = (e) => {
    e.preventDefault();
    setSearchInput({ touched: true, value: e.target.value });

    const url = `${ host }community/search/${ e.target.value }`;

    if (e.target.value && e.target.value.length >= 2) {

      const searchClassroomRequest = new Request(url, {
          method: 'GET',
          cache: 'default',
          headers: myHeaders,
          mode: 'cors',
          
      })

      fetch(searchClassroomRequest).then(d => d.json()).then(m => {
        if (m.data && m.data.length >= 1) {
          setResults({ result: m.data });
        } else {
          setResults({ result: [{ name: 'No Results Found!!' }] });
        }
      }).catch(err => {
        setResults({ result: [] });
      });

    } else {
      setResults({ result: [] });
    }

  } 

  return (
      <div>
          <Helmet title="Discover Communities | Codemarka" metaDescription="" />
          <section class="slice slice-lg py-7 bg-cover bg-size--cover commuities">
              <span class="mask bg-dark opacity-8"></span>
              <div
                  class="container d-flex align-items-center"
                  data-offset-top="#navbar-main"
                  style={ { paddingTop: '59px' } }>
                  <div class="col py-5">
                      <div class="row align-items-center justify-content-center">
                          <div class="col-md-7 col-lg-7 text-center">
                              <h1 class="display-4 text-white mb-2">
                                  <strong>Bridging the gap!</strong>
                              </h1>
                              <span class="text-white text-sm">
                                  Communities are a great way to connect with
                                  like minds, develop together and solve
                                  problems around the world, give it a try
                                  today.
                              </span>
                              <form
                                  action={ `/communities/search/q/${ searchInput.value }` }>
                                  <div className="form-group">
                                      <div className="input-group">
                                          <input
                                              type="search"
                                              value={ searchInput.value }
                                              onChange={ handleSearchInputChange }
                                              className="form-control"
                                              placeholder="Find Communities"
                                              aria-label="Find Communities"
                                              aria-describedby="basic-addon2"
                                              data-action="omnisearch-open"
                                              data-target="#omnisearch"
                                          />
                                          <div className="input-group-append">
                                              <button
                                                  type="button"
                                                  data-action="omnisearch-open"
                                                  data-target="#omnisearch"
                                                  className="btn btn-success"
                                                  id="basic-addon2">
                                                  <i className="fa fa-search"></i>
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          <div id="omnisearch" class="omnisearch">
              <div class="container">
                  <div class="omnisearch-container">
                      <form class="omnisearch-form">
                          <div class="form-group">
                              <div class="input-group input-group-merge input-group-flush">
                                  <div class="input-group-prepend">
                                      <span class="input-group-text">
                                          <i data-feather="search"></i>
                                      </span>
                                  </div>
                                  <input
                                      type="text"
                                      class="form-control"
                                      value={ searchInput.value }
                                      onChange={ handleSearchInputChange }
                                      placeholder="Type we are listening.."
                                  />
                              </div>
                          </div>
                      </form>
                      <div class="omnisearch-suggestions">
                          <h6 class="heading">Search Results</h6>
                          <div class="row">
                              <div class="col-sm-6">
                                  <ul class="list-unstyled mb-0">
                                      {results.result.length > 0
                                          ? results.result.map((res) => {
                                                if (
                                                    res.name ===
                                                    'No Results Found!!'
                                                ) {
                                                    return (
                                                        <b key="45o-rews">
                                                            No Results Found!!
                                                        </b>
                                                    )
                                                }
                                                return (
                                                    <li key={ res.kid }>
                                                        <Link
                                                            class="list-link"
                                                            to={ `${ APPURL.COMMUNITY_SINGLE }${ res.kid }` }>
                                                            <i className="fas fa-search-plus"></i>
                                                            <span>
                                                                {
                                                                    res.communityName
                                                                }
                                                                .
                                                            </span>
                                                        </Link>
                                                    </li>
                                                )
                                            })
                                          : ''}
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <section class="container-fluid">
              <div className="row">
                  <div className="search-community-container">
                      <div class="mt-3"></div>
                  </div>

                  <div className="col-12 col-md-12 mt-4 ">{communities}</div>
              </div>
          </section>
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
    // onEnvSwtich: state => dispatch(dispatchAppEnvironment(state))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllCommunities)
