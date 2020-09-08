// Libraries
import React, {useState, useEffect} from 'react';

// Styles
import './NativeMap.css';

const mapboxgl = require('mapbox-gl');


mapboxgl.accessToken = 'pk.eyJ1IjoidGhlb2RvcmVtb3JlbGFuZCIsImEiOiJja2RxZjB6enIwbXRrMndqejd0dXdtMDN2In0.DecULRSpbXosIctuTG2L-g';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
});


const Map = (props) => {

    return (
        <section id="map">
            {map}
        </section>
    )

}

export default Map;