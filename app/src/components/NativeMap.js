import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

// Material UI
import StopIcon from '@material-ui/icons/Stop';
import Hidden from '@material-ui/core/Hidden';
import {Card, CardActions, Typography} from '@material-ui/core';
import {Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@material-ui/core';


// Custom Styles
import './NativeMap.css';

// Data
import stl_counties from '../data/geojson/MSA_Stats.geojson';
import mo_counties from '../data/geojson/MO_Stats.geojson';
import il_counties from '../data/geojson/IL_Stats.geojson';

// Token
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;


const data = {
  "Saint Louis" : stl_counties,
  "Illinois" : il_counties,
  "Missouri" : mo_counties
};


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
  Missouri : { center: [-91.8318, 37.9643], zoom: 5 },
  Illinois : { center: [-88.3985, 39.6331], zoom: 5 },
  "Saint Louis" : { center: [-90.1998378, 38.6264178], zoom: 7},
};


const Map = (props) => {

  const { selectedTableName } = props;

  const firstUpdate = useRef(true);
  const secondUpdate = useRef(true);
  const mapContainerRef = useRef(null);
  
  const [lng, setLng] = useState(mapViews[selectedTableName].center[0]);
  const [lat, setLat] = useState(mapViews[selectedTableName].center[1]);
  const [zoom, setZoom] = useState(mapViews[selectedTableName].zoom);
  const [hoveredFeature, setHoveredFeature] = useState({ feature: null });
  const [mapRef, setMapRef] = useState(null);

  const [radio, setRadio] = useState('GDP (Thousands of dollars)');

  const dataLayer = {
    id: "root-layer",
    type: 'fill',
    source: "source-data",
    paint: {
      'fill-color': {
        property: radio,
        stops: stops[radio]
      },
      'fill-opacity': 0.7
    }
  };

  const updateRadio = (event) => {
    setRadio(event.target.value);
  };

  const onHover = event => {
    console.log(event);
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
        <div className="tooltipz" style={{left: x, top: y}}>
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
  
  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [lng, lat],
      zoom: zoom
    });

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.on('mouseover', onHover);

    map.on('load', function() {
      map.addSource("source-data", {type: "geojson", data: mo_counties});
      map.addLayer(dataLayer);
    });

    setMapRef(map);

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  // Updates Geography
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    else {
      mapRef.easeTo(mapViews[selectedTableName]);
      mapRef.getSource("source-data").setData(data[selectedTableName]);
    }
  }, [selectedTableName]); // eslint-disable-line react-hooks/exhaustive-deps


  // Updates Measure
  useLayoutEffect(() => {
    if (secondUpdate.current) {
      secondUpdate.current = false;
      return;
    }
    else {
      mapRef.setPaintProperty(
        "root-layer",
        "fill-color", 
        { property: radio, stops: stops[radio]}
      );
    }
  }, [radio]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <section id="map-section">
      <Hidden only={['xs', 'sm', 'md']}>
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
        <Card id="filter-section-large">
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
      <div className='map-container' ref={mapContainerRef} />
      {renderTooltip()}
    </section>
  );
};


export default Map;