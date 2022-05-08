import React from 'react';
import { BrowserRouter as Router, Navigate } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import MainPage from './modules/MainPage/MainPage/MainPage';
import './App.css';

function App() {  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Home" element={<MainPage />} />
          <Route path="/" element={<Navigate to="/Home" replace={true} />} />
          {/* <Route path="/*" element={<NotFoundPage />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
