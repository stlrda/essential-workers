import React from "react";

// Material UI
import StopIcon from '@material-ui/icons/Stop';
import Typography from '@material-ui/core/Typography';

// Custom Styling
import './Legend.css';


export const LegendLarge = (props) => {
  const { dataLayer } = props;

  return (
    <div id="legend-area-container-large">
      <div id="legend-area-large">
        <Typography style={{marginBottom : "10%" }}>Legend</Typography>
        {
          dataLayer.paint['fill-color'].stops
            .map(stop => 
              <div key={stop[0]} className="legend"> 
                <div key={stop[0]} className="legend-values">{stop[0]}</div> <StopIcon className="legend-colors" style={{color : stop[1] }}/> 
              </div>
            )
        }
      </div>
    </div> 
  );
};


export const LegendSmall = (props) => {
  const { dataLayer } = props;

  return (
    <div id="legend-area-container-small">
      <div id="legend-area-small">
        <Typography>Legend</Typography>
        {
          dataLayer.paint['fill-color'].stops
            .map(stop => 
              <>
                <span key={stop[0]} className="legend-values">{stop[0]}</span> <StopIcon className="legend-colors" style={{color : stop[1] }}/> 
              </>
            )
        }
      </div>
    </div>
  );
};