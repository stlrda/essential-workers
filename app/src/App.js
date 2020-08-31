// Libraries
import React, {useState, useEffect} from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

// Styles
import './App.css';

// Custom Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Map from './components/Map';
import Hero from './components/Hero';
import Table from './components/Table';
import StickyControlPanel from './components/StickyControlPanel';

// Data
const {map_summary, table_summary} = require('./data/Constants')
const missouri_json = require('./data/missouri.json');
const illinois_json = require('./data/illinois.json');
const stl_json = require('./data/stl.json');

// Breakpoints
// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 960px
// lg, large: 1280px
// xl, extra-large: 1920px

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

  const tableData = {
    Missouri : { rows: createRows(missouri_json) },
    Illinois : { rows: createRows(illinois_json) },
    "Saint Louis" : { rows: createRows(stl_json) },
  };

  const [table, setTableView] = useState("Missouri");
  const [dimensions, setDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  });

  const renderMap = () => {
    return <Map table={table} dimensions={dimensions}/>
  };

  const [hey, setHey] = useState(() => renderMap);

  const handleResize = () => {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth
    });
    console.log('resized to: ', window.innerWidth, 'x', window.innerHeight);
    setHey(() => renderMap);
  };


  useEffect(() => {
      window.addEventListener('resize', handleResize);
  });



  
  return (
    <Grid container>
      <Navbar/>

      <Grid item md={12}>
        <Hero />
      </Grid>

      <Grid container component="main">
        <Hidden mdDown>
          <Grid item lg={3} xl={3}>
            <StickyControlPanel tableNames={Object.keys(tableData)} currentView={table} setTableView={setTableView}/>
          </Grid>
        </Hidden>
        
        <Grid item component="section" sm={12} md={12} lg={9} xl={9}>

          <Typography variant="body1" id="map-summary">
            {map_summary[table]}
          </Typography>
          
           {hey()}

          <Typography variant="body1" id="table-summary">
            {table_summary[table]}
          </Typography>

          {/* <Table rows={tableData[table].rows}/> */}

        </Grid>

        <Grid item component="section" sm={12} md={12} lg={12} xl={12}>
          <Footer />
        </Grid>
        
      </Grid>

    </Grid>
  );
}


export default App;
