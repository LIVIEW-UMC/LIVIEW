import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/header/Nav';
import Footer from './components/main/Footer';
import Main from './pages/Main';
// import ProfileEditPage from './components/main/ProfileEditPage';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <Footer />
      {/* <ProfileEditPage /> */}
    </BrowserRouter>
  </div>
);

export default App;
