// Libraries
import React, {useState, useEffect} from 'react';
import ReactMapGL, {Source, Layer, NavigationControl} from "react-map-gl";


// Styles
import './Map.css';

// Data
import stl_counties from '../data/geojson/STL_MSA_Counties.geojson';
import mo_counties from '../data/geojson/MO_Counties.geojson';
import il_counties from '../data/geojson/IL_Counties.geojson';


const dataLayer = {
    id: 'data',
    type: 'fill',
    paint: {
      'fill-color': {
        property: 'COUNTYFP',
        stops: [
          [0, '#3288bd'],
          [1, '#66c2a5'],
          [2, '#abdda4'],
          [3, '#e6f598'],
          [4, '#ffffbf'],
          [5, '#fee08b'],
          [6, '#fdae61'],
          [7, '#f46d43'],
          [8, '#d53e4f']
        ]
      },
      'fill-opacity': 0.2
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
      Missouri : { latitude : 37.9643, longitude : -91.8318, zoom: 5, width: "66vw", height: "60vh", pitch: 30 },
      Illinois : { latitude : 40.6331, longitude : -89.3985, zoom: 5, width: "66vw", height: "60vh", pitch: 30 },
      "Saint Louis" : { latitude : 38.6264178, longitude : -90.1998378, zoom: 7, width: "66vw", height: "60vh", pitch: 30 },
    };

    const [viewport, setViewport] = React.useState({ ...mapViews[table] });

    const [settings, setSettings] = useState({
      doubleClickZoom: false,
      minZoom: 5,
      maxZoom: 20,
      minPitch: 30,
      maxPitch: 30
    });


    useEffect(() => {
      setViewport({...mapViews[table]})
    }, [table]);


    return (
        <section id="map-section">
          <ReactMapGL {...viewport} {...settings} className="map" transitionDuration={700} mapStyle="mapbox://styles/mapbox/light-v10" onViewportChange={viewport => setViewport(viewport)} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>
              <Source type="geojson" data={overlays[table].geojson}>
                  <Layer {...dataLayer} />
              </Source>
              <div style={{position: 'absolute', right: 0}}>
                <NavigationControl />
              </div>
          </ReactMapGL>
        </section>
    );
}


export default Map;