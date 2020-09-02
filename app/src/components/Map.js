// Libraries
import React, {useState, useEffect} from 'react';
import ReactMapGL, {Source, Layer} from "react-map-gl";
import StopIcon from '@material-ui/icons/Stop';
import Hidden from '@material-ui/core/Hidden';
import {Card, CardActions, Typography} from '@material-ui/core';
import {Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@material-ui/core';

// Styles
import './Map.css';

// Data
import stl_counties from '../data/geojson/MSA_Stats.geojson';
import mo_counties from '../data/geojson/MO_Stats.geojson';
import il_counties from '../data/geojson/IL_Stats.geojson';


const palette = [
  '#ffffd9',
  '#edf8b1',
  '#c7e9b4',
  '#7fcdbb',
  '#41b6c4',
  '#1d91c0',
  '#225ea8',
  '#253494',
  '#081d58'
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
    "Frontline Industry Rate": [2.47,11.89,16.55,20.93,25.88,32.72,41.34,49.47,73.92]
    .map((stop, index) => [stop, palette[index]]),
};



const mapViews = {
  Missouri : { latitude : 37.9643, longitude : -91.8318, zoom: 5 },
  Illinois : { latitude : 39.6331, longitude : -88.3985, zoom: 5 },
  "Saint Louis" : { latitude : 38.6264178, longitude : -90.1998378, zoom: 7},
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

    const [viewport, setViewport] = useState({ ...mapViews[table],  width: "100%", height: "100%", pitch: 0 });
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
      setViewport({...viewport, ...mapViews[table]})
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
            <div>Frontline Rate: {feature.properties["Frontline Industry Rate"]}</div>
          </div>
        )
      );
    };


    return (
        <>
        <Hidden lgUp>
          <section id="filter-section-small">
            <FormControl component="fieldset">
              <FormLabel component="legend">Measures</FormLabel>
              <RadioGroup aria-label="measures" name="measures1" value={radio} onChange={updateRadio} row>
                <FormControlLabel value="GDP (Thousands of dollars)" control={<Radio color="primary"/>} label="GDP" />
                <FormControlLabel value="Labor Force" control={<Radio color="primary"/>} label="Labor Force" />
                <FormControlLabel value="Unemployment Rate" control={<Radio color="primary"/>} label="Unemployment" />
                <FormControlLabel value="Median Income Essential Workers" control={<Radio color="primary"/>} label="Median Income" />
                <FormControlLabel value="Frontline Industry Rate" control={<Radio color="primary"/>} label="Frontline Rate" />
              </RadioGroup>
            </FormControl>
          </section>
        </Hidden>

        <section id="map-section">
          <Hidden only={['xs', 'sm', 'md']}>
            <div id="legend-area-container">
              <div id="legend-area">
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
            <Card id="filter-section">
              <CardActions>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Measures</FormLabel>
                  <RadioGroup aria-label="measures" name="measures1" value={radio} onChange={updateRadio}>
                    <FormControlLabel value="GDP (Thousands of dollars)" control={<Radio color="primary"/>} label="GDP" />
                    <FormControlLabel value="Labor Force" control={<Radio color="primary"/>} label="Labor Force" />
                    <FormControlLabel value="Unemployment Rate" control={<Radio color="primary"/>} label="Unemployment" />
                    <FormControlLabel value="Median Income Essential Workers" control={<Radio color="primary"/>} label="Median Income" />
                    <FormControlLabel value="Frontline Industry Rate" control={<Radio color="primary"/>} label="Frontline Rate" />
                  </RadioGroup>
                </FormControl>
              </CardActions>
            </Card>
          </Hidden>
          <ReactMapGL 
            {...viewport}
            {...settings}
            className="map"
            onHover={onHover}
            transitionDuration={700}
            mapStyle="mapbox://styles/mapbox/light-v10"
            onViewportChange={viewport => setViewport(viewport)}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            >
              <Source type="geojson" data={overlays[table].geojson}>
                  <Layer {...dataLayer} />
              </Source>
              {renderTooltip()}
          </ReactMapGL>
        </section>
        
        <Hidden lgUp>
          <div id="legend-area-container-small">
            <div id="legend-area-small">
              <Typography>Legend</Typography>
              {
                dataLayer.paint['fill-color'].stops
                  .map(stop => 
                    <>
                      <span key={stop[0]} className="legend-values-small">{stop[0]}</span> <StopIcon className="legend-colors-small" style={{color : stop[1] }}/> 
                    </>
                  )
              }
            </div>
          </div>
        </Hidden>
      </>
    );
};


export default Map;