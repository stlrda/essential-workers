import React from "react";

// Material UI
import StopIcon from '@material-ui/icons/Stop';
import Typography from '@material-ui/core/Typography';

// Custom Styling
import './Legend.css';


export const LegendLarge = (props) => {
  const { legendObj } = props;
  const { stops, description, stopLabels, palette} = legendObj;

  return (
    <div id="legend-area-container-large">
      <div id="legend-area-large">
        <h6 className="legend-title" style={{marginBottom : "1%" }}>Legend</h6>
        <h6 className="legend-descriptionz" style={{marginBottom : "2%" }}>{description}</h6>
        {
          stops
            .map((stop, index) => 
              <div key={stopLabels[index]} className="legend"> 
                <div key={stopLabels[index]} className="legend-values">{stopLabels[index]}</div> <StopIcon className="legend-colors" style={{color : palette[index] }}/> 
              </div>
            )
        }
      </div>
    </div> 
  );
};


export const LegendSmall = (props) => {
  const { legendObj } = props;
  const { stops, description, stopLabels, palette} = legendObj;

  return (
    <div id="legend-area-container-small">
      <div id="legend-area-small">
        <Typography className="legend-title">Legend</Typography>
        <Typography className="legend-description">{description}</Typography>
        {
          stops
            .map((stop, index) => 
              <>
                <span key={stopLabels[index]} className="legend-values">{stopLabels[index]}</span> <StopIcon className="legend-colors" style={{color : palette[index] }}/> 
              </>
            )
        }
      </div>
    </div>
  );
};