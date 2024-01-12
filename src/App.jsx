import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SettingsSidebar from './components/SettingsSidebar';

const App = () => (
  <div className="App">
    <Nav />
    <SettingsSidebar />
    <Footer />
  </div>
);

export default App;
