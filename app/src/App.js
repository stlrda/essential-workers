// Libraries
import React, {useState} from 'react';

// Styles
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Map from './components/Map';


function App() {

  return (
    <>
    <Navbar/>
    <section>
      <Map />
    </section>
    
    <Footer />
    </>
  );
}


export default App;
