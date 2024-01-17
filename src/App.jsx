import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/header/Nav';
import Footer from './components/main/Footer';
import Main from './pages/Main';
import ClickedPostPage from './pages/ClickedPostPage';
import Mypage from './pages/MyPage';
import ProfileEditPage from './pages/ProfileEditPage';
import Login from './components/login/login';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/clickedpost" element={<ClickedPostPage />} />
        <Route path="/profile" element={<ProfileEditPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </div>
);

export default App;
