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
        <p id="summary">
        Accumsan tortor posuere ac ut consequat semper viverra. Arcu non odio euismod lacinia at quis. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Viverra aliquet eget sit amet. Sed viverra ipsum nunc aliquet bibendum. Aliquet bibendum enim facilisis gravida neque convallis a cras. Id semper risus in hendrerit gravida rutrum. Enim ut sem viverra aliquet. Aliquam purus sit amet luctus venenatis. Velit ut tortor pretium viverra. Diam donec adipiscing tristique risus. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Eget sit amet tellus cras adipiscing enim eu turpis egestas. Tristique risus nec feugiat in. Id faucibus nisl tincidunt eget nullam non nisi. Felis imperdiet proin fermentum leo vel orci. Tempus imperdiet nulla malesuada pellentesque elit eget gravida. Cursus mattis molestie a iaculis at erat pellentesque adipiscing commodo. Tortor pretium viverra suspendisse potenti nullam.
        </p>
        <Map />
        <Table />
        <Footer />
      </article>
    </>
  );
}


export default App;
