import React from 'react';

const Component = props => {
  return (
      <div
      className={ `alert alert-${ props.type }  alert-dismissible fade show d-${ props.display ? 'block' : 'none' }` }
      role="alert"
      align="center"
      ref={ props.ref }
    >
          {props.message}
      
      </div>
  );
};

export default Component;
