import React,{ useState, useEffect } from 'react'
import Button from '../../../Partials/Button'
import Input from '../../../Partials/Input/Input'
import Spinner from '../../../Partials/Preloader'

import * as API_URL from '../../../../config/api_url';

const CssTab = (props) => {

  const [state, setState] = useState({
      controls: {
          preprocessor: {
              label: 'CSS Preprocessor',
              elementType: 'select',
              elementConfig: {
                  options: [
                      {
                          value: 0,
                          displayValue: 'None',
                      },
                  ],
              },
              value: 0,
          }
      },
      scontrols:{
          externalCDN: {
              elementConfig: {
                  placeholder: 'https://somesite.com/style/index.css',
              },
              value: '',
              elementType: 'text',
          }
      },
      formisValid: false,
      formisSubmitted: props.loading ? true : false,
      formErrorMessage: false,
      formErrored: false,
      externalCDN:[],
      preprocessor:''
  });

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
         return <div key={ cdn.id } className="badge badge-soft-dark d-block"> {cdn.url.slice(0,30)} </div>
      })
  }

  const handleExternalCDNInputChange = (e) => {
      e.preventDefault();
      setState({...state, scontrols:{...state.scontrols,externalCDN:{...state.scontrols.externalCDN,value: e.target.value}}});
  }
 
useEffect(() => {
    
    props.socket.on('editor_settings_update_feedback',function(status){
    if(status){
    setState({ ...state, formisSubmitted: false,externalCDN:status.externalCDN })

      props.toast.success('Settings updated successfully');
    } else {
    setState({ ...state, formisSubmitted: false })

      props.toast.error('Settings Failed to upate.');
    }

    });
});

useEffect(() => {
    
    const request = new Request(
        `${ API_URL.GET_CLASSROOM_CSS_SETTINGS }/${ props.cdata.kid }`,
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
})

const submitHandler = (event) => {
      event.preventDefault()
        
      const formisSubmitted = true
      setState({ ...state, formisSubmitted })

      const externalCDN =  state.scontrols.externalCDN.value.split(',');
      const preprocessor = state.controls.preprocessor.value;
        if(props.codemarkastate.owner){
          props.socket.emit('editor_settings_changed',{preprocessor,externalCDN,classroom:props.cdata.kid,editor:'css'})
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
                  changed={ (event) => inputChangeHandler(event, formElement.id) }
                  label={ formElement.config.label }
                  shouldDisplay={ props.codemarkastate.owner }

              />
          ))}
          {/* <div className="mt-2 mb-2">
              <b>Vendor Prefixing</b>
              <div class="custom-control custom-radio pl-0">
                  <input type="radio" id="venfor-prefix" name="venfor-prefix" />
                  <label for="AUTO-venfor-prefix">Autoprefixer</label>
              </div>
              <div class="custom-control custom-radio pl-0">
                  <input
                      type="radio"
                      id="venfor-prefix"
                      name="venfor-prefix"
                      selected
                  />
                  <label for="None-venfor-prefix">None</label>
              </div>
          </div> */}
          <div className="mt-2 mb-2">
              <b>External Stylesheets</b>
              {mapExternalCDN()}
          </div>

          {props.codemarkastate.owner ? (
              <div className="mt-2 mb-2">
                  <b>Add External Stylesheets</b>
                  <p>
                      Any URL's (comma seperated) added here will be added as links
                      in their order, and before the CSS in the editor.
                  </p>
                  <Input
                            key="external css"
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
  return (<div>{form}</div>)
}

export default CssTab;