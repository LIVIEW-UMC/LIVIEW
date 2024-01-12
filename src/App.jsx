import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/header/Nav';
import Footer from './components/Footer';
// import SettingsSidebar from './components/SettingsSidebar';
import Main from './pages/Main';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <SettingsSidebar /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  </div>
);

export default App;
