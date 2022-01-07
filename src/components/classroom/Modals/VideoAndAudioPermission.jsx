/**
 * /* eslint-disable react/prop-types
 *
 * @format
 */

import React from 'react'
import Modal from '../../Partials/Modals/Modal'

export default function VideoAndAudioPermission() {
    return (
        <div>
            <button
                className="d-none"
                data-toggle="modal"
                data-target="#audio_video_permission"
                id="video_permission"></button>
            <Modal
                title="Allow Codemarka to use your microphone and camera"
                targetid="audio_video_permission"
                type="default"
                close
                closeCaption="dismiss"
                size="sm">
                <div
                    className="mb-2 mt-2 d-flex justify-content-center align-items-center"
                    align="left">
                    Codemarka needs access to your camera and microphone so that
                    only your instructor can see and hear you. Codemarka will
                    ask you to confirm this decision on each browser and
                    computer you use.
                </div>
            </Modal>
        </div>
    )
}
