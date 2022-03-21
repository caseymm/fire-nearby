import React from 'react';
import { Component } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import * as turf from '@turf/turf';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -98.78320225360663,
      lat: 40.45646421496375, 
      zoom: 3.5
    };
    this.mapContainer = React.createRef();
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/caseymmiler/cl11818ga000216ng2az1efhm',
      center: [lng, lat],
      zoom: zoom
    });

    const scale = new mapboxgl.ScaleControl({
      maxWidth: 150,
      unit: 'imperial'
    });
    map.addControl(scale);
      
    scale.setUnit('imperial');

    async function loadData() {
      const resp = await fetch('https://firenearby.s3.amazonaws.com/latest.json');
      const json = await resp.json();
      return json;
    }

    loadData().then(json => {
      // map.on('load', function () {
      console.log('ran load')
      map.addSource('data-json', {
        type: 'geojson',
        data: json,
      });

      // Add a new layer to visualize the points.
      map.addLayer({
        id: 'data-json-layer',
        type: 'circle',
        source: 'data-json', // reference the data source
        layout: {},
        paint: {
          'circle-radius': 5,
          'circle-color': '#fc9403',
          'circle-stroke-color': '#ffffff',
          'circle-stroke-width': 2
        },
      });
      
      const bounds = turf.bbox(json);
      map.fitBounds(bounds, { padding: 100, duration: 0 });
    });
  }

  render() {
    return (
      <div>
        <div ref={this.mapContainer} className="map-container" />
      </div>
    );
  }
}

const Home = (props) => {
   return(
    <Map />
   )
}
 
export default Home;