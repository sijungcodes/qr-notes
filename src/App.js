import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import IndexPage from './IndexPage';
import ReaderPage from './ReaderPage';
import EditorPage from './EditorPage';
import 'tachyons';


const App = () => {
  return (
    <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<EditorPage />} />
        <Route path="/reader" element={<ReaderPage />} />
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
      </HashRouter>
  </React.StrictMode>
  );
};

export default App;
