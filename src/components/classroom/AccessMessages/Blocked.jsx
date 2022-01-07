// you were blocked

import React from 'react'
import failedImg from '../../../media/images/vectors/flame-1.png'

function Blocked(props){
    return (
        <div
            style={{ height: '100vh' }}
            className="bg-warning pt-7 text-center justify-content-center">
            <div className="m-auto">
                <h1 className="text-white">Heads Up!</h1>
                <p className="p-3 text-white">
                    {' '}
                    <span className="text-white">
                        Whoops! Seems you have been blocked from
                        joining {props.className}!
                    </span>
                    <br />
                    <a
                        href="/"
                        className="btn btn-outline-success text-dark text-uppercase font-weight-bold">
                        Home
                    </a>
                </p>
                <hr className="divider" />
                <div className="m-3">
                    <img
                        style={{ height: '300px' }}
                        src={failedImg}
                        alt="failed"
                        className="img-fluid"
                    />
                </div>
            </div>
        </div>
    )
}

export default Blocked;