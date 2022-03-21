import React from 'react';
import './index.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import * as turf from '@turf/turf';

mapboxgl.accessToken =
    'pk.eyJ1IjoiY2FzZXltbWlsZXIiLCJhIjoiY2lpeHY1bnJ1MDAyOHVkbHpucnB1dGRmbyJ9.TzUoCLwyeDoLjh3tkDSD4w';

export default class App extends React.PureComponent {
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
    let loaded = false;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/caseymmiler/cktf3jdcs2ws819qttibvokom',
      center: [lng, lat],
      zoom: zoom
    });

    const params = window.location.search
    .slice(1)
    .split('&')
    .map((p) => p.split('='))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

    console.log(params);

    const postDiv = () => {
      console.log('loaded')
      // signal done
      const Div = document.createElement('div');
      Div.id = 'hidden';
      document.getElementsByClassName('map-container')[0].appendChild(Div);
    }

    setTimeout(function(){
      if(!loaded){
        window.location.reload();
      }
    }, 3000)

    async function loadData() {
      const resp = await fetch(params.url);
      const json = await resp.json();
      return json;
    }

    loadData().then(json => {
      // map.on('load', function () {
      console.log('ran load')
      loaded = true;
      map.addSource('data-json', {
        type: 'geojson',
        data: json,
      });

      // Add a new layer to visualize the polygon.
      map.addLayer({
        id: 'data-json-layer',
        type: 'fill',
        source: 'data-json', // reference the data source
        layout: {},
        paint: {
          'fill-color': `#${params.fill}`,
          'fill-opacity': parseFloat(params['fill-opacity']),
        },
      });
      
      map.addLayer({
        id: 'outline',
        type: 'line',
        source: 'data-json',
        layout: {},
        paint: {
          'line-color': `#${params.fill}`,
          'line-width': 2,
        },
      });
    
      const bounds = turf.bbox(json);
      map.fitBounds(bounds, { padding: 100, duration: 0 });
      setTimeout(function(){
        console.log('brb crying');
        postDiv();
      }, 5000)
    });
    // });
  }

  render() {
    return (
      <div>
        <div ref={this.mapContainer} className="map-container" />
      </div>
    );
  }
}