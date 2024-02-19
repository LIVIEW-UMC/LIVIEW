import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Nav from './components/header/Nav';
import Footer from './components/main/Footer';
import Main from './pages/Main';
import ClickedPostPage from './pages/ClickedPostPage';
import Mypage from './pages/MyPage';
import ProfileEditPage from './components/settings/profile/ProfileEditPage';
import CreateMap from './pages/CreateMap';
import PrivacyPage from './components/settings/privacy/Privacy';
import RecordPage from './components/settings/record/RecordPage';
import ServicePage from './components/settings/service/ServicePage';
import Post from './pages/Post';
import YourPage from './pages/YourPage';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/clickedpost" element={<ClickedPostPage />} />
        <Route path="/profile" element={<ProfileEditPage />} />
        <Route path="/createmap" element={<CreateMap />} />
        <Route path="/record" element={<RecordPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/post/:tourId" element={<Post />} />
        <Route path="/yourpage" element={<YourPage />} />
      </Routes>
      <PageFooter />
    </BrowserRouter>
  </div>
);

const PageFooter = () => {
  const location = useLocation();
  const isPostPage = /^\/post\/[^/]+$/.test(location.pathname);
  return !isPostPage ? <Footer /> : null;
};

export default App;
