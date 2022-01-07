/* eslint-disable react/prop-types */
import React,{ useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Modal from '../../Partials/Modals/Modal'
import Input from '../../Partials/Input/Input'
import Spinner from '../../Partials/Preloader'
import { convertToReadableDateFormat } from '../../../utility/shared';
import { connect } from 'react-redux'

import * as action from '../../../store/actions';

function ClassroomInformation({
    owner,
    socket,
    onClassroomInfoUpdate,
    toast,
    gravatarChanged,
}) {
    const { classroom } = useSelector((state) => state)
    const [classInfo, setClassroomInformation] = useState({
        cname: {
            value: classroom.name,
        },
        cdesc: {
            value: classroom.description,
        },
        ctopic: {
            value: classroom.topic,
        },
        cschedule: {
            value: classroom.schedule,
        },
        cgravatar: {
            value: classroom.gravatarUrl,
        },
        submitted: false,
    })

    const [uploadingImage, setUploadingImage] = useState(false)

    const handleClassInfoUpdate = (e) => {
        e.preventDefault()

        setClassroomInformation((input) => {
            return { ...input, submitted: true }
        })
        if (owner) {
            socket.emit('classInformationUpdate', classInfo)
        }
    }

    useEffect(() => {
        socket.on('newClassInformation', (doc) => {
            setClassroomInformation((c) => {
                return { ...c, submitted: false }
            })
            onClassroomInfoUpdate(doc)
        })

        socket.on('action_failed', (reason) => {
            toast.error(reason)
        })

        socket.on('gravatar_image_upload_complete', (url) => {
            setClassroomInformation((c) => {
                return { ...c, cgravatar: { value: url } }
            })
            setUploadingImage(false)
            gravatarChanged(url)
        })
    }, [])

    const handleClassroomInformationInputChange = (e, inputname) => {
        const v = e.target.value

        setClassroomInformation((input) => {
            return { ...input, [inputname]: { value: v } }
        })
    }

    const handleGravatarRegeneration = (e) => {
        socket.emit('gravatarRegenerate', {
            room: classroom.kid,
            time: new Date(),
        })
    }

    const handleImageUploadChange = (e) => {
        setUploadingImage(true)
        const file = e.target.files[0]
        var reader = new FileReader()

        reader.onload = function (e) {
            socket.binary(true).emit('gravatar_image_upload', {
                data: e.target.result,
                name: file.name,
                time: new Date(),
                room: classroom.kid,
            })
        }
        reader.readAsDataURL(file)
    }
    return (
        <div>
            <Modal
                targetid="details_modal_cont"
                type="default"
                size="sm"
                buttonExtra={
                    owner ? (
                        <button
                            type="submit"
                            onClick={ handleClassInfoUpdate }
                            className="btn btn-sm float-left btn-soft-primary">
                            {classInfo.submitted ? <Spinner /> : 'Save'}
                        </button>
                    ) : (
                        false
                    )
                }
                title="classroom Information">
                <form onSubmit={ handleClassInfoUpdate }>
                    <div
                        className="mb-2 mt-2 d-flex justify-content-center align-items-center"
                        align="center">
                        <img
                            src={ classInfo.cgravatar.value }
                            alt="gravatar"
                            style={ {
                                borderRadius: '50%',
                                height: '3rem',
                                maxHeight: '3rem',
                                width: '3rem',
                            } }
                            height="50"
                        />
                        {owner ? (
                            <div className="ml-2">
                                <button
                                    onClick={ handleGravatarRegeneration }
                                    className="btn btn-sm btn-primary">
                                    Regenerate
                                </button>
                                <input
                                    className="btn btn-sm btn-info"
                                    disabled={ uploadingImage }
                                    value={
                                        uploadingImage
                                            ? 'uploading...'
                                            : 'Upload'
                                    }
                                    type="button"
                                    onClick={ () =>
                                        document
                                            .getElementById('gravatar_image')
                                            .click()
                                    }
                                />
                                <input
                                    type="file"
                                    hidden
                                    name="gravatar_image"
                                    id="gravatar_image"
                                    onChange={ handleImageUploadChange }
                                />
                            </div>
                        ) : (
                            ''
                        )}
                    </div>

                    <Input
                        name="cname"
                        label="Name"
                        elementType="input"
                        elementConfig={ {
                            disabled: owner ? false : true,
                            placeholder: 'Classroom Name',
                            name: 'cname',
                        } }
                        shouldDisplay={ true }
                        value={ classInfo.cname.value }
                        changed={ (e) =>
                            handleClassroomInformationInputChange(e, 'cname')
                        }
                    />
                    <Input
                        name="ctopic"
                        label="Topic"
                        elementType="input"
                        elementConfig={ {
                            disabled: owner ? false : true,
                            placeholder: 'Classroom Name',
                            name: 'ctopic',
                        } }
                        shouldDisplay={ true }
                        value={ classInfo.ctopic.value }
                        changed={ (e) =>
                            handleClassroomInformationInputChange(e, 'ctopic')
                        }
                    />
                    <Input
                        label="Description"
                        elementType="textarea"
                        elementConfig={ {
                            disabled: owner ? false : true,
                            placeholder: 'Classroom Name',
                            name: 'cdesc',
                        } }
                        shouldDisplay={ true }
                        value={ classInfo.cdesc.value }
                        changed={ (e) =>
                            handleClassroomInformationInputChange(e, 'cdesc')
                        }
                    />
                    <div>
                        <label className="form-control-label">
                            Scheduled Time
                        </label>
                        <div>
                            {convertToReadableDateFormat(
                                classInfo.cschedule.value
                            )}
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClassroomInfoUpdate: (data) => dispatch(action.updateRoomInfo(data)),
        gravatarChanged: (url) => dispatch(action.updateClassGravatar(url))
    }
}
export default connect(
    null,
    mapDispatchToProps
)(ClassroomInformation)
