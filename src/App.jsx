import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/header/Nav';
import Footer from './components/Footer';
// import SettingsSidebar from './components/SettingsSidebar';
import Main from './pages/Main';
import Mypage from './pages/Mypage';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <SettingsSidebar /> */}
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </div>
);

export default App;
