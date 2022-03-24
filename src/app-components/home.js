import React from 'react';
import { Component } from 'react';
import { Link } from "react-router-dom";
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

      // console.log(json)

      map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'data-json',
        'layout': {
          'icon-image': 'orange-x-box2',
          'text-field': ['get', 'IncidentName'],
          'text-font': [
            'Ubuntu Mono Bold',
            'Arial Unicode MS Bold'
          ],
          'text-size': 16,
          'text-offset': [0, 1.25],
          'text-anchor': 'top',
          'icon-allow-overlap': true,
          'text-allow-overlap': false
        }
      });
      
      const bounds = turf.bbox(json);
      map.fitBounds(bounds, { padding: 100, duration: 0 });
    });
  }

  render() {
    return (
      <div>
        <div ref={this.mapContainer} className="map-container" />
        <div className="title">
          <h1>Wildfires in the last 24 hours</h1>
        </div>
        <div className="title-about">
          <Link to="/sign-up">
            <span>Sign up</span>
          </Link>
          <Link to="/about">
            <span>About</span>
          </Link>
        </div>
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