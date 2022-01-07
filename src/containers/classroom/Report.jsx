/** @format */

import React,{ useState } from 'react'
import { useSelector } from 'react-redux'
import * as API_URL from '../../config/api_url';
import Preloader from '../../components/Partials/Preloader';
import Alert from '../../components/Partials/Alert/Alert'

export default function Report(props) {

    const kid = props.match.params.kid;
    const auth = useSelector(state => state.auth);
    const [report, setReport] = useState('')
    const [isSending, setIsSending] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
      display: false,
      message: '',
      type:null,
      title: ''
    })
    const handleReportInputChange = (e) => {
      setReport(e.target.value)
    }

    const handleSubmitReport  = (e) => {
      e.preventDefault();
      setIsSending(true);
        setAlertConfig({
            type: null,
            message: null,
            display: false,
        })

        if(report.length < 10){
          setAlertConfig({
              type: 'danger',
              message: 'Not enough content to report',
              display: true,
          })
      setIsSending(false)

          return false;
        };
      const userTokenAlias = 'wx1298'

      const url = `${ API_URL.REPORT_CLASSROOM }`;

        const myHeaders =  new Headers()
        myHeaders.append('Content-Type', 'Application/json')
        myHeaders.append('Accept', 'application/json')
        myHeaders.append(
            'Authorization',
            `Bearer ${ localStorage.getItem(userTokenAlias) }`
        )

    const accountRecoveryRequest =  new Request(url, {
        method: 'POST',
        cache: 'default',
        headers: myHeaders,
        body: JSON.stringify({ report,kid, time: new Date()}),
        mode: 'cors'
    });
      fetch(accountRecoveryRequest).then(data => data.json()).then(report => {
      setIsSending(false);
      setReport('');
      setAlertConfig({
        type:'success',
        message: 'Report was submitted successfully',
        display:true
      });

      }).catch(err => {
        
      setIsSending(false);
      setReport('');
  setAlertConfig({
      type: 'danger',
      message: 'Report failed to submit',
      display: true,
  })
      })
    }
    return (
        <div>
            <div>
                <section class="slice py-6 pt-lg-7 pb-lg-8 bg-gradient-success">
                    <div class="container d-flex align-items-center text-center text-lg-left">
                        <div class="col px-0">
                            <div class="row row-grid align-items-center">
                                <div class="col-lg-6">
                                    <h1 class="h1 text-white text-center text-lg-left my-4">
                                        Hi a complaint{' '}
                                        <strong>to table?</strong>
                                    </h1>
                                    <p class="lead text-white text-center text-lg-left opacity-8">
                                        At codemarka we ensure the safety and
                                        protection of our users, feel free to
                                        send us a report about this classroom,
                                        incase you want to ask a question
                                        instead visit <a>Here</a>
                                    </p>
                                    <div class="mt-5 text-center text-lg-left">
                                        <a
                                            href="#sct-form-report"
                                            data-scroll-to=""
                                            class="btn btn-white btn-lg btn-icon">
                                            <span class="btn-inner--icon">
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
                                                    class="feather feather-edit-2">
                                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                                </svg>
                                            </span>
                                            <span class="btn-inner--text">
                                                Write a report
                                            </span>
                                        </a>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-center justify-content-lg-left mt-5">
                                        <div class="col-auto text-sm text-white pl-0 pr-4">
                                            {/* Trusted by: */}
                                        </div>
                                        <div class="client-group col">
                                            <div class="row">
                                                {/* <div class="client col-3 py-3">
                                                    <img
                                                        alt="Image placeholder"
                                                        src="../../assets/img/clients/svg/google-gray.svg"
                                                    />
                                                </div>
                                                <div class="client col-3 py-3">
                                                    <img
                                                        alt="Image placeholder"
                                                        src="../../assets/img/clients/svg/spotify-gray.svg"
                                                    />
                                                </div>
                                                <div class="client col-3 py-3">
                                                    <img
                                                        alt="Image placeholder"
                                                        src="../../assets/img/clients/svg/airbnb-gray.svg"
                                                    />
                                                </div>
                                                <div class="client col-3 py-3">
                                                    <img
                                                        alt="Image placeholder"
                                                        src="../../assets/img/clients/svg/paypal-gray.svg"
                                                    />
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="slice slice-lg" id="sct-form-report">
                    <div class="container position-relative zindex-100">
                        <div class="row justify-content-center mb-5">
                            <div class="col-lg-6 text-center">
                                <h3>Contact us</h3>
                                <p class="lh-190">
                                    If there's something we can help you with,
                                    jut let us know. We'll be more than happy to
                                    offer you our help
                                </p>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-lg-6">
                                <Alert
                                    type={ alertConfig.type }
                                    display={ alertConfig.display }
                                    title={ alertConfig.title }>
                                    {alertConfig.message}
                                </Alert>
                                <form id="form-contact">
                                    <div class="form-group">
                                        <textarea
                                            class="form-control form-control-lg"
                                            data-toggle="autosize"
                                            placeholder="Tell us in full details about your complaint..."
                                            rows="3"
                                            value={ report }
                                            onChange={ handleReportInputChange }
                                            required={ true }
                                            style={ {
                                                overflow: 'hidden',
                                                overflowWrap: 'break-word',
                                                resize: 'none',
                                                height: '106p',
                                            } }></textarea>
                                    </div>
                                    <div class="text-center">
                                        <button
                                            type="reset"
                                            class="btn-reset d-none"></button>{' '}
                                        <button
                                            type="button"
                                            disabled={ isSending }
                                            onClick={ handleSubmitReport }
                                            class="btn btn-block btn-lg btn-primary mt-4">
                                            {isSending ? (
                                                <Preloader />
                                            ) : (
                                                'Send your report'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
