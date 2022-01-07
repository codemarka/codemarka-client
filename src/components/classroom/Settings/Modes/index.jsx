/** @format */

import React from 'react';
import svg from '../../../../media/svg/Open_gift.svg';

export default function index() {
    return (
        <div className="justify-center p-5 text-center">
            Switch your classroom modes from test, learning, interview when you
            upgrade to <span class="badge badge-info d-inline">Pro</span> or get
            a community account.
            <div className="text-center align-content-center mt-2">
                <img src={svg} alt="gift_open" className="img-fluid img-center" />
            </div>
        </div>
    )
}
