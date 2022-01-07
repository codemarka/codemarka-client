/** @format */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { dispatchAppEnvironment } from '../../store/actions/app'
import io from 'socket.io-client'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export class classPreviewNewTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cssCDN: [],
            jsCDN: [],
            toastIdUpdates:''
        }

        this.init = this.init.bind(this);
    }
    componentWillMount() {
        this.props.onClassroomSwitch('classroom')
    }

    componentDidMount() {
      const host =
          process.env.NODE_ENV === 'production' ||
          process.env.NODE_ENV === 'test'
              ? 'https://codemarka.herokuapp.com/'
              : 'http://localhost:2001/'

      const socket = io(host, {
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 1000,
          reconnectionAttempts: 30,
      })
      toast.configure({
          autoClose: 3000,
          draggable: true,
      })
       const {
           match: { params },
       } = this.props
       
      socket.emit('join_preview_room', params.classroomKid)

      socket.on('preview_changed', (file) => {
        if(!toast.isActive(this.state.toastIdUpdates)){
       const toastId = toast.info(`Updated - ${ file }`, {
           position: 'bottom-right',
       })

        this.setState((s) => {
            return { ...s, toastIdUpdates: toastId }
        })
        }
        this.init();
      })

      socket.on('preview_connected', () => {
      
            toast.success('Connected', { position: 'bottom-right' })
            this.init()
      })
      
    }

             init() {
               
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'Application/json')
        const {
            match: { params },
        } = this.props
        const classroomKid = params.classroomKid
            const handlePreviewFileFetch = () => {
               const server =
                   process.env.NODE_ENV === 'production' ||
                   process.env.NODE_ENV === 'test'
                       ? 'https://codemarka.herokuapp.com/api/v1/'
                       : 'http://localhost:2001/api/v1/'
                const url = `${ server }classroom/preview/${ classroomKid }`

                const searchClassroomRequest = new Request(url, {
                    method: 'GET',
                    cache: 'default',
                    headers: myHeaders,
                    mode: 'cors',
                    
                })

                return fetch(searchClassroomRequest)
            }

            handlePreviewFileFetch()
                .then((d) => d.json())
                .then((files) => {
                    const previewFrame = document.getElementById(
                        'tabpreviewframe'
                    )
                    let styles, html, script, externalCDN_CSS, externalCDN_JS
                    if (files.status) {
                        styles = files.data.css.content
                        html = files.data.html.content
                        script = files.data.js.content
                        externalCDN_CSS = files.data.css.externalCDN
                        externalCDN_JS = files.data.js.externalCDN
                        this.setState({
                            cssCDN: externalCDN_CSS,
                            jsCDN: files.data.js.externalCDN,
                        })

                        document.title = `${ files.data.name } - Preview on codemarka`
                    } else {
                        styles = ''
                        html = 'Not Found!'
                        script = ''
                    }

                    const getGeneratedPageURL = ({
                        html,
                        css,
                        js,
                        CSS_CDN,
                        JS_CDN,
                    }) => {
                        const getBlobURL = (code, type) => {
                            const blob = new Blob([code], { type })
                            return URL.createObjectURL(blob)
                        }

                        const cssURL = getBlobURL(css, 'text/css')
                        const jsURL = getBlobURL(js, 'text/javascript')
                        let extercssCDN = '',
                            externaljsCDN = ''
                        CSS_CDN.forEach((cdn) => {
                            extercssCDN += `<link href=${ cdn.url } rel="stylesheet"/> \n`
                        })
                        JS_CDN.forEach((cdn) => {
                            externaljsCDN += `<script src=${ cdn.url }></script> \n`
                        })

                        const source = `
  <!DOCTYPE html>
    <html lang="en">
      <head>      
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    ${ extercssCDN }

        ${ css && `<link rel="stylesheet" type="text/css" href="${ cssURL }" />` }
      </head>
      <body>
        ${ html || '' }
      </body>
      ${ externaljsCDN }
      ${ js && `<script src="${ jsURL }"></script>` }
    </html>
  `

                        return getBlobURL(source, 'text/html')
                    }

                    const url = getGeneratedPageURL({
                        html,
                        css: styles,
                        js: script,
                        CSS_CDN: externalCDN_CSS,
                        JS_CDN: externalCDN_JS,
                    })

                    previewFrame.src = url
                    function resizeIFrameToFitContent(iFrame) {
                        iFrame.width =
                            iFrame.contentWindow.document.body.scrollWidth
                        iFrame.height =
                            iFrame.contentWindow.document.body.scrollHeight
                    }

                    resizeIFrameToFitContent(previewFrame)
                })
        }
    render() {
        return (
            <div className="h-100vh w-100">
                <Helmet>
                    {this.state.cssCDN.map((cdn) => (
                        <link
                            href={ cdn.url }
                            rel="stylesheet"
                            crossorigin="anonymous"
                        />
                    ))}
                    {this.state.jsCDN.map((cdn) => (
                        <script src={ cdn.url } key={ cdn.id } />
                    ))}
                </Helmet>
                <ToastContainer></ToastContainer>
                <iframe
                    id="tabpreviewframe"
                    className="w-100 h-100"
                    title="classpreview"></iframe>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClassroomSwitch: (state) => dispatch(dispatchAppEnvironment(state)),
    }
}
export default connect(null, mapDispatchToProps)(classPreviewNewTab)
