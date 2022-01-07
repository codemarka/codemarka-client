/* eslint-disable no-undef */
/** @format */

import React, { useEffect, useState, useRef } from 'react'
import * as APIURL from '../../config/api_url'

import { formatToTimeZone } from 'date-fns-timezone'

export default function FetchUpcomingClass() {
    const [state, setstate] = useState({ fetched: false, results: null })
    const content = useRef('Loading...')

    useEffect(() => {
        if (!state.fetched) {
            const url = APIURL.GET_UPCOMING_CLASSRROM_SESSIONS

            const request = new Request(url, {
                method: 'GET',
                cache: 'default',
                mode: 'cors',
                
            })

            fetch(request)
                .then((data) => data.json())
                .then((d) => {
                    if (d.data) {
                        const timeZone = Intl.DateTimeFormat().resolvedOptions()
                            .timeZone

                        const getDateandTime = (date) => {
                            // 
                            const Mdate = new Date(date)
                            const dtime = formatToTimeZone(
                                Mdate,
                                'Do MMMM YYYY - h:mm A',
                                { timeZone }
                            )
                            return `${ dtime }`
                        }
                        content.current = d.data.map((comm) => {
                            return (
                                <div className="col-md-3 col-12" key={ comm.kid }>
                                    <div className="card mb-3">
                                        <div className="card-header pb-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <span className="h6"></span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="actions mr-n2">
                                                        <a
                                                            href={ `/c/classroom/${ comm.kid }` }
                                                            className="action-item">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="1em"
                                                                height="1em"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                className="feather feather-external-link">
                                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                                <line
                                                                    x1="10"
                                                                    y1="14"
                                                                    x2="21"
                                                                    y2="3"></line>
                                                            </svg>
                                                        </a>
                                                        <a
                                                            className="action-item"
                                                            href={ `/classroom/report/${ comm.kid }` }
                                                            title="Report classroom">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="1em"
                                                                height="1em"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                class="feather feather-x-circle">
                                                                <circle
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="10"></circle>
                                                                <line
                                                                    x1="15"
                                                                    y1="9"
                                                                    x2="9"
                                                                    y2="15"></line>
                                                                <line
                                                                    x1="9"
                                                                    y1="9"
                                                                    x2="15"
                                                                    y2="15"></line>
                                                            </svg>
                                                        </a>

                                                        <a
                                                            className="action-item"
                                                            title="Ask a question"
                                                            href={ `/classroom/question/${ comm.kid }` }>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="1em"
                                                                height="1em"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                class="feather feather-mail">
                                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                                <polyline points="22,6 12,13 2,6"></polyline>
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body pt-0">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <div className="icon icon-sm">
                                                        <img
                                                            alt="Image placeholder"
                                                            src={ comm.gravatar }
                                                            className="avatar  rounded-circle"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <span className="badge badge-xs badge-circle rounded-circle badge-success">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    stroke-width="2"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    className="feather feather-check">
                                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                                </svg>
                                                            </span>
                                                        </div>
                                                        <div className="pl-2">
                                                            <small className="h6 text-xs text-success">
                                                                verified
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <h6 className="mb-0">
                                                    {comm.name} - {comm.topic}
                                                </h6>

                                                <small>
                                                    <b>@{comm.by}</b>
                                                </small>
                                                <br />
                                                <small className="mb-0 text-sm text-muted">
                                                    {getDateandTime(
                                                        comm.schedule
                                                    )}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        setstate({ fetched: true, results: d.data })
                    }
                })
                .catch((err) => {
                    setstate({ fetched: true, results: [] })
                })
        }
    })

    return (
        <div className="pt-5 pb-5">
            <div className="row align-content-center">{content.current}</div>
        </div>
    )
}
