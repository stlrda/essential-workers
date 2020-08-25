// Libraries
import React, {useState, useEffect} from 'react';
import ReactMapGL, {Source, Layer} from "react-map-gl";
import StopIcon from '@material-ui/icons/Stop';
import {Card, CardActions, CardContent, Typography} from '@material-ui/core';
import {Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@material-ui/core';

// Styles
import './Map.css';

// Data
import stl_counties from '../data/geojson/MSA_Stats.geojson';
import mo_counties from '../data/geojson/MO_Stats.geojson';
import il_counties from '../data/geojson/IL_Stats.geojson';


const palette = [
  '#fbe9e7',
  '#fecdbb',
  '#fead8f',
  '#fd8e62',
  '#fd763e',
  '#fc5f18',
  '#f15914',
  '#e3520e',
  '#bd3e02'
];

const stops = {
  "GDP (Thousands of dollars)" : [65222,2417968,7349716,16857130,32631130,47496821,67701128,91380287,411671713]
    .map((stop, index) => [stop, palette[index]]),
  "Labor Force": [964,14881,44273,101894,171051,281764,381084,524849,2765106]
    .map((stop, index) => [stop, palette[index]]),
  "Unemployment Rate": [2.27,3.61,4.62,5.41,6.17,7.21,8.57,10.08,15.91]
    .map((stop, index) => [stop, palette[index]]),
  "Median Income Essential Workers": [23689,27750,30409,32875,35341,38019,40993,44732,50396]
    .map((stop, index) => [stop, palette[index]]),
}



const mapViews = {
  Missouri : { latitude : 37.9643, longitude : -91.8318, zoom: 5, width: "66vw", height: "60vh", pitch: 0 },
  Illinois : { latitude : 39.6331, longitude : -88.3985, zoom: 5, width: "66vw", height: "60vh", pitch: 0 },
  "Saint Louis" : { latitude : 38.6264178, longitude : -90.1998378, zoom: 7, width: "66vw", height: "60vh", pitch: 0 },
};


const Map = (props) => {

    const { table } = props;

    const [radio, setRadio] = useState('GDP (Thousands of dollars)');

    const dataLayer = {
      id: 'data',
      type: 'fill',
      paint: {
        'fill-color': {
          property: radio,
          stops: stops[radio]
        },
        'fill-opacity': 0.7
      }
    };

    const overlays = {
      Missouri : { geojson : mo_counties, dataLayer},
      Illinois : { geojson : il_counties, dataLayer},
      "Saint Louis" : { geojson : stl_counties , dataLayer},
    };

    const [viewport, setViewport] = useState({ ...mapViews[table] });
    const [hoveredFeature, setHoveredFeature] = useState({ feature: null });

    const [settings] = useState({
      doubleClickZoom: false,
      minZoom: 5,
      maxZoom: 20,
      minPitch: 0,
      maxPitch: 0
    });


    const updateRadio = (event) => {
      setRadio(event.target.value);
    };


    useEffect(() => {
      setViewport({...mapViews[table]})
      // eslint-disable-next-line
    }, [table]);


    const onHover = event => {
      const {
        features,
        srcEvent: {offsetX, offsetY}
      } = event;
      const feature = features && features.find(f => f.layer.id === 'data');
      setHoveredFeature({feature, x: offsetX, y: offsetY});
    };
  

    const renderTooltip = () => {
      const {feature, x, y} = hoveredFeature;
  
      return (
        feature && (
          <div className="tooltip" style={{left: x, top: y}}>
            <div>County: {feature.properties.NAME}</div>
            <div>GDP: {feature.properties["GDP (Thousands of dollars)"]}</div>
            <div>Labor Force: {feature.properties["Labor Force"]}</div>
            <div>Unemployment: {feature.properties["Unemployment Rate"]}</div>
            <div>Median Income: {feature.properties["Median Income Essential Workers"]}</div>
          </div>
        )
      );
    };


    return (
        <section id="map-section">
                <div id="legend-area">
      
                    
                      {
                        dataLayer.paint['fill-color'].stops
                          .map(stop => 
                            <div className="legend"> 
                              <div className="legend-values">{stop[0]}</div> <StopIcon className="legend-colors" style={{color : stop[1] }}/> 
                            </div>
                          )
                      }
                    
                 
                </div>          
                <Card id="filter-section">
                  <CardActions>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Measures</FormLabel>
                      <RadioGroup aria-label="measures" name="measures1" value={radio} onChange={updateRadio}>
                        <FormControlLabel value="GDP (Thousands of dollars)" control={<Radio color="primary"/>} label="GDP" />
                        <FormControlLabel value="Labor Force" control={<Radio color="primary"/>} label="Labor Force" />
                        <FormControlLabel value="Unemployment Rate" control={<Radio color="primary"/>} label="Unemployment" />
                        <FormControlLabel value="Median Income Essential Workers" control={<Radio color="primary"/>} label="Median Income" />
                      </RadioGroup>
                    </FormControl>
                  </CardActions>
                </Card>
            <ReactMapGL {...viewport} {...settings} className="map" onHover={onHover} transitionDuration={700} mapStyle="mapbox://styles/mapbox/light-v10" onViewportChange={viewport => setViewport(viewport)} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>
                <Source type="geojson" data={overlays[table].geojson}>
                    <Layer {...dataLayer} />
                </Source>
                {renderTooltip()}
            </ReactMapGL>
        </section>
    );
};


export default Map;