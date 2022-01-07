/**
 * /* eslint-disable react/prop-types
 *
 * @format
 */

import React, { useEffect, useState } from 'react'

import failedImg from '../../media/images/vectors/hugo-fatal-error.png';
import successImg from '../../media/images/vectors/eastwood-order-completed.png';

const vSuccessJsx = (
    <div className="pt-7 bg-success h-100 text-center justify-content-center">
        <div className=" m-auto">
            <h1 className="text-white">Heads Up!</h1>
            <p className="p-3">
                <span className="text-white">
                    You successfully verified your account! You can now login{' '}
                </span>
                <a href="/auth/signin?ref=vri">Here</a>.{' '}
            </p>
            <hr className="divider"/>
            <div className="m-3">
                <img
                    style={ { height: '300px' } }
                    src={ successImg }
                    alt="verified"
                    className="img-fluid"
                />
            </div>
        </div>
    </div>
)

const vFailedJsx = (
    <div className="bg-warning h-100 pt-7 text-center justify-content-center">
        <div className="m-auto">
            <h1 className="text-white">Heads Up!</h1>
            <p className="p-3">
                {' '}
                <span className="text-white">
                    Whoops! Something went wrong while verifying your account.
                </span>
                <a href="/">Home</a>
            </p>
            <hr className="divider" />
            <div className="m-3">
                <img
                    style={ { height: '300px' } }
                    src={ failedImg }
                    alt="failed"
                    className="img-fluid"
                />
            </div>
        </div>
    </div>
)

const Emailverification = props => {
    const [state, setState] = useState('')
    useEffect(() => {
        const {
            match: { params }
            
        } = props
        const v = params.verified

        if(String(v) === 'true'){
        setState(vSuccessJsx);
        } else {
          setState(vFailedJsx);
        }
    },[props]);
    return <div>{state}</div>
}

export default Emailverification
