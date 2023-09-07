import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './Components/Pages/Main';
import LoginPage from './Components/Pages/Login';
import NotFoundPage from './Components/Pages/NotFound';

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
