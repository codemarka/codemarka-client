import React from 'react'

import Component from './Component';
import Types from "./Types";

export default function Alert(props) {
    switch (props.type) {
        case Types.success:
          return <Component clicked={ props.clicked }  type={ Types.success } display={ props.display } message={ props.children } title={ props.title }/> 
        case Types.danger:
          return <Component  clicked={ props.clicked } type={ Types.danger } display={ props.display } message={ props.children } title={ props.title }/>
        default:
          return <Component clicked={ props.clicked } type='info' display={ props.display } message={ props.children } title={ props.title }/> 
    }
}
