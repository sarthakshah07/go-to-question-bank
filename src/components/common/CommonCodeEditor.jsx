


import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

function CommonCodeEditor({language, value, onChange, height}) {
//   const [code, setCode] = useState('');

//   const handleEditorChange = (newValue) => {
//     setCode(newValue);
//   };
  return (
    <MonacoEditor
      width="100%"
      height={height || "200"}
      language="javascript"
      theme="vs-dark"
      value={value}
      onChange={onChange}
    />
  );
}

export default CommonCodeEditor;