import React from 'react';
import { Link } from 'react-router-dom'

import * as APPURL from '../../config/url';

import './styles.css';
import Helmet from '../../components/SEO/helmet';

export default function Home() {
  const blogData = [
      { authorShortName: 'JA', url: APPURL.MAY_RELEASE, shortDescription: "We've focused more on imporving the user experinence of the authentication system..", title: "Codemarka V1.1 May Release", img: '', date: '30th April,2020',author:'Johnson Awah Alfred' },
      { authorShortName: 'JA', url: APPURL.JUNE_RELEASE, shortDescription: "Rolled out attendance sheet Feature and a few exciting features for an awsome...", title: "Codemarka V1.2 June Release", img: '', date: '31st May,2020',author:'Johnson Awah Alfred' },
      
    ]
  return (
      <div className="header-container-fluid">
          <Helmet title="Blog | Codemarka" metaDescription="" />
          <section
              class="slice slice-lg py-7 bg-cover bg-size--cover"
              style={{backgroundImage:'url(../../assets/img/backgrounds/img-5.jpg)'}}>
              <span class="mask bg-dark opacity-8"></span>
              <div
                  class="container d-flex align-items-center"
                  data-offset-top="#navbar-main"
                  style={{paddingTop: '59px'}}>
                  <div class="col py-5">
                      <div class="row align-items-center justify-content-center">
                          <div class="col-md-7 col-lg-7 text-center">
                              <h1 class="display-4 text-white mb-2">
                                  <strong>Codmarka</strong> Blog
                              </h1>
                              <span class="text-white text-sm">
                                  check out for bug fixes, improvements and new features on our
                                  monthly realeases.
                              </span>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          <section class="slice pt-5 pb-7 bg-section-secondary">
              <div class="container">
                  <div class="row">
                      {blogData.map(blogPost => {
                          return (
                              <div class="col-xl-4 col-md-6">
                                  <div class="card hover-translate-y-n3 hover-shadow-lg overflow-hidden">
                                      <div class="position-relative overflow-hidden"></div>
                                      <div class="card-body py-4">
                                          <small class="d-block text-sm mb-2">{blogPost.date}</small>
                                          <Link to={blogPost.url} class="h5 stretched-link lh-150">{blogPost.title}</Link>
                                          <p class="mt-3 mb-0 lh-170">{blogPost.shortDescription}</p>
                                      </div>
                                      <div class="card-footer border-0 delimiter-top">
                                          <div class="row align-items-center">
                                              <div class="col-auto">
                                                  <span class="avatar avatar-sm bg-primary rounded-circle">{blogPost.authorShortName}</span>
                                                  <span class="text-sm mb-0 avatar-content">{blogPost.author}</span></div><div class="col text-right text-right">
                                                      <div class="actions"><a href={blogPost.url} class="action-item">
                                                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                                                          viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                          stroke-width="2" stroke-linecap="round"
                                                          stroke-linejoin="round" class="feather feather-heart mr-1">
                                                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> 50</a>
                                                          <a href={blogPost.url} class="action-item"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye mr-1">
                                                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> 250</a></div></div></div></div></div></div>
                          )
                      })}

                  </div>
              </div>
          </section>
      </div>
  )
};