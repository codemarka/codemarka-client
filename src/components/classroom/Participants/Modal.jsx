/* eslint-disable react/prop-types */
import React from 'react'
import './style.css'
const Modal = ({
    userid,
    ownerid,
    users,
    toogleUserEditAccess,
    owner,
    sendUserPrivateMessage,
    waveAtUser,
    blockUser,
    handleAddUserIconClicked
}) => {
    let users__ = 'Waiting for people to join...'

    if (users && users.length > 0) {
         users__ =  users.map(u => {
             return (
                 <li className="participant-container" key={ u.kid }>
                     <div className="user-username-image">
                         <img
                             alt={
                                 u.username.toUpperCase()[0] +
                                 '' +
                                 u.username.toUpperCase()[1]
                             }
                             src={ u.avatar }
                             class="avatar  rounded-circle avatar-sm"
                         />
                         <a
                             target="_blank"
                             href={ `/u/${ u.username }?ref=classroom` }
                             className="text-dark font-weight-normal pl-2">
                             <b>
                                 @{u.username} {userid === u.kid && ' (You)'}
                                 {ownerid === u.id ? '(admin)' : ''}
                             </b>
                         </a>
                     </div>

                     <span className="user-actions">
                         {owner && userid !== u.kid ? (
                             <div className="ml-5">
                                 <b
                                     onClick={ (e, user = u) =>
                                         waveAtUser(e, user)
                                     }
                                     style={ { cursor: 'pointer' } }
                                     className="text-dark p-1">
                                     <i className="fa fa-hand-paper"></i> 
                                 </b>

                                 <b
                                     onClick={ (e, user = u) =>
                                         blockUser(e, user)
                                     }
                                     style={ { cursor: 'pointer' } }
                                     className="text-danger p-1">
                                     <i className="fa fa-ban"></i> 
                                 </b>
                                 <b
                                     onClick={ (e, user = u) =>
                                         toogleUserEditAccess(e, user)
                                     }
                                     style={ { cursor: 'pointer' } }
                                     className="text-primary p-1">
                                     <i className="fa fa-chalkboard-teacher"></i>
                                 </b>
                             </div>
                         ) : (
                             <div className="ml-5">
                                 {userid !== u.kid && (
                                     <b
                                         onClick={ (e, user = u) =>
                                             waveAtUser(e, user)
                                         }
                                         style={ { cursor: 'pointer' } }
                                         className="text-dark p-1">
                                         <i className="fa fa-hand-paper"></i>{' '}
                                         
                                     </b>
                                 )}
                             </div>
                         )}
                     </span>
                     {/* {owner ? (
                             <div>
                                 <select
                                     className="d-inline custom-select"
                                     onChange={(e) =>
                                         toogleUserEditAccess(e, u)
                                     }>
                                     <option
                                         selected={
                                             u.role === '1' ? true : false
                                         }
                                         value="1">
                                         User Role
                                     </option>
                                     <option
                                         selected={
                                             u.role === '2' ? true : false
                                         }
                                         value="2">
                                         Editor Access Role{' '}
                                     </option>
                                     <option
                                         selected={
                                             u.role === '3' ? true : false
                                         }
                                         value="3">
                                         Classroom Access Role
                                     </option>
                                 </select>
                             </div>
                         ) : (
                             ''
                         )} */}
                 </li>
             ) 
         
        })
    }

    if (
        users__ &&
        Array.isArray(users__) &&
        users__.length === 1 &&
        users__[0] === undefined
    ) {
        users__ = 'No one has joined yet.'
        if(owner){
            users__ =  'Your students are yet to join, try inviting them, via email or username by clicking the icon below.'
        }
    }
    
    return (
        <div class="modal fade docs-example-modal-lg" id="participantModal" tabIndex="-1" role="dialog" aria-labelledby="participantModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title h6" id="participantModalLabel">Participants In Room</h5>
                        <button type="button" id="participantModalExitButton" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <ul className="list-group">
                            {users__}
                        </ul>
                    </div>
                    {owner ? (
                        <div>
                            <i
                                    onClick={ handleAddUserIconClicked }
                                    className="float-right fa fa-user-plus fa-1x"
                                    style={ {
                                        margin: 20,
                                        color: '#E91E63'
                                    } }></i>
                        </div>
                        ) : (
                            ''
                        )}
                </div>
            </div>
        </div>
      )
}

export default Modal
