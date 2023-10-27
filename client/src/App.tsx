import React from 'react';
import './App.css';
import Header from './Components/Header/Header'
import UploadArea from './Components/UploadArea/UploadArea';
import Uploadpage from './Components/Uploadpage/Uploadpage';

function App() {
  return (
    <div className="App">
      <Header/>
      <Uploadpage/>
      <Footer/>
    </div>
  );
}

export default App;
