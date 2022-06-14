import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Tutorial from './components/Tutorial'
import HomePage from './components/HomePage'
import Submit from './components/Submit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/vim/:chapter/:lesson' element={<Tutorial />}/>
        <Route path='/submitLesson' element = {<Submit />}/>
        <Route path='*' element={<h1>404 not found</h1>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
