/** @format */

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import AceEditor from './@React-Ace/index'
import { connect } from 'react-redux'

import { Range } from 'ace-builds'
import PropTypes from 'prop-types'
import InviteCollborator from './InviteAsCollaborator';

import './ace.css'

EditorAce.propTypes = {
    uploadFileFromSystem: PropTypes.func.isRequired,
    showPreview: PropTypes.func.isRequired,
    classroomid: PropTypes.string.isRequired,
    uploadingState: PropTypes.bool.isRequired,
    files: PropTypes.object,
    socket: PropTypes.object,
    user: PropTypes.string.isRequired,
    readOnly: PropTypes.bool.isRequired,
    handleEditorChange: PropTypes.func,
    canEdit: PropTypes.bool,
    handleFileDownload: PropTypes.func
}
function EditorAce(props) {
    
    const mapMode = {
        javascript: 'js',
        css: 'css',
        html: 'html',
    }
    const editorRef = useRef()
    const socketRef = useRef()
    const editorModeRef =  useRef('js');

    const [editorSettings, setEditorSettings] = useState({
        mode: 'javascript',
        value: '',
        loaded: false,
        editorOptions: {
            readOnly: !props.canEdit,
        },
        lastEditDelta: null,
        shouldEmit: false
    })
    const [loading, setloading] = useState(true)
    const [editorAction, setEditorAction] = useState('Loading..')
    const editorFiles = useRef({js:{},css:{},html:{}});
    const [editorUpdates, setEditorUpdates] = useState('')

        useEffect(() => {
            editorSettings.shouldEmit &&
                props.handleEditorChange(
                    editorSettings.value,
                    mapMode[editorSettings.mode],
                    editorSettings.lastEditDelta
                )
        }, [
            editorSettings.value,
            editorSettings.lastEditDelta,
            editorSettings.shouldEmit,
        ])

        useLayoutEffect(() => {
        socketRef.current = props.socket;

        socketRef.current.on('class_files', (css, html, js) => {
            setEditorSettings({ ...editorSettings, value: js.content })
            editorFiles.current.css =  css
            editorFiles.current.html = html
            editorFiles.current.js = js
        });

        socketRef.current.on('class_files_updated', (data) => {
          
            const EditorName = data.file
            const updatedContentForEditor = data.content
            const updatedBy = data.user
            // check preview states
            editorFiles.current[EditorName].content = updatedContentForEditor

            if(updatedBy === props.user){
            if (
                data.type === 'upload' &&
                editorModeRef.current === EditorName
            ) {
                setEditorSettings({
                    ...editorSettings,
                    value: updatedContentForEditor,
                    shouldEmit: false,
                })
            } else if (
                EditorName !== editorModeRef.current
            ) {
                setEditorUpdates(EditorName)
            }
            return;
            } else {
                if (
                    data.type === 'upload' &&
                    editorModeRef.current === EditorName
                ) {
                    setEditorSettings({
                        ...editorSettings,
                        value: updatedContentForEditor,
                        shouldEmit: false,
                    })
                }
            else if (
                data.type !== 'upload' &&
                String(updatedContentForEditor).length <= 0 &&
                mapMode[editorModeRef.current] === EditorName
            ) {
                editorRef.current.env.document.doc.setValue('')
            }
            if (
                updatedContentForEditor !==
                    editorRef.current.env.document.doc.getValue() &&
                EditorName === editorModeRef.current
            ) {
                
                const { action, start, lines } = data.deltaValue

                if (action !== 'remove') {
                    lines.length &&
                        lines.forEach((line, index) => {
                            const range = {
                                row: start.row + index,
                                column: start.column,
                            }
                            const rowAvailable = editorRef.current.env.document.doc.getLength()
                            if (range.row > rowAvailable - 1) {
                                editorRef.current.env.document.doc.insertMergedLines(
                                    range,
                                    ['', '']
                                )
                            }
                            editorRef.current.env.document.doc.insertInLine(
                                range,
                                line
                            )
                        })
                } else {
                    lines.length &&
                        lines.forEach((line, index) => {
                            const range_ = new Range(
                                data.deltaValue.start.row + index,
                                data.deltaValue.start.column,
                                data.deltaValue.end.row + index,
                                data.deltaValue.end.column
                            )
                            editorRef.current.env.document.doc.remove(
                                range_,
                                line
                            )
                        })
                }
                // if (
                //     editorRef.current.env.document.doc.getValue() !==
                //     updatedContentForEditor
                // ) {
                //     editorRef.current.env.document.doc.setValue(
                //         updatedContentForEditor
                //     )
                // }
            } else if (
                String(updatedContentForEditor) !==
                    String(editorSettings.value) &&
                EditorName !== editorModeRef.current
            ) {
                setEditorUpdates(EditorName)
            }
            }

        })

    }, [])

    const onEditorLoad = (editor) => {
        editorRef.current = editor
        setTimeout(() => {
             setloading(false)
        }, 2500);
        setEditorSettings({ ...editorSettings, loaded: true })
        editor.getSession().setUseWorker(false)
    }

    const handleFileUpload = () => {
        document.getElementById('editor_file_uploader_input').click()
    }

    useEffect(() => {
        setTimeout(
            () => {
                editorSettings.loaded && setloading(props.uploadingState)

                props.uploadingState && setEditorAction('Uploading File Content..')
            },
            props.uploadingState ? 2000 : 0
        )

    }, [props.uploadingState])

    /**
     * Set new Mode (editor tab click event listener)
     */
    const setEditorMode = async (e, mode) => {
        e.preventDefault();

        await setEditorSettings({
            ...editorSettings,
            mode: mode,
            value: props.files[mapMode[mode]].content,
            shouldEmit: false
        })
        editorModeRef.current = mapMode[mode]
        
        await setEditorUpdates('')
    }

    /**
     * Editor Content Change handler
     * @return void
     */
    const onEditorContentChange = (content, delta) => {
        // 
        
                if(props.canEdit) {
                    setEditorSettings((s) => {
                        if(s.value !== content){
                         return { ...s, value:content, lastEditDelta: delta, shouldEmit: true }
                        }
                        return s;
                    })
                }
    }

    const handleFileSync = (e) => {
        e.preventDefault();
    }
    const handleCollaboratorIV = (e) => {
        document.getElementById('addAsCollaboratorButton') &&
            document.getElementById('addAsCollaboratorButton').click();
    }

    return (
        <div className="codemarka-editor-container">
            <input
                type="file"
                id="editor_file_uploader_input"
                className="d-none"
            />
            <div className="editor-tabs">
                <div
                    onClick={ (e) => setEditorMode(e, 'html') }
                    className={ `editor-tab ${
                        editorUpdates === 'html' ? 'tab-updated ' : ''
                    } ${ editorSettings.mode === 'html' ? ' tab-active' : '' }` }>
                    <i
                        className="fab fa-html5"
                        style={ { color: '#c77d31' } }></i>{' '}
                </div>

                <div
                    onClick={ (e) => setEditorMode(e, 'css') }
                    className={ `editor-tab ${
                        editorUpdates === 'css' ? 'tab-updated ' : ''
                    } ${ editorSettings.mode === 'css' ? 'tab-active' : '' }` }>
                    <i
                        className="fab fa-css3-alt"
                        style={ {
                            color: 'cornflowerblue',
                        } }></i>
                </div>

                <div
                    onClick={ (e) => setEditorMode(e, 'javascript') }
                    className={ `editor-tab
                    ${ editorUpdates === 'js' ? 'tab-updated ' : '' }
                    ${
                        editorSettings.mode === 'javascript' ? 'tab-active' : ''
                    }` }>
                    <i
                        className="fab fa-js-square"
                        style={ { color: '#f5f555' } }></i>
                </div>

                <div className="editing-status">
                    <div
                        className={ `eitor_access_state badge badge-${
                            props.canEdit ? 'success' : 'primary'
                        } badge-pill` }>
                        {props.canEdit ? (
                            <i className="fa fa-pen-alt"> Edit mode</i>
                        ) : (
                            <i className="fa fa-eye"> Read only</i>
                        )}
                    </div>
                </div>

                <div className="editor-actions">
                    <span
                        dataToggle="tooltip"
                        dataPlacement="bottom"
                        title="Invite or Add Collaborators"
                        onClick={ handleCollaboratorIV }
                        type="button">
                        <i className="fa fa-user-plus"></i>
                    </span>
                    <a
                        target="_blank"
                        type="button"
                        title="Open In New Tab"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        className="fas fa-external-link-alt text-white-50"
                        href={ `/c/classroom/preview/${ props.classroomid }` }></a>
                    <span
                        title="Upload File"
                        type="button"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        className={ `${ !props.canEdit ? 'disabled' : 'active' }` }
                        onClick={ props.canEdit && handleFileUpload }>
                        <i className="fa fa-cloud-upload-alt"></i>{' '}
                    </span>
                    <span
                        title="Download Files"
                        type="button"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        onClick={ props.handleFileDownload }>
                        <i className="fa fa-file-archive"></i>{' '}
                    </span>
                    <span
                        title="Preview"
                        data-toggle="modal"
                        data-target="#modal_1"
                        type="button"
                        onClick={ props.showPreview }>
                        <i className="fa fa-play-circle"></i>
                    </span>
                    <span
                        title="Sync Editor Contents"
                        type="button"
                        onClick={ handleFileSync }>
                        <i className="fa fa-sync-alt"></i>
                    </span>
                </div>
            </div>

            <div className="ace-editor-container">
                <div
                    className="ace-editor-backdrop"
                    style={ { display: loading ? 'flex' : 'none' } }>
                    <div className="spinner-border text-success" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <span>{editorAction}</span>
                </div>
                <AceEditor
                    mode={ editorSettings.mode }
                    theme="dracula"
                    onChange={ onEditorContentChange }
                    editorProps={ editorSettings.editorOptions }
                    name="codemarka-deditor"
                    setOptions={ {
                        enableBasicAutocompletion: true,
                        enableSnippets: true,
                        enableLiveAutocompletion: true,
                    } }
                    rr
                    onLoad={ onEditorLoad }
                    value={ editorSettings.value }
                    height="100%"
                    className="ace-codemarka"
                    focus={ true }
                    showGutter
                    readOnly={ editorSettings.editorOptions.readOnly }
                    showLineNumbers
                    width="100%"
                />
            </div>
            <InviteCollborator user={ props.user } socket={ socketRef.current } classroom={ props.room }/>
        </div>
    )
}

const mapStateToProps = ({ classroom, auth }) => {
    
    const WRITE_ACCESS = classroom.participants.find(participant => {
        return participant ===  auth.user.accountid && participant.accessControls.editor.write
    })

    return {
        canEdit: auth.user.accountid === classroom.owner || WRITE_ACCESS,
        room: classroom.kid,
    }
}
export default connect(mapStateToProps, null)(EditorAce)
