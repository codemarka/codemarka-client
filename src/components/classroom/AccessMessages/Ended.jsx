// classroom has ended

import React from 'react'
import endedImg from '../../../media/images/vectors/hugo-unsubscribed.png'

function Ended(){
    return (
        <div>
            <div
                style={{ height: '100vh' }}
                className="bg-primary pt-7 text-center justify-content-center">
                <div className="m-auto">
                    <h1 className="text-white">
                        Class Has Ended!
                    </h1>
                    <p className="p-3 text-white">
                        {' '}
                        <span className="text-white">
                            Whoops! Seems you ran late for this
                            class session.
                        </span>
                        <br />
                        <a
                            href="/"
                            className="btn btn-success text-dark text-uppercase font-weight-bold">
                            Home
                        </a>
                    </p>
                    <hr className="divider" />
                    <div className="m-3">
                        <img
                            style={{ height: '300px' }}
                            src={endedImg}
                            alt="failed"
                            className="img-fluid"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ended;