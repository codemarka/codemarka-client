/** @format */

import React from 'react'
import svg from '../../../../media/svg/Open_gift.svg'

export default function Behaviour() {
    return (
        <div className="justify-center p-5 text-center">
            Control your classrooms auto-save feature, noise out, taking
            attendace,private messaging and entry access when you upgrade to{' '}
            <span class="badge badge-info">Pro</span> or get a community
            account.
            <div className="text-center align-content-center mt-2">
                <img
                    src={svg}
                    alt="gift_open"
                    className="img-fluid img-center"
                />
            </div>
        </div>
    )
}
