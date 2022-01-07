/** @format */

import React, { useState, useEffect } from 'react'
import Button from '../../../Partials/Button'
import Input from '../../../Partials/Input/Input'
import Spinner from '../../../Partials/Preloader'

import * as API_URL from '../../../../config/api_url';

const JavascripTab = (props) => {
    const [state, setState] = useState({
        controls: {
            preprocessor: {
                label: 'Javascript Preprocessor',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 0,
                            displayValue: 'None',
                        },
                        {
                            value: 'TS',
                            displayValue: 'Typescript',
                        }
                    ],
                },
                value: 0,
            },
        },
        scontrols: {
            externalCDN: {
                elementConfig: {
                    placeholder: 'https://somesite.com/script/index.js',
                },
                value: '',
                elementType: 'text',
            },
        },
        formisValid: false,
        formisSubmitted: props.loading ? true : false,
        formErrorMessage: false,
        formErrored: false,
        externalCDN:[],
        preprocessor:''
    })
    const inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...state.controls,
            [controlName]: {
                ...state.controls[controlName],
                value: event.target.value,
                touched: true,
            },
        }

        setState({ ...state, controls: updatedControls })
    }

    const mapExternalCDN = () => {
        return state.externalCDN.map(cdn => {
            return <div key={ cdn.id } className="badge badge-soft-warning d-block"> {cdn.url.slice(0,30)} </div>

        })
    }
  
    const handleExternalCDNInputChange = (e) => {
        e.preventDefault();
        setState({...state, scontrols:{...state.scontrols,externalCDN:{...state.scontrols.externalCDN,value: e.target.value}}});
    }
   
  useEffect(() => {
      
      props.socket.on('editor_settings_update_feedback',function(status){
      if(status){
      setState(s => { 
          return { ...s, formisSubmitted: false,externalCDN:status.externalCDN }
      })
  
        props.toast.success('Settings updated successfully');
      } else {
      setState(s => {
          return { ...s, formisSubmitted: false }
        })
  
        props.toast.error('Settings Failed to upate.');
      }
  
      });
  });
  
  useEffect(() => {
      
      const request = new Request(
          `${ API_URL.GET_CLASSROOM_JS_SETTINGS }/${ props.cdata.kid }`,
          {
              method: 'GET',
              cache: 'default',
              mode: 'cors',
              
          }
      )
  
        fetch(request).then(data => data.json()).then((d) => {
            setState(s => {
                return {...s,externalCDN: d.data.externalCDN}
            });
        });
  },[props.cdata.kid])
  
  const submitHandler = (event) => {
        event.preventDefault()
          
        const formisSubmitted = true
        setState({ ...state, formisSubmitted })
  
        const externalCDN =  state.scontrols.externalCDN.value.split(',');
        const preprocessor = state.controls.preprocessor.value;
          if(props.codemarkastate.owner){
            props.socket.emit('editor_settings_changed',{preprocessor,externalCDN,classroom:props.cdata.kid,editor:'js'})
          }
    }

    const formElementArray = []
    for (const key in state.controls) {
        formElementArray.push({
            id: key,
            config: state.controls[key],
        })
    }
    const form = (
        <form onSubmit={ submitHandler }>
            {formElementArray.map((formElement) => (
                <Input
                    key={ formElement.id }
                    elementConfig={ formElement.config.elementConfig }
                    elementType={ formElement.config.elementType }
                    value={ formElement.config.value }
                    changed={ (event) =>
                        inputChangeHandler(event, formElement.id)
                    }
                    shouldDisplay={ props.codemarkastate.owner }

                    label={ formElement.config.label }
                />
            ))}
            <div className="mt-2 mb-2">
                <b>External Stylesheets</b>
                {mapExternalCDN()}
            </div>
            {props.codemarkastate.owner ? (
                <div className="mt-2 mb-2">
                    <b>Add External Scripts</b>
                    <p>
                        Any URL's (comma seperated) added here will be added as
                        links in their order, and before the JS in the editor.
                    </p>
                    <Input
                  key="external-js"
                  elementConfig={ state.scontrols.externalCDN.elementConfig }
                  elementType={ state.scontrols.externalCDN.elementType }
                  value={ state.scontrols.externalCDN.value }
                  changed={ handleExternalCDNInputChange }
                  shouldDisplay={ props.codemarkastate.owner }
              />
              
                    <Button
              block={ false }
              textColor="#fff"
              color="success"
              size="sm"
              clicked={ submitHandler }
              disabled={ state.formisSubmitted }>
                        {state.formisSubmitted ? <Spinner /> : 'Save'}
                    </Button>
                </div>
        ) : ''}
          
        </form>
    )
    return <div>{form}</div>
}

export default JavascripTab
