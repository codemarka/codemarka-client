import React from 'react';
import Button from '../../../Partials/Button';
import Input from '../../../Partials/Input/Input';
import Spinner from '../../../Partials/Preloader';

export default function HtmlTab(props) {

  const [ state , setState ] = React.useState(
    {
       controls: {
            topic: {
                label: 'Add class(es)',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'e.g apple ball ben-10 real'
                },
                value: ''
            },
            preprocessor: {
                label: 'Preprocessor',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 0,
                            displayValue: 'None'
                        },
                        {
                            value: 'MD',
                            displayValue: 'Markdown'
                        },
                    ]
                },
                value: 0
            },
            headTags: {
                label: 'Head tag children',
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                    placeholder: "Sele"
                },
                value: '',
            }
        },
        formisValid: false,
        formisSubmitted: props.loading ? true : false,
        formErrorMessage: false,
        formErrored: false,
    }
  )
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
       // 
   }
   const submitHandler = (event) => {
       event.preventDefault()
       const formisSubmitted = true
       setState({ ...state, formisSubmitted })

       const formData = {}

       if (state.formisValid) {
           for (const formElementIdentifier in state.controls) {
               formData[formElementIdentifier] =
                   state.controls[formElementIdentifier].value
           }
           // eslint-disable-next-line no-undef
           props.onCreate(formData)
       } else {
           setState({
               ...state,
               alertType: 'error',
               formErrored: true,
               formErrorMessage:
                   'Form Validation Failed, please check inputs and try again',
           })
           return false
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
       <form onSubmit={submitHandler}>
           {formElementArray.map((formElement) => (
               <Input
                   key={formElement.id}
                   elementConfig={formElement.config.elementConfig}
                   elementType={formElement.config.elementType}
                   value={formElement.config.value}
                   changed={(event) =>
                       inputChangeHandler(event, formElement.id)
                   }
                   shouldDisplay={true}
                   label={formElement.config.label}
               />
           ))}

           <Button
               block={false}
               textColor="#fff"
               color="success"
               size="sm"
               clicked={submitHandler}
               disabled={state.formisSubmitted}>
               {state.formisSubmitted ? <Spinner /> : 'Save'}
           </Button>
       </form>
   )
  return (
      <div>
      {form}
      </div>
  )
}
