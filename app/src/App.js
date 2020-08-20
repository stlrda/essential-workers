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

// Data
const {map_summary, table_summary} = require('./data/Constants')
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
        <Typography variant="body1" id="map-summary">
          {map_summary[table]}
        </Typography>
        <Map />
        <Typography id="table-summary">
          {table_summary[table]}
        </Typography>
        <Table rows={tables[table]}/>
      </main>
      <Footer />
    </>
  );
}


export default App;
