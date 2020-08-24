// Libraries
import React, {useState, useEffect} from 'react';
import ReactMapGL, {Source, Layer} from "react-map-gl";
import {Card, CardActions, CardContent, Typography} from '@material-ui/core';
import {Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@material-ui/core';

// Styles
import './Map.css';

// Data
import stl_counties from '../data/geojson/STL_MSA_Counties.geojson';
import mo_counties from '../data/geojson/MO_Counties.geojson';
import il_counties from '../data/geojson/IL_Counties.geojson';

const stops = {
  "GDP":[65222,2417968,7349716,16857130,32631130,47496821,67701128,91380287,411671713],
  "LaborForce":[964,14881,44273,101894,171051,281764,381084,524849,2765106],
  "Unemployment":[2.27,3.61,4.62,5.41,6.17,7.21,8.57,10.08,15.91],
  "MedianIncome":[23689,27750,30409,32875,35341,38019,40993,44732,50396]
};


const dataLayer = {
    id: 'data',
    type: 'fill',
    paint: {
      'fill-color': {
        property: 'ALAND',
        stops: [
          [0, '#3288bd'],
          [1, '#66c2a5'],
          [2, '#abdda4'],
          [3, '#e6f598'],
          [4, '#ffffbf'],
          [5, '#fee08b'],
          [6, '#fdae61'],
          [7, '#f46d43'],
          [80, '#d53e4f']
        ]
      },
      'fill-opacity': 0.5
    }
  };

const overlays = {
  Missouri : { geojson : mo_counties, dataLayer},
  Illinois : { geojson : il_counties, dataLayer},
  "Saint Louis" : { geojson : stl_counties , dataLayer},
}

  
const Map = (props) => {

    const { table } = props;

    const mapViews = {
      Missouri : { latitude : 37.9643, longitude : -91.8318, zoom: 5, width: "66vw", height: "60vh", pitch: 0 },
      Illinois : { latitude : 40.6331, longitude : -89.3985, zoom: 5, width: "66vw", height: "60vh", pitch: 0 },
      "Saint Louis" : { latitude : 38.6264178, longitude : -90.1998378, zoom: 7, width: "66vw", height: "60vh", pitch: 0 },
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
          </div>
        )
      );
    }


    return (
        <section id="map-section">
                          <Card id="filter-section">
                  <CardContent>
                  
                    <Typography component="legend">
    {dataLayer.paint["fill-color"].stops.map(stop => <div height={40} width={40} backgroundColor={`${stop[1]}`}></div>)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Measures</FormLabel>
                    <RadioGroup aria-label="measures" name="measures1" value={"value"}>
                      <FormControlLabel value="GDP" control={<Radio />} label="GDP" />
                      <FormControlLabel value="LaborForce" control={<Radio />} label="Labor Force" />
                      <FormControlLabel value="Unemployment" control={<Radio />} label="Unemployment" />
                      <FormControlLabel value="MedianIncome" control={<Radio />} label="Median Income" />
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
}


export default Map;