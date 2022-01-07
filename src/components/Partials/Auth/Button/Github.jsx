import React from "react";

import githubIcon from '../../../../media/images/icons/brands/github.svg';

export default function Github(props) {
  return (
      <a href={ props.link } className="btn btn-block btn-neutral btn-icon mb-3 mb-sm-0">
          <span className="btn-inner--icon">
              <img src={ githubIcon } alt=" placeholder" />
          </span>
          <span className="btn-inner--text">Github</span>
      </a>
  );
}
