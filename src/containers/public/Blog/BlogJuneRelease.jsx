import React from 'react';

import '../styles.css';
import Helmet from '../../../components/SEO/helmet';

export default function JUNE2020V_1POINT2() {

  return (
    <div className="header-container-fluid">
      <style>
        {`
          .blog-width{
            width:600px;
          }
          @media(max-width: 700px){
            .blog-width{
              width:400px;
            }
          }
          @media(max-width: 450px){
            .blog-width{
              width:calc(100vw - 50px);
            }
          }
        `}
      </style>
      <Helmet title="Version 1.2 Launched -June Release | Codemarka" metaDescription="" />
      <section class="slice py-8 bg-dark bg-cover bg-size--cover">
        <span class="mask bg-gradient-dark opacity-9"></span>
        <div
          data-offset-top="#navbar-main"
          style={{ paddingTop: '59px' }}>
          <div class="container d-flex align-items-center text-center text-lg-left py-5">
            <div class="col px-0">
              <div class="row row-grid align-items-center">
                <div class="col-lg-8 text-lg-left text-sm-left text-md-left">
                  <h1 class="text-white mb-4 tal-sm font-weight-bold">
                    Codemarka version 1.2 is here</h1>
                  <p class="lead text-white opaci ty-8 tal-sm font-weight-light">
                    Release notes: Rolled out attendance sheet Feature.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="shape-container shape-line shape-position-bottom"></div>
      </section>

      <section class="slice slice-lg">
        <div class="container blog-width">
          <h3>New Features</h3>

          <p>
            <ul>
              <li> <b className="badge badge-soft-primary">Attendance Sheet</b><br/>
                <i>One of the major problems of hosting remote technical workshops for various communities
                    was the issue of tracking who attended, we added an attendance system ONLY available to community accounts
                    , this attendance can be downloaded only in CSV format, more formats coming in future release.
                </i>
                </li>

                <li> <b className="badge badge-soft-primary">Classroom Invitation</b><br/>
                <i>You can now invite users to your classrooms, only users with an account on codemarka can be invited.
                    For now, use only emails to invite friends, usernames might be allowed in future release.
                </i>
                </li>

                
                <li> <b className="badge badge-soft-primary">Classroom Invitation</b><br/>
                <i>You can now invite users to your classrooms, only users with an account on codemarka can be invited.
                    For now, use only emails to invite friends, usernames might be allowed in future release.
                </i>
                </li>

                <li>
                    <b className="badge badge-soft-primary">File Upload</b>
                    <i>Files can be uploaded directly from your computer, files are detected automatically and applied
                        to the proper editor.
                    </i>
                </li>

                <li>
                    <b className="badge badge-soft-primary">External CDN</b>
                    <i>Use external CDN from your favourite libraries and build amazing stuffs on the go, visit the settings
                        modal in your classroom under the editor tab and add urls to any valid cdn of your choice.
                    </i>
                </li>

            </ul>
          </p>

          <h3>Bug Fixes</h3>
          <p>
            <ul>
                <li>Bug Free from last release :) </li>
            </ul>
          </p>

          <h3>UI/UX Improvements</h3>
          <p>
            <ul>
              <li> <b>Creating classrooms got easier.</b></li>
              <li> <b>Change Font Family, reduced size of few icons in classrooms.</b></li>
              <li><b>Changed Community header image and home page image</b></li>
            </ul>
          </p>
        </div>
      </section>
    </div>
  )
};