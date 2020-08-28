import React from 'react'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import './Footer.css';
import rdaLogo from '../images/RDA-Primary-Logo.png'
import daughertyLogo from '../images/Daugherty_Logo.png'

const Footer = (props) => {

  return (
    <Grid component="footer" container justify="center" spacing={0}>
        <Grid component="p" item sm={12} md={5} lg={5}>

            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Dolor sed viverra ipsum nunc aliquet bibendum enim. 
            Gravida arcu ac tortor dignissim convallis aenean et. 
            Malesuada fames ac turpis egestas integer eget aliquet nibh praesent.
            Netus et malesuada fames ac turpis egestas integer. Neque egestas congue quisque egestas. 
            In metus vulputate eu scelerisque felis imperdiet proin.
            Sit amet aliquam id diam. Diam volutpat commodo sed egestas. At lectus urna duis convallis.
            Ut tellus elementum sagittis vitae et leo. Libero justo laoreet sit amet cursus sit amet dictum sit.
            Ultricies tristique nulla aliquet enim. Ipsum consequat nisl vel pretium lectus quam id.
            Ante metus dictum at tempor commodo ullamcorper.

        </Grid>

        <Grid item sm={6} md={3} lg={3}>
          <img src={rdaLogo} width="50%" height='auto'  alt='Regional Data Alliance Logo' />
          <img src={daughertyLogo} width="50%" height='auto' alt='Daugherty Business Solutions Logo' />
        </Grid>
    </Grid>
  )
}

export default Footer