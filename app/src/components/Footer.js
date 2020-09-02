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
        The data used in this project was collected from the Census Bureau's American Community Survey (2018)
        and the Bureau of Economic Analysis. Each dataset featured on this webpage can be downloaded via the upper right-hand corner of the
        webpage.
        
        </Grid>

        <Grid item sm={6} md={6} lg={3}>
          <img src={rdaLogo} width="50%" height='auto'  alt='Regional Data Alliance Logo' />
          <img src={daughertyLogo} width="50%" height='auto' alt='Daugherty Business Solutions Logo' />
        </Grid>
    </Grid>
  )
}

export default Footer