import React from 'react'

import Grid from '@material-ui/core/Grid';

import './Footer.css';
import rdaLogo from '../images/RDA-Primary-Logo.png'
import daughertyLogo from '../images/Daugherty_Logo.png'

const Footer = (props) => {

  return (
    <Grid component="footer" container justify="center" spacing={0}>
        <Grid component="p" item sm={12} md={12} lg={5}>

        The Essential Workers project was developed by 
        the <a target="_blank" rel="noopener noreferrer" href="http://stldata.org">St. Louis Regional Data Alliance </a>
        in partnership with <a target="_blank" rel="noopener noreferrer" href="http://daugherty.com">Daugherty Business Solutions</a>.  
        The data used in this project was collected from the Census Bureau 
        (<a target="_blank" rel="noopener noreferrer" href="https://data.census.gov/mdat/#/search?ds=ACSPUMS5Y2018">Amercian Community Survey 5-year Estimates Public Use Microdata Sample 2018</a>)
        and the Bureau of Economic Analysis 
        (<a target="_blank" rel="noopener noreferrer" href="https://apps.bea.gov/iTable/iTable.cfm?reqid=99&step=1#reqid=99&step=1">GDP and Personal Income 2018</a>). 
        All of the data collected can be downloaded by clicking on the "Download Data" button to the right of the navigation bar.
        
        </Grid>

        <Grid item sm={6} md={6} lg={3}>
          <img src={rdaLogo} width="50%" height='auto'  alt='Regional Data Alliance Logo' />
          <img src={daughertyLogo} width="50%" height='auto' alt='Daugherty Business Solutions Logo' />
        </Grid>
    </Grid>
  )
}

export default Footer