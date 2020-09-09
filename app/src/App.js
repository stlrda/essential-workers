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
import NativeMap from './components/NativeMap';
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

          <Typography variant="body1" id="intro">
            Essential workers are shouldering the responsibility of providing fundamental products and services 
            during the COVID-19 pandemic all while being at especially high risk for exposure to the virus.
            This webpage is dedicated to helping others garner insight into the economic climate surrounding
            more than 2,000,000 essential workers across Missouri and Illinois.
          </Typography>

          <Typography variant="body1" id="map-summary">
            The interactive map below features county level data on essential workers across five measures. 
            You are currently viewing data for {selectedTableName}.
            In {selectedTableName}, {map_summary[selectedTableName]}
          </Typography>
          
          
          <NativeMap selectedTableName={selectedTableName} />
 
          
          <Typography variant="body1" id="segway">
            The data table below details characteristics of essential workers by overall quantity and percentage, generalized into
            six groups. In generalizing frontline / essential industries, we took inspiration from the
            <a href="https://cepr.net/a-basic-demographic-profile-of-workers-in-frontline-industries/"> Center for Economic and Policy Research</a>.
            Essential industry groups feature various, more specific industries, each classified by the Census Bureau’s Industry Codes:
          </Typography>

          <Typography variant="body1" id="groupings">
            <ul>
                <li>
                  Grocery, Convenience, and Drug Stores: Grocery and related product merchant wholesalers (4470)
                  , Supermarkets and other grocery stores (4971)
                  , Convenience Stores (4972)
                  , Pharmacies and drug stores (5070)
                  , and General merchandise stores
                  , including warehouse clubs and supercenters (5391)
                </li>
                <li>
                  Public Transit: Rail transportation (6080) and Bus service and urban transit (6180).
                </li>
                <li>
                  Trucking, Warehouse
                  , and Postal Service: Truck transportation (6170)
                  , Warehousing and storage (6390)
                  , and Postal Service (6370).
                </li>
                <li>
                  Building Cleaning Services: Cleaning Services to Buildings and Dwellings (7690).
                </li>
                <li>
                  Health Care: Offices of physicians (7970)
                  , Outpatient care centers (8090)
                  , Home health care services (8170)
                  , Other health care services (8180)
                  , General medical and surgical hospitals
                  , and specialty hospitals (8191)
                  , Psychiatric and substance abuse hospitals (8192)
                  , Nursing care facilities (skilled nursing facilities) (8270)
                  , and Residential care facilities
                  , except skilled nursing facilities (8290).
                </li>
                <li>
                  Child Care and Social Services: Individual and family services (8370)
                  , Community food and housing
                  , and emergency services (8380)
                  , and Child day care services (8470).
                </li>
              </ul>
          </Typography>

          <Typography variant="body1" id="table-summary">
            You are currently viewing data for {selectedTableName}.
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
