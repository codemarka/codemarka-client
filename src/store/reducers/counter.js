export  function counter(state = 0, action) {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'INCREMENT_IF_ODD':
        return (state % 2 !== 0) ? state + 1 : state
      case 'DECREMENT':
        return state - 1
      default:
        return state
    }
  }
  
  export  function sayer(state = { what:'' }, action) {
    switch (action.type) {
      case 'INCREMENT_SAYER':
        return { ...state,what:'incremented' }
      case 'DECREMENT_SAYER':
        return { ...state,what :'decremented' }
      default:
        return state
    }
  }
