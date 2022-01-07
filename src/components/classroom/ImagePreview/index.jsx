import React from 'react'
import './style.css';

export default function ImagePreview(props) {
  return (
      <div
          className="image_upload_preview"
          onClick={ props.closePreview }
          style={ { display: props.config.shouldDisplay ? 'flex' : 'none' } }>
          <button onClick={ props.closePreview } className="close_preview_button__">
              <i className="fa fa-times-circle fa-2x"></i>
          </button>
          <img
              className="image_upload_content"
              src={ props.config.url }
              alt="upload_preview"
          />
      </div>
  )
}
