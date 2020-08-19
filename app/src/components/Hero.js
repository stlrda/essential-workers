// Libraries
import React from 'react';

import Typography from '@material-ui/core/Typography';

// Styles
import './Hero.css';

function Hero() {

  return (
    <>
      <div id="hero-image-area">
        <h1>
          <Typography component="h3" variant="h3">
            Essential Workers:<br/>
            Demographics across Missouri,<br/>
            Illinois, and Saint Louis
          </Typography>
        </h1>
      </div>
    </>
  );
}


export default Hero;
