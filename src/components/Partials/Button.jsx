import React from 'react';

export default function Button(props) {
  return (
      <button
      onClick={ props.clicked }
      type={ props.type || 'button' }
      className={ `mb-2 btn btn-${ props.color } ${ props.block ? 'btn-block' : '' }  ${ props.animation } btn-${
        props.size
      } ${ props.icon || '' }` }
      disabled={ props.disabled }
      style={ { color: `${ props.textColor || 'inherit' }` } }
    >
          {props.children}
      </button>
  );
}
