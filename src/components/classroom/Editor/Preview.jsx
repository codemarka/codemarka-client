import React from 'react'

export default function Preview(props) {

    function closeModal() {
        document.querySelector('#modal_1').style.display = 'none'
        document.querySelector('.modal-backdrop').style.display = 'none'

    }
    return (
        <div>
            <div
                className="modal modal-fluid fade"
                id="modal_1"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="modal_1"
                aria-hidden="true">
               
                <div
                        className="modal-dialog modal-lg"
                        style={ {display: 'flex',height: '100%',maxWidth: '100%'} }
                        role="document">
                    <div
                            className="modal-content"
                            style={ {background:'transparent'} }
                           >
                        <div className="modal-body" style={ {padding:0,margin:50} }>
                              
                            <iframe
                                            title="preview"
                                            className="w-100 h-100"
                                            id="preview_iframe"
                                            style={ {borderRadius:'5px'} }
                                        />
                        </div>
                    </div>
                </div>

                <button
                    onClick={ closeModal }
                   className="close_preview_button">
                    <i className="fa fa-window-close fa-2x"></i>
                </button>
                <a
                    target="_blank"
                    title="Open new tab"
                    rel="noopener noreferrer"
                    href={ `/c/classroom/preview/${ props.classroomid }` }
                    className="open_new_tab_btn">
                    <i className="fa fa-external-link-square-alt fa-2x"></i>
                </a>
            </div>
        </div>
    )
}
