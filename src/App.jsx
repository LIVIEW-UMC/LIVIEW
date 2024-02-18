import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import TabNavigator from './components/main/TabNavigator';
import Post from './pages/Post';
import YourPage from './pages/YourPage';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<TabNavigator />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/clickedpost" element={<ClickedPostPage />} />
        <Route path="/profile" element={<ProfileEditPage />} />
        <Route path="/createmap" element={<CreateMap />} />
        <Route path="/record" element={<RecordPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/post" element={<Post />} />
        <Route path="/yourpage" element={<YourPage />} />
      </Routes>
      {window.location.pathname !== '/post' && <Footer />}
    </BrowserRouter>
  </div>
);

export default App;
