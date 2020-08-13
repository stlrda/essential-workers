// Libraries
import React from 'react';

// Styles
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Map from './components/Map';
import Table from './components/Table';
import Hero from './components/Hero';


function App() {

  return (
    <>
      <Navbar/>
      <Hero />
      <article>
        <Map />
        <Table />
        <Footer />
      </article>
    </>
  );
}


export default App;
