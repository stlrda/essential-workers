// Libraries
import React from 'react'
import { Toolbar, AppBar, Button } from '@material-ui/core'

// Styles
import './Navbar.css'
import RDALogo from '../images/RDA-logo-FINAL_Horiz-full-color-revised.png'

const Navbar = () => {

  return (
    <AppBar position="sticky">
      <Toolbar>
        <a href="https://stldata.org/" rel="noopener">
          <img id="logo" src={RDALogo} alt="Regional Data Alliance Logo"/>
        </a>
        <Button className="nav-button">
          <a id="download" href="https://github.com/stlrda/essential-workers/blob/master/data/stlrda-essential-workers-data.zip?raw=true">
            Download Data
          </a>
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar