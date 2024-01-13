import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/header/Nav';
import Footer from './components/Footer';
import Main from './pages/Main';
import ClickedPostPage from './pages/ClickedPostPage';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/clickedpostpage" element={<ClickedPostPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </div>
);

export default App;
