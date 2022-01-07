import React, { useRef } from 'react'
import { Range } from 'ace-builds';

import Ace from '../../../components/classroom/Editor/@React-Ace/index';

export default function AceCodemarkaEditor() {

  const editorRef = useRef();
  const editorRef2 = useRef()

  const editorProps =  {
    
  }

  const onChange = (content,delta) => {
    const { action, start, lines } = delta;

    if(action !== 'remove'){
      lines.length && lines.forEach((line, index) => {
          const range = {
              row: start.row + index,
              column: start.column,
          }
          const rowAvailable = (editorRef2.current.env.document.doc.getLength());
          if(range.row > rowAvailable - 1){
            editorRef2.current.env.document.doc.insertMergedLines(range, [
                '',
                '',
            ])
          }              
          editorRef2.current.env.document.doc.insertInLine(range, line)
      });
      if (editorRef2.current.env.document.doc.getValue().trim() !== content.trim()){
        editorRef2.current.env.document.doc.setValue(content);
      }
    } else if (action === 'remove') {
      lines.length &&
          lines.forEach((line, index) => {
              const range_ = new Range(delta.start.row + index ,delta.start.column,delta.end.row + index,delta.end.column);
              editorRef2.current.env.document.doc.remove(range_, line)
          })
    }
  }

  const setOptions = (e) => {

  }

  const onLoad = (editor) => {
    editorRef.current = editor;
  }

  const setSecondEditor = (editor) => {
    editorRef2.current = editor;
  }

  return (
      <div className="editor-container">
          <Ace
              mode="javascript"
              theme="dracula"
              onChange={ onChange }
              name="UNIQUE_ID_OF_DIV"
              editorProps={ editorProps }
              setOptions={ {
                  enableBasicAutocompletion: true,
                  enableSnippets: true,
                  enableLiveAutocompletion: true,
              } }
              onLoad={ onLoad }
              height="100vh"
              cursorStart={ 0 }
              name="codemarka-ace"
              className="ace-codemarka"
              focus={ true }
              fontFamily='Nunito Sans",sans-serif'
              showGutter
              showPrintMargin
              showLineNumbers
              width="100%"
              value=""
          />

          <Ace
              mode="javascript"
              theme="dracula"
              name="UNIQUE_ID_OF_DIV2"
              editorProps={ editorProps }
              setOptions={ {
                  enableBasicAutocompletion: true,
                  // enableSnippets: true,
                  // enableLiveAutocompletion: true,
              } }
              onLoad={ setSecondEditor }
              height="100vh"
              cursorStart={ 0 }
              name="codemarka-ace2"
              className="ace-codemarka"
              focus={ true }
              fontFamily='Nunito Sans",sans-serif'
              showGutter
              showPrintMargin
              showLineNumbers
              width="100%"
              value=""
          />
      </div>
  )
}
