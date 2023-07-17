import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page'
import UserPage from './pages/user-page'
import VerificationPage from './pages/verification-page';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/verification" element={<VerificationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
