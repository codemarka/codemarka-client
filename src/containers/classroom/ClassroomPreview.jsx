import React from 'react';
import { connect } from 'react-redux';

// import { Redirect } from "react-router-dom";
// import * as action from "../../store/actions/";
import { dispatchAppEnvironment } from '../../store/actions/app';

import ColabClassPreviewLayout from './ColabClassPreviewLayout.jsx';

import './css/preview.css';

 const ClassroomPreview = (props) => {
    //  const { match: { params }  } = props;
  // const classroomId = params.classroom;
  const { onClassroomSwitch } = props;

  React.useEffect(() => {
      onClassroomSwitch('classroom')

    return () => {
      onClassroomSwitch('regular');
    };
  });
  
  const getContent = () => {
    
      return (
          <ColabClassPreviewLayout

        />
      );
  };
  return(
      <React.Fragment>
          {getContent()}
      </React.Fragment>
  )
}

const mapStateToProps = ({ auth, classroom }) => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClassroomSwitch: state => dispatch(dispatchAppEnvironment(state)),
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ClassroomPreview);
