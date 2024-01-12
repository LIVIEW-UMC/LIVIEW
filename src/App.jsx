import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/header/Nav';
import Footer from './components/Footer';
<<<<<<< Updated upstream
import Main from './pages/Main';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <Footer />
    </BrowserRouter>
=======
import ProfileEditPage from './components/ProfileEditPage';

const App = () => (
  <div className="App">
    <Nav />
    <Footer />
    <ProfileEditPage />
>>>>>>> Stashed changes
  </div>
);

export default App;
