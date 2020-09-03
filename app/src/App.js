// Libraries
import React, {useState} from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

// Styles
import './App.css';

// Custom Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StaticControlPanel from './components/StaticControlPanel';
import StickyControlPanel from './components/StickyControlPanel';
import Map from './components/Map';
import ScrollingTable from './components/ScrollingTable';
import Footer from './components/Footer';

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


  return (
    <Grid container>
      <Navbar/>

      <Grid item md={12}>
        <Hero />
      </Grid>

      <Grid container component="main">
        <Hidden only={['xs', 'sm', 'md']}>
          <Grid item lg={3} xl={3}>
            <StickyControlPanel tableNames={Object.keys(tableData)} currentView={table} setTableView={setTableView}/>
          </Grid>
        </Hidden>
        
        <Grid item component="section" sm={12} md={12} lg={9} xl={9}>
          <Hidden lgUp>
              <StaticControlPanel tableNames={Object.keys(tableData)} currentView={table} setTableView={setTableView}/>
          </Hidden>

          <Typography variant="body1" id="map-summary">
            Prior to COVID-19's onbringing of a global pandemic, essential workers across economies have been
            underpaid and under appreciated. During the pandemic, they are shouldering the burden of providing
            necessary products and services all while being at especially high risk for exposure the the virus.
            The visualizations below intend to illustrate the demographics and profile of essential workers across
            Missouri, Illinois, and Saint Louis.
            <br/>
            <br/>
            The interactive map below features county level data on essential workers across five measures. 
            You are currently viewing data for {table}.
            In {table}, {map_summary[table]}
          </Typography>
          
          <Map table={table} />

          <Typography variant="body1" id="table-summary">
            The data table below details characteristics of essential workers by overall quanitity and percentage, broken up into
            six generalized industries. You are currently viewing data for {table}.
          </Typography>

          
          <ScrollingTable rows={
            {columns: 
              [
                {label: "", field: "index", width: 200},
                {label: "All Frontline Industries", field: "All Frontline Industries", width: 200},
                {label: "All Workers", field: "All Workers", width: 200},
                {label: "Building Cleaning Services", field: "Building Cleaning Services", width: 200},
                {label: "Childcare & Social Services", field: "Childcare & Social Services", width: 200},
                {label: "Grocery, Convenience, & Drug Stores", field: "Grocery, Convenience, & Drug Stores", width: 200},
                {label: "Health Care", field: "Health Care", width: 200},
                {label: "Public Transit", field: "Public Transit", width: 200},
                {label: "Trucking, Warehouse, & Postal Service", field: "Trucking, Warehouse, & Postal Service", width: 200},
              ]
            , rows:
            [
              ...tableData[table].rows[0].rows,
              ...tableData[table].rows[1].rows,
              {"Childcare & Social Services": "Full Time"},
              ...tableData[table].rows[2].rows,
              {"Childcare & Social Services": "Race/Ethnicity"},
              ...tableData[table].rows[3].rows,
              {"Childcare & Social Services": "Education Level"},
              ...tableData[table].rows[4].rows,
              {"Childcare & Social Services": "Compensation and Benefits"},
              ...tableData[table].rows[5].rows,
              {"Childcare & Social Services": "Family Responsibilities"},
              ...tableData[table].rows[6].rows
            ]}
            }/>
        </Grid>

        <Grid item component="section" sm={12} md={12} lg={12} xl={12}>
          <Footer />
        </Grid>
      </Grid>
    </Grid>
  );
}


export default App;
