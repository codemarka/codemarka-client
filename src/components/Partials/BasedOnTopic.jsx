// /* eslint-disable no-undef */
// import React, { useState, useRef,  } from 'react'

// import * as API_URLS  from '../../config/api_url';

// function HappeningNow() {

//   const [hasMounted, setHasMounted] = useState(false);
//   const content = useRef('');

//   if (!hasMounted) {

//     const fetchHappeningNow = () => {

//       const url = API_URLS.GET_LIVE_CLASS_SESSIONS;
//       const myHeaders = new Headers()
//       myHeaders.append('Content-Type', 'Application/json')

//       const fetchHappeningNowClassroomsRequest = new Request(url, {
//         method: 'GET',
//         cache: 'default',
//         headers: myHeaders,
//         mode: 'cors'
//       });

//       return fetch(fetchHappeningNowClassroomsRequest)
//     }
//     fetchHappeningNow().then(d => d.json()).then(rd => {
//       content.current = rd.data.map(tr => {
//         return (
//           <div className="col-6 col-md-3" key={tr.kid}>
//             <div className="card text-dark hover-translate-y-n3 hover-shadow-lg overflow-hidden">
//               <a
//                 href={`c/classroom/${tr.kid}`}
//               >
//                 <div className="card-body py-4">
//                   <small className="d-block text-sm mb-2">
//                     {tr.name.toUpperCase()} {' '}
//                                       (
//                                         {tr.classVisibility === 'Public' ? (
//                       <i className="fa fa-unlock"></i>
//                     ) : (
//                         <i className="fa fa-lock"></i>
//                       )}
//                                         )
//                                     </small>
//                   <b
//                     className="h5 stretched-link lh-150">
//                     {tr.topic}
//                   </b>
//                   <p className="mt-3 mb-0 lh-170">
//                     {tr.description}
//                   </p>
//                 </div>
//                 <div className="card-footer border-0 delimiter-top">
//                   <div className="row align-items-center">
//                     <div className="col-auto">
//                       <span className="avatar avatar-sm bg-success rounded-circle">
//                         {tr.location}
//                       </span>
//                       <span className="text-sm mb-0 avatar-content">
//                         <i className="fas fa-users"></i>{' '}
//                         {tr.students.length}
//                       </span>
//                     </div>
//                     <div className="col text-right text-right">
//                       <div className="actions">
//                         <a
//                           href="/heaerter"
//                           onClick={e =>
//                             e.preventDefault()
//                           }
//                           className="action-item">
//                           <i className="fa fa-heart mr-1 text-danger"></i>{' '}
//                           {tr.likes.length}
//                         </a>
//                         <a
//                           href="/liker"
//                           onClick={e =>
//                             e.preventDefault()
//                           }
//                           className="action-item">
//                           <i className=" fa fa-eye mr-1"></i>
//                           {tr.visits}
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </a>
//             </div>
//           </div>
//         )
//       })
//       setHasMounted(true);
//     }).catch(err => {
//       console.error(err);
//     })
//   }

//   return (
//     <div className="pt-5 pb-5 text-center">
//       <div className="row text-center align-content-center">
//           {content.current}
//       </div>
//     </div>
//   )
// }

// export default HappeningNow
