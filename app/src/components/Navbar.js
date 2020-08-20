// Libraries
import React from 'react'
import { Toolbar, AppBar, Button } from '@material-ui/core'

// Styles
import './Navbar.css'
import RDALogo from '../images/RDA-logo-FINAL_Horiz-full-color-revised.png'

const Navbar = (props) => {

  return (
    <AppBar position="sticky">
      <Toolbar>
        <a href="https://stldata.org/" rel="noopener">
          <img id="logo" src={RDALogo} alt="Regional Data Alliance Logo"/>
        </a>
        <Button className="nav-button">
          Download Data
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar