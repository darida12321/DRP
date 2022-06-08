import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Tutorial from './components/Tutorial'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/vim/:chapter/:lesson' element={<Tutorial />}/>
        <Route path='*' element={<h1>404 not found</h1>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
