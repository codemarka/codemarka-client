import React from 'react';
import { Link } from 'react-router-dom';

import '../styles.css';
import Helmet from '../../../components/SEO/helmet';
import * as APPURL from '../../../config/url';

export default function VERSION2() {

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
      <Helmet title="Version 1.1 Launched -May Release | Codemarka" metaDescription="" />
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
                    Codemarka version 1.1 is released</h1>
                  <p class="lead text-white opaci ty-8 tal-sm font-weight-light">
                    Release notes: Community Accounts were rolled out and they are totally free, create a free acccount today
                    and let your memebers join to keep up to date with your upcoming events.</p>
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
              <li> <b>Github Authentication</b><br/>
                <i>We added github oauth as an option to create an account or login to your accounts in just
                a few clicks. Github Authenticated users would in future be able to export classrooms files
                  to their repository by default. visit <Link to={APPURL.AUTH_SIGN_IN}>HERE</Link> to get started.
                </i>
                </li>

              <li> <b> Community Accounts </b> <br/>
              <i> The big one, in support of communities that cannot meet physically during the pandemic, we rolled out quicky,
                community accounts to help leaders gather their members easily and have sessions. In addition to this, users can
                join and get notified of upcoming sessions by their favourite communities. We provided dedicated pages
                for each individual community with full details about them. Get started <Link to={APPURL.COMMUNITY_ACCOUNT_SIGNUP_PAGE}>HERE.</Link>
                View communities around from <Link to={APPURL.COMMUNITY_INDEX}>HERE.</Link>
              </i>
               </li>
              <li> <b> Url detection </b><br/>
              During class sessions, users send links, we reduced the hassle of copying and pasting the links by detecting urls , hightlighting
              then with a pink color and opening this link in a new tab. Join a classroom, find a link and try this out, it sure works just fine.
              </li>

              <li><b> Online/Offline Status</b><br/>
              In accordance with a user experience improvement, we added an online /offline status located at the user
              status bar above conversation. This helps you know easily when you are disconnected and attempt to reconnect or
              check faults. Although we try to attempt connection, after a failed interval we still notify you of this so you can
              take the next steps to re-connect and continue learning.
              </li>

              <li><b> Upcoming Community Class Sessions </b><br/>
                Get to see upcomming class sessions by your favourite community on the landing page once you are authenticated, full
                detais of the sessions are provided.
               </li>

              <li><b>Classroom Omini Presence</b><br/>
                You can be in one or more class sessions at the same time, in future we tend to remove this as it not in accordance
                to what our motives are, you can't be in two physical classrooms at once. Depending on the classroom session, we may allow
                multiple classroom sessions for a particular user.
              </li>
            </ul>
          </p>

          <h3>Bug Fixes</h3>
          <p>
            <ul>
              <li> <b>Oauth Fixes </b> <br/>
              Users had bad experiences creating accounts with google Authentication, which in turn broke our
              servers whenever there was such an attempt, we fixed this and hope it never breaks again.
              </li>
              <li> <b>Classroom Waves</b> <br/>
              Waving users in the same classroom broke the application when attempted, this was fixed, happy waving.
              </li>
            </ul>
          </p>

          <h3>UI/UX Improvements</h3>
          <p>
            <ul>
              <li> <b>Reduced classroom notifications</b></li>
              <li> <b>Username colors, font size and element position.</b></li>
            </ul>
          </p>
        </div>
      </section>
    </div>
  )
};