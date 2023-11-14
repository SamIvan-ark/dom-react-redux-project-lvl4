import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/Main';
import LoginPage from './Pages/Login';
import NotFoundPage from './Pages/NotFound';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="login" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
