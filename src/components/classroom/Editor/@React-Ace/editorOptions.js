const editorOptions = [
  'minLines',
  'maxLines',
  'readOnly',
  'highlightActiveLine',
  'tabSize',
  'enableBasicAutocompletion',
  'enableLiveAutocompletion',
  'enableSnippets'
];

const editorEvents = [
  'onChange',
  'onFocus',
  'onInput',
  'onBlur',
  'onCopy',
  'onPaste',
  'onSelectionChange',
  'onCursorChange',
  'onScroll',
  'handleOptions',
  'updateRef'
];

const getAceInstance = () => {
  let ace;
  
  if ((window).ace) {
    // Fallback for ace.require when vanilla ACE is hosted over a CDN
    ace = (window).ace;
    ace.acequire = (window).ace.require || (window).ace.acequire;
  } else {
    ace = require('ace-builds');
  }
  return ace;
};

const debounce = (fn , delay) => {
  let timer = null;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};
export { editorOptions, editorEvents, debounce, getAceInstance };
