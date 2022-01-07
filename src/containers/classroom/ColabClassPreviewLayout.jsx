// import React from 'react'
// import PropTypes from 'prop-types'

// function ColabClassPreviewLayout(props) {
//   return (
//       <div>
//           <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
//               <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/#">
//                   codemarka
//               </a>
//               <ul className="navbar-nav px-3">
//                   <li className="nav-item text-nowrap">
//                       <a className="nav-link" href="/auth/user/logout">
//                           Sign out
//                       </a>
//                   </li>
//               </ul>
//           </nav>

//           <div className="container-fluid">
//               <div className="row">
//                   <nav className="col-md-2 d-none d-md-block bg-light sidebar">
//                       <div className="sidebar-sticky">
//                           <ul className="nav flex-column">
//                               <li className="nav-item">
//                                   <a className="nav-link " href="/#">
//                                       <i className="fa fa-home pr-2"></i>
//                                       Dashboard{' '}
//                                       <i className="sr-only">(current)</i>
//                                   </a>
//                               </li>
//                               <li className="nav-item">
//                                   <a className="nav-link active" href="/#">
//                                       <i className="fa fa-file pr-2"></i>
//                                       Classrooms
//                                   </a>
//                               </li>
//                               <li class="nav-item">
//                                   <a class="nav-link" href="/#">
//                                       <i className="fa fa-shopping-cart pr-2"></i>
//                                       Activity
//                                   </a>
//                               </li>
//                               <li class="nav-item">
//                                   <a class="nav-link" href="/#">
//                                       <i className="fa fa-users pr-2"></i>
//                                       Students
//                                   </a>
//                               </li>
//                               <li class="nav-item">
//                                   <a class="nav-link" href="/#">
//                                       <i className="fa pr-2 fa-gears"></i>
//                                       Settings
//                                   </a>
//                               </li>
//                               <li class="nav-item">
//                                   <a class="nav-link" href="/#">
//                                       <i className="fa pr-2 fa-plus-square-o"></i>
//                                       Upgrade Plan
//                                   </a>
//                               </li>
//                           </ul>
//                       </div>
//                   </nav>

//                   <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
//                       <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
//                           <h1 class="h2">ClassName - class_id</h1>
//                           <div class="btn-toolbar mb-2 mb-md-0">
//                               <div class="btn-group mr-2">
//                                   <button class="btn btn-sm btn-outline-success">
//                                       Start
//                                   </button>
//                                   <button class="btn btn-sm btn-outline-danger">
//                                       Delete
//                                   </button>
//                                   <button class="btn btn-sm btn-outline-info">
//                                       Copy Link
//                                   </button>
//                               </div>
//                           </div>
//                       </div>
//                       <div className="row">
//                           <div className="col-md-4">
//                               <div class="card border-0 shadow-lg rounded-lg ">
//                                   <div className="card-header bg-dark text-white text-capitalize">
//                                       OVERVIEW
//                                   </div>
//                                   <div class="card-body">
//                                       <div>
//                                           <h5 class="font-weight-bold text-left pr-1 mb-1">
//                                               No In Class - 39
//                                           </h5>
//                                           <h5 class="font-weight-bold text-left pr-1 mb-1">
//                                               Total Messages - 39
//                                           </h5>
//                                           <h5 class="font-weight-bold text-left pr-1 mb-1">
//                                               Stars - 0
//                                           </h5>
//                                           <h5 class="font-weight-bold text-left pr-1 mb-1">
//                                               Audio Broadcast - No
//                                           </h5>
//                                       </div>
//                                   </div>
//                               </div>
//                           </div>

//                           <div className="col-md-4">
//                               <div class="card border-0 shadow-lg rounded-lg ">
//                                   <div className="card-header bg-dark text-white text-capitalize">
//                                       EDITORS
//                                   </div>
//                                   <div class="card-body">
//                                       <div>
//                                           <h5 class="font-weight-bold text-left pr-1 mb-1">
//                                               Last edit -
//                                           </h5>
//                                           <h5 class="font-weight-bold text-left pr-1 mb-1">
//                                               last edit by -
//                                           </h5>
//                                       </div>
//                                   </div>
//                               </div>
//                           </div>

//                           <div className="col-md-4">
//                               <div class="card border-0 shadow-lg rounded-lg ">
//                                   <div className="card-header bg-dark text-white text-capitalize">
//                                       USER REPORTS
//                                   </div>
//                                   <div class="card-body">
//                                       <div>
//                                           <h5 class="font-weight-bold text-left mb-0">
//                                               Non
//                                           </h5>
//                                       </div>
//                                   </div>
//                               </div>
//                           </div>

//                           <div className="col-12 mt-4">
//                               <div class="card border-0 shadow-lg rounded-lg ">
//                                   <div className="card-header bg-dark text-white text-capitalize">
//                                       ACTIONS
//                                   </div>
//                                   <div class="card-body">
//                                       <div className="row">
//                                           <div class="col-4">
//                                               <div className="align-content-lg-start">
//                                                   <label>Chat Disabled</label>
//                                                   <select class="custom-select">
//                                                       <option value="1">
//                                                           True
//                                                       </option>
//                                                       <option value="2">
//                                                           False
//                                                       </option>
//                                                   </select>
//                                               </div>

//                                               <div className="align-content-lg-start">
//                                                   <label>
//                                                       Joining Disabled
//                                                   </label>
//                                                   <select class="custom-select">
//                                                       <option value="1">
//                                                           True
//                                                       </option>
//                                                       <option value="2">
//                                                           False
//                                                       </option>
//                                                   </select>
//                                               </div>

//                                               <div className="align-content-lg-start">
//                                                   <label>
//                                                       ClassFile Download
//                                                       Disabled
//                                                   </label>
//                                                   <select class="custom-select">
//                                                       <option value="1">
//                                                           True
//                                                       </option>
//                                                       <option value="2">
//                                                           False
//                                                       </option>
//                                                   </select>
//                                               </div>
//                                           </div>
//                                           <div class="col-4">
//                                               <div className="align-content-lg-start">
//                                                   <label>
//                                                       Disabled Editor
//                                                       modification
//                                                   </label>
//                                                   <select class="custom-select">
//                                                       <option value="1">
//                                                           True
//                                                       </option>
//                                                       <option value="2">
//                                                           False
//                                                       </option>
//                                                   </select>
//                                               </div>

//                                               <div className="align-content-lg-start">
//                                                   <label>Visibility</label>
//                                                   <select class="custom-select">
//                                                       <option value="1">
//                                                           Public
//                                                       </option>
//                                                       <option value="2">
//                                                           Private
//                                                       </option>
//                                                   </select>
//                                               </div>

//                                               <div className="align-content-lg-start">
//                                                   <label>
//                                                       Class Size Limit
//                                                   </label>
//                                                   <div class="form-group">
//                                                       <input
//                                                           type="number"
//                                                           class="form-control"
//                                                       />
//                                                   </div>
//                                               </div>
//                                           </div>
//                                           <div class="col-4">
                                          
//                                           </div>
//                                       </div>
//                                   </div>
//                               </div>
//                           </div>
//                           <div className="col-12 mt-3 mb-3">
                                
//                           </div>
//                       </div>
//                   </main>
//               </div>
//           </div>
//       </div>
//   )
// }

// ColabClassPreviewLayout.propTypes = {
//   children: PropTypes.any
// }

// export default ColabClassPreviewLayout
