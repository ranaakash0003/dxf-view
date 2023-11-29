import React from 'react';
import './App.css';
import DXFViewer from './DXFViewer'
import dxfFilePath  from './asset/test.dxf'

function App() {
  
  return (
    <div className="App">
      <h1>DXF Viewer</h1>
      <DXFViewer dxfFilePath={dxfFilePath} />
    </div>
  );
}

export default App;
