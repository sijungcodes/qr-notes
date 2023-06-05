import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexPage from './IndexPage';
import ReaderPage from './ReaderPage';
import EditorPage from './EditorPage';
import 'tachyons';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EditorPage />} />
        <Route path="/reader" element={<ReaderPage />} />
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
