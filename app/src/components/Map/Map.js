import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

// Material UI
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

// Custom Styles
import './Map.css';

// Custom Components
import {FilterLarge, FilterSmall} from './Filter';
import {LegendLarge, LegendSmall} from './Legend';
import Tooltip from './Tooltip';

// Data
import stl_counties from '../../data/geojson/MSA_Stats.geojson';
import mo_counties from '../../data/geojson/MO_Stats.geojson';
import il_counties from '../../data/geojson/IL_Stats.geojson';

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
  const [mapRef, setMapRef] = useState(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  const [radio, setRadio] = useState('GDP (Thousands of dollars)');
  
  const [lng, setLng] = useState(mapViews[selectedTableName].center[0]);
  const [lat, setLat] = useState(mapViews[selectedTableName].center[1]);
  const [zoom, setZoom] = useState(mapViews[selectedTableName].zoom);


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

    // change cursor to pointer when user hovers over a clickable feature
    map.on('mouseenter', e => {
      if (e.features.length) {
        map.getCanvas().style.cursor = 'pointer';
      }
    });

    // reset cursor to default when user is no longer hovering over a clickable feature
    map.on('mouseleave', () => {
      map.getCanvas().style.cursor = '';
    });

    // add tooltip when users mouse move over a point
    map.on('mousemove', e => {
      const features = map.queryRenderedFeatures(e.point);
      if (features.length) {
        const feature = features[0];

        // Create tooltip node
        const tooltipNode = document.createElement('div');
        ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

        // Set tooltip on map
        tooltipRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(tooltipNode)
          .addTo(map);
      }
    });

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
    <>
      {/* Filter (above map) */}
      <Hidden lgUp>
        <FilterSmall radio={radio} updateRadio={updateRadio}/>
      </Hidden>

      <section id="map-section">
        <Hidden only={['xs', 'sm', 'md']}>
          {/* Filter (atop map) */}
          <FilterLarge radio={radio} updateRadio={updateRadio}/>

          {/* Legend (atop map) */}
          <LegendLarge dataLayer={dataLayer} />
        </Hidden>

        {/* Map */}
        <div className='map-container' ref={mapContainerRef} />
      </section>

      {/* Legend (below map) */}
      <Hidden lgUp>
        <LegendSmall dataLayer={dataLayer} />
      </Hidden>
    </>
  );
};


export default Map;