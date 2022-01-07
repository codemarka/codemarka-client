/** @format */

// yet to start

import React,{ useState } from 'react'
import Axios from 'axios';
import io from 'socket.io-client'

import notFoundImg from '../../../media/images/vectors/hugo-fatal-error.png'
import Spinner from '../../Partials/Preloader';
import * as APIURL from '../../../config/api_url';

function AlreadyInClassName(props) {
    const host =
        process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'
            ? 'https://codemarka.herokuapp.com'
            : 'http://localhost:2001'

    const socket = io(host, {
        reconnection: true,
        reconnectionDelay: 6000,
        reconnectionDelayMax: 1000,
        reconnectionAttempts: 30,
    })

    const [forcing, setforcing ] = useState(false);
    const [responseObj, setResponseObj] = useState({type:'success', message: null});

    function handleForceEntry(){
        const { roomkid: room, userkid: kid, token } = props
        setforcing(true);
        setResponseObj({message: null})

        Axios.post(APIURL.FORCE_ROOM_ENTRANCE,{room, kid},{
            headers: {'Authorization':`Bearer ${ token }`}
        }).then(response => {
            const { data, status } = response;
            if(status && status === 200){
                setforcing(false);
                setResponseObj({
                    type: 'success',
                    message: 'Please wait, disconnecting..',
                })

                socket.emit('force_disconnect',data.message);

                setTimeout(() => {
                window.location.reload();
                }, 3000);
            }
        }).catch(err => {
            setforcing(false);
            setResponseObj({type:'error', message: 'Failed!'})
        })
    };
    return (
        <div>
            <section className="vh-100 d-flex align-items-center">
                <div
                    className="position-absolute h-100 top-0 right-0 zindex-110 col-lg-6 col-xl-6 zindex-100 d-none d-lg-flex flex-column justify-content-end rounded-bottom-left"
                    data-bg-size="cover"
                    data-bg-position="center">
                    <img
                        src={ notFoundImg }
                        alt="img--"
                        className="img-as-bg rounded-bottom-left"
                    />
                </div>
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-sm-7 col-lg-6 col-xl-6 mx-auto ml-lg-0">
                            <div className="row justify-content-center">
                                <div className="col-11 col-lg-10 col-xl-6 py-5">
                                    <h6 className="display-1 mb-3 font-weight-600 text-warning">
                                        Oops!
                                    </h6>
                                    <p className="lead text-lg mb-3">
                                        You are already logged into this
                                        session.
                                    </p>

                                    <a
                                        href="#"
                                        onClick={ handleForceEntry }
                                        className="text-primary btn btn-primary text-white-50 hover-translate-y-n3 mt-3">
                                        <span className="btn-inner--text">
                                            {forcing ? (
                                                <Spinner />
                                            ) : (
                                                'Force Entrance'
                                            )}
                                        </span>
                                    </a>

                                    {responseObj.message &&
                                        responseObj.type ===
                                            'success' && (
                                                <div
                                                    class="mt-2 text-success"
                                                    role="alert">
                                                    {responseObj.message}
                                                </div>
                                            )}
                                    {responseObj.message &&
                                        responseObj.type ===
                                            'error' && (
                                                <div
                                                    class="mt-2 text-danger"
                                                    role="alert">
                                                    {responseObj.message}
                                                </div>
                                            )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AlreadyInClassName
