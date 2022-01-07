import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { dispatchAppEnvironment } from '../../../store/actions/app'

import TrendingClassrooms from '../../../components/Partials/HomePage/Trending';
import FetchCommunities from '../../../components/Partials/FetchCommunities';
// import HappeningNow from '../../../components/Partials/HappeningNow';
import UpcomingClassroomSessions from '../../../components/Partials/UpcomingClassSessions';

import SearchContainer from '../../../components/Partials/SearchContainer';
import './auth.css';

function Auth_Home(props) {

    useEffect(() => {
        props.onEnvSwtich('app');
        
    });

    const host = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? process.env.REACT_APP_REMOTE_API_URL : process.env.REACT_APP_LOCAL_API_URL
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'Application/json')

    const [ searchInput, setSearchInput ] = useState({ touched: false,value:'' });
    const [ results, setResults ] = useState({ result:null });

    const searchInit = (e) => {

        if(searchInput.value !== ''){
            
    const url = `${ host }classroom/search/${ searchInput.value }`

    const searchClassroomRequest = new Request(url, {
        method: 'GET',
        cache: 'default',
        headers: myHeaders,
        mode: 'cors',
        
    })

    fetch(searchClassroomRequest)
        .then(d => d.json())
        .then(m => {
            if (m.data && m.data.length >= 1) {
                setResults({ result: m.data })
            } else {
                setResults({ result: null })
            }
        })
        .catch(err => {
            setResults({ result: 'Opps! Something went wrong' })
            console.error(err)
        })
        }

    }

    // const closeSearchResult = (e) => {
    //     e.preventDefault();
    //     setResults({ result: null });
    // }
    const handleSearchInputChange = (e) => {
        e.preventDefault();
        setSearchInput({ touched:true,value:e.target.value });

    const url = `${ host }classroom/search/${ e.target.value }`;
    
    if(e.target.value && e.target.value.length >= 2){

        const searchClassroomRequest = new Request(url, {
            method: 'GET',
            cache: 'default',
            headers: myHeaders,
            mode: 'cors',
            
        })

        fetch(searchClassroomRequest).then(d => d.json()).then(m => {
            if(m.data && m.data.length >= 1){
                setResults({ result:m.data });
            } else {
                setResults({ result:[{name:'No Results Found!!'}] });
            }
        }).catch(err => {
             setResults({ result:'Opps! Something went wrong' });
        });

    } else {
        setResults({ result:null });
    }
    
    } 
    return (
        <div className="colab__container">
            {/* start search container */}
            <section class="slice py-8 bg-dark bg-cover bg-size--home" style={ {height:'100vh'} }>
                <span class="mask bg-gradient-dark opacity-3"></span>
                <div
                    data-offset-top="#navbar-main"
                    style={ { paddingTop: '59px' } }>
                    <div class="container d-flex align-items-center text-center text-lg-left py-5">
                        <div class="col px-0">
                            <div class="row row-grid align-items-center">
                                <div class="col-lg-8">
                                    <h1 class="text-white m-0 tal-sm font-weight-bold">
                                        <span style={ {color:'#0F66BD'} }>Learn.</span>{' '}
                                        <span style={ {color:'#00B250'} }>Build.</span>{' '}
                                        <span style={ {color:'#f60369'} }>Collaborate.</span>
                                    </h1>
                                    {/* <p
                                        style={ { marginBottom: '3rem' } }
                                        class="lead text-white opacity-8 tal-sm font-weight-light">
                                        Discover classrooms
                                    </p> */}
                                    <div class="mt-2">
                                        <form
                                            // action={ `/classroom/search/q/${ searchInput.value }` }
                                            >
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        type="search"
                                                        value={
                                                            searchInput.value
                                                        }
                                                        onChange={
                                                            handleSearchInputChange
                                                        }
                                                        className="form-control"
                                                        placeholder="Explore Classrooms"
                                                        aria-label="Explore Classrooms"
                                                        aria-describedby="basic-addon2"
                                                    />
                                                    <div className="input-group-append">
                                                        <button
                                                            onClick={ searchInit }
                                                            type="button"
                                                            className="btn btn-success"
                                                            id="basic-addon2">
                                                            <i className="fa fa-search"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <SearchContainer
                                                display={ results.result }
                                                results={ results.result }
                                            />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="shape-container shape-line shape-position-bottom"></div>
            </section>

            {/* end search container */}

            <div className="all__classrooms__container">
                <div className="row mr-3 ml-3">
                    {/* <div
                        className="bg-dark w-100  p-3 text-center mt-4"
                        style={ {
                            borderRadius: '15px',
                            backgroundImage:
                                'linear-gradient(45deg, #a06060, transparent)',
                        } }>
                        <div>
                            <div className="text-white">
                                Want to host a session? Create a Free classroom
                                today! It's Quick and easy
                            </div>
                            <Link to="/classroom/create?ref=btn">
                                <button className="btn mt-2 btn-success">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </div> */}
                    <div className="trending__container w-100 pt-4">
                        <div className="trending__title mb-4 text-center ">
                            <h3 className="font-weight-700 float-left text-uppercase d-inline pr-3">
                                Discover rooms{' '}
                            </h3>{' '}
                        </div>
                        <TrendingClassrooms />
                    </div>
                    <div className="trending__container w-100 pt-4">
                        <div className="trending__title mb-4 text-center ">
                            <h3 className="font-weight-700 float-left text-uppercase d-inline pr-3">
                                Join a community{' '}
                            </h3>{' '}
                        </div>
                        <FetchCommunities />
                    </div>

                    <div className="trending__container w-100 pt-4">
                        <div className="trending__title mb-4 text-center ">
                            <h3 className="font-weight-700 float-left text-uppercase d-inline pr-3">
                                Upcoming{' '}
                            </h3>{' '}
                        </div>
                        <UpcomingClassroomSessions />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onEnvSwtich: state => dispatch(dispatchAppEnvironment(state))
    }
}
export default connect(null, mapDispatchToProps)(Auth_Home)
