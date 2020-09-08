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
// import NativeMap from './components/NativeMap';
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

const createRowsByCategory = (data) => (
  {
    "Totals" : [data[0]],
    "Miscellaneous" : [data[1], data[2], data[3], data[4], data[5]],
    "Full/Part-time" : [data[6], data[7]],
    "Race/Ethnicity" : [data[8], data[9], data[10], data[11], data[12]],
    "Education Level" : [data[13], data[14], data[15], data[16], data[17]],
    "Compensation and Benefits" : [data[18], data[19], data[20]],
    "Family Responsibilities" : [data[21], data[22]]
  }
);


function App() {

  const tables = {
    Missouri : { rowsByCategory: createRowsByCategory(missouri_json) },
    Illinois : { rowsByCategory: createRowsByCategory(illinois_json) },
    "Saint Louis" : { rowsByCategory: createRowsByCategory(stl_json) },
  };

  const [selectedTableName, setSelectedTableName] = useState("Missouri");


  return (
    <Grid container>
      <Navbar/>

      <Grid item md={12}>
        <Hero />
      </Grid>

      <Grid container component="main">
        <Hidden only={['xs', 'sm', 'md']}>
          <Grid item lg={3} xl={3}>
            <StickyControlPanel tableNames={Object.keys(tables)} currentView={selectedTableName} setTableView={setSelectedTableName}/>
          </Grid>
        </Hidden>
        
        <Grid item component="section" sm={12} md={12} lg={9} xl={9}>
          <Hidden lgUp>
              <StaticControlPanel tableNames={Object.keys(tables)} currentView={selectedTableName} setTableView={setSelectedTableName}/>
          </Hidden>

          <Typography variant="body1" id="map-summary">
            During the pandemic, essential workers are shouldering the burden of providing
            necessary products and services all while being at especially high risk for exposure to the virus.
            The visualizations below illustrate demographics and profiles of essential workers prior to the
            pandemic across Missouri, Illinois, and Saint Louis.
            <br/>
            <br/>
            The interactive map below features county level data on essential workers across five measures. 
            You are currently viewing data for {selectedTableName}.
            In {selectedTableName}, {map_summary[selectedTableName]}
          </Typography>
          
          
          <Map table={selectedTableName} />
 
          

          <Typography variant="body1" id="table-summary">
            The data table below details characteristics of essential workers by overall quantity and percentage, broken up into
            six generalized industries. You are currently viewing data for {selectedTableName}.
          </Typography>

          
          <ScrollingTable tableData={
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
              ...tables[selectedTableName].rowsByCategory["Totals"],
              ...tables[selectedTableName].rowsByCategory["Miscellaneous"],
              {"Childcare & Social Services": "Full Time"},
              ...tables[selectedTableName].rowsByCategory["Full/Part-time"],
              {"Childcare & Social Services": "Race/Ethnicity"},
              ...tables[selectedTableName].rowsByCategory["Race/Ethnicity"],
              {"Childcare & Social Services": "Education Level"},
              ...tables[selectedTableName].rowsByCategory["Education Level"],
              {"Childcare & Social Services": "Compensation and Benefits"},
              ...tables[selectedTableName].rowsByCategory["Compensation and Benefits"],
              {"Childcare & Social Services": "Family Responsibilities"},
              ...tables[selectedTableName].rowsByCategory["Family Responsibilities"]
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
