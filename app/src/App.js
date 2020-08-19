// Libraries
import React from 'react';

// Styles
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Map from './components/Map';
import Hero from './components/Hero';
import Table from './components/Table';
import ControlPanel from './components/ControlPanel';

function App() {

  return (
    <>
      <Navbar/>
      <Hero />
      <main>
        <ControlPanel />
        <p id="summary">
          Accumsan tortor posuere ac ut consequat semper viverra. Arcu non odio euismod lacinia at quis. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Viverra aliquet eget sit amet. Sed viverra ipsum nunc aliquet bibendum. Aliquet bibendum enim facilisis gravida neque convallis a cras. Id semper risus in hendrerit gravida rutrum. Enim ut sem viverra aliquet. Aliquam purus sit amet luctus venenatis. Velit ut tortor pretium viverra. Diam donec adipiscing tristique risus. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Eget sit amet tellus cras adipiscing enim eu turpis egestas. Tristique risus nec feugiat in. Id faucibus nisl tincidunt eget nullam non nisi. Felis imperdiet proin fermentum leo vel orci.
        </p>
        <Map />
        <p id="table-summary">
          Magna ac placerat vestibulum lectus mauris ultrices eros. Urna condimentum mattis pellentesque id. Sed viverra ipsum nunc aliquet bibendum. Purus in massa tempor nec. Vitae nunc sed velit dignissim sodales ut eu sem integer. Ullamcorper sit amet risus nullam. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Dolor sit amet consectetur adipiscing elit ut aliquam. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Neque vitae tempus quam pellentesque nec nam aliquam.
        </p>
        <Table />
      </main>
      <Footer />
    </>
  );
}


export default App;
