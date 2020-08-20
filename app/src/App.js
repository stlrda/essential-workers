// Libraries
import React from 'react';

// Material UI
import Typography from '@material-ui/core/Typography';

// Styles
import './App.css';

// Custom Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Map from './components/Map';
import Hero from './components/Hero';
import Table from './components/Table';
import ControlPanel from './components/ControlPanel';


const missouri_json = require('./data/missouri.json');
const illinois_json = require('./data/illinois.json');
const stl_json = require('./data/stl.json');

const createRows = (data) => 
  [
    {
      title: "Totals",
      rows: [data[0]]
    },
    {
      title: "Miscellaneous", 
      rows: [data[1], data[2], data[3], data[4], data[5]]
    },
    {
      title: "Full/Part-time", 
      rows: [data[6], data[7]]
    },
    {
      title: "Race/Ethnicity", 
      rows: [data[8], data[9], data[10], data[11], data[12],]
    },
    {
      title: "Education Level", 
      rows: [data[13], data[14], data[15], data[16], data[17],]
    },
    {
      title: "Compensation and Benefits", 
      rows: [data[18], data[19], data[20]]
    },
    {
      title: "Family Responsibilities", 
      rows: [data[21], data[22]]
    },
  ];


function App() {

  const tables = {
    Missouri : createRows(missouri_json),
    Illinois : createRows(illinois_json),
    "Saint Louis" : createRows(stl_json),
  }

  const [table, setTableView] = React.useState("Missouri");


  return (
    <>
      <Navbar/>
      <Hero />
      <main>
        <ControlPanel tableNames={Object.keys(tables)} currentView={table} setTableView={setTableView}/>
        <Typography id="summary">
          Accumsan tortor posuere ac ut consequat semper viverra. Arcu non odio euismod lacinia at quis. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Viverra aliquet eget sit amet. Sed viverra ipsum nunc aliquet bibendum. Aliquet bibendum enim facilisis gravida neque convallis a cras. Id semper risus in hendrerit gravida rutrum. Enim ut sem viverra aliquet. Aliquam purus sit amet luctus venenatis. Velit ut tortor pretium viverra. Diam donec adipiscing tristique risus. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Eget sit amet tellus cras adipiscing enim eu turpis egestas. Tristique risus nec feugiat in. Id faucibus nisl tincidunt eget nullam non nisi. Felis imperdiet proin fermentum leo vel orci.
        </Typography>
        <Map />
        <Typography id="table-summary">
          Magna ac placerat vestibulum lectus mauris ultrices eros. Urna condimentum mattis pellentesque id. Sed viverra ipsum nunc aliquet bibendum. Purus in massa tempor nec. Vitae nunc sed velit dignissim sodales ut eu sem integer. Ullamcorper sit amet risus nullam. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Dolor sit amet consectetur adipiscing elit ut aliquam. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Neque vitae tempus quam pellentesque nec nam aliquam.
        </Typography>
        <Table rows={tables[table]}/>
      </main>
      <Footer />
    </>
  );
}


export default App;
