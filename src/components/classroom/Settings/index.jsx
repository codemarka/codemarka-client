/**
 * /* eslint-disable react/prop-types
 *
 * @format
 */

import React,{ useState, useEffect } from 'react'
import Editors from './Editors/index.jsx';
import Modes from './Modes/index.jsx';
import More from './More/index.jsx';
import Behaviour from './Behaviour/index.jsx'
import'./style.css';
 
export default function ClassroomModalSettings(props) {
    const [tab, setTab] = useState('Editors')
    const [component, setComponent] = useState(<Editors { ...props }/>)

    useEffect(() => {
        setComponent(<Editors { ...props } />)
    },[])
    
    const handleTabSelection = e => {
        e.preventDefault()
        const E = e.target.innerHTML
        setTab(e.target.innerHTML)

        switch (E) {
            case 'Editors':
                setComponent(<Editors { ...props } />)
                break
            case 'Modes':
                setComponent(<Modes { ...props } />)
                break
            case 'More':
                setComponent(<More { ...props } />)
                break
            case 'Behaviour':
                setComponent(<Behaviour { ...props } />)
                break
            default:
                setComponent(<Editors { ...props } />)
                break
        }
    }

    return (
        <div>
            <div
                className={
                    'modal text-white fade modal-default docs-example-modal-md'
                }
                id="classroom_settings_modaal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                style={ { backgroundColor: 'rgba(8, 8, 8, 0.72)' } }
                aria-hidden="true">
                <div
                    className="modal-dialog  modal-dialog-centered"
                    role="document">
                    <div
                        className="modal-content  bg-dark"
                        style={ { height: 'auto', overflow: 'auto' } }>
                        <div className="modal-header">
                            <b className="modal-title" id="exampleModalLabel">
                                Classroom Settings
                            </b>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body h-auto overflow-y container-fluid">
                            <ul class="nav nav-tabs">
                                <li class="nav-item">
                                    <a
                                        class={ `nav-link ${
                                            tab === 'Editors' ? 'active' : ''
                                        }` }
                                        onClick={ handleTabSelection }
                                        href="#editors">
                                        Editors
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        class={ `nav-link ${
                                            tab === 'Behaviour' ? 'active' : ''
                                        }` }
                                        onClick={ handleTabSelection }
                                        href="#behaviour">
                                        Behaviour
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>{component}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
