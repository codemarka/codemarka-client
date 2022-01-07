import React from 'react';
import { Link } from 'react-router-dom';

import * as URLs from '../../config/url';

export default function Input(props) {
    const selectClasses = ['custom-select', 'custom-select-lg']
       const InputClasses = ['form-control']
       if (props.elementType === 'input') {
           if (!props.valid && props.touched) {
               InputClasses.push('is-invalid')
           } else if (props.valid && props.touched) {
               InputClasses.push('is-valid')
           }
       } else {
           if (!props.invalid && props.touched) {
               selectClasses.push('is-invalid')
           } else if (props.invalid && props.touched) {
               selectClasses.push('is-valid')
           }
       }
  const regular = (
      <div className="form-group mb-4">
          <div className="d-flex align-items-center justify-content-between">
              <div>
                  <label className="form-control-label">{props.label}</label>
              </div>
              {props.isLoginPasswordInput && props.forgotPassword ? (
                  <div className="mb-2">
                      <Link
                          to={ URLs.AUTH_FORGOT_PASSWORD }
                          className="small text-muted text-underline--dashed border-primary">
                          Forgot password?
                      </Link>
                  </div>
              ) : (
                  ''
              )}
          </div>
          <div className="input-group input-group-merge">
              {props.initialPrepend ? (
                  <div className="input-group-prepend">
                      <span className="input-group-text">
                          {props.initialPrependsvg}
                      </span>
                  </div>
              ) : (
                  ''
              )}
              <input
                  type={ props.type }
                  className={ InputClasses.join(' ') }
                  id={ props.id || '' }
                  name={ props.name || '' }
                  placeholder={ props.placeholder }
                  onChange={ props.changed }
                  value={ props.value }
              />
              {props.finalAppend ? (
                  <div className="input-group-append">
                      <span className="input-group-text">
                          <a
                              href="/#"
                              data-toggle="password-text"
                              data-target="#input-password">
                              {props.finalAppendsvg}
                          </a>
                      </span>
                  </div>
              ) : (
                  ''
              )}
          </div>
      </div>
  )
  const checkbox = (
      <div className="my-4">
          <div className="custom-control custom-checkbox mb-3">
              <input
          type="checkbox"
          selected={ props.selected }
          className="custom-control-input"
          onSelect={ props.clicked }
          id="check-terms"
        />
              <label className="custom-control-label" htmlFor="check-terms">
                  {props.children}
              </label>
          </div>
      </div>
  );

  const select = (
      <div className="form-group mb-4">
          <div className="d-flex align-items-center justify-content-between">
              <div>
                  <label className="form-control-label">{props.label}</label>
              </div>
             
          </div>
          <div className="input-group input-group-merge">
             
              <select
                  onChange={ props.changed }
                  onKeyDown={ props.KeyDown }
                  className={ selectClasses.join(' ') }
                  defaultValue={ props.value }>
                  {props.elementConfig
                      ? props.elementConfig.options.map((option) => (
                          <option
                                value={ option.value }
                                key={ option.key || option.value }>
                              {option.displayValue}
                          </option>
                        ))
                      : ''}
              </select>
          </div>
      </div>
  )
  switch (props.fieldtype) {
    case 'checkbox':
      return checkbox;
    case 'select':
        return select;
    default:
      return regular;
  }
}
