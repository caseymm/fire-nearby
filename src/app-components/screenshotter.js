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

    // ?userLoc=xx,xx&fireLoc=xx,xx
    const params = window.location.hash
    .replace('#/screenshot?', '')
    .split('&')
    .map((p) => p.split('='))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

    const returnCoords = (string) => {
      let array = string.split(',');
      console.log(array)
      return [parseFloat(array[0]), parseFloat(array[1])];
    }

    console.log(params);

    const postDiv = () => {
      console.log('loaded')
      // signal done
      const Div = document.createElement('div');
      Div.id = 'hidden';
      document.getElementsByClassName('map-container')[0].appendChild(Div);
    }

    const customData = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "category": "userLoc"
          },
          "geometry": {
            "type": "Point",
            "coordinates": returnCoords(params.userLoc)
          }
        }
      ]
    };

    const customDataFire = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "category": "fireLoc"
          },
          "geometry": {
            "type": "Point",
            "coordinates": returnCoords(params.fireLoc)
          }
        }
      ]
    };

    map.on('load', function () {
      console.log('ran load')

      map.addSource('data-json', {
        type: 'geojson',
        data: customData
      });

      map.addLayer({
        id: 'data-json-layer',
        type: 'circle',
        source: 'data-json', // reference the data source
        layout: {},
        paint: {
          'circle-radius': 7,
          'circle-color': '#5444e3',
          'circle-stroke-color': '#ffffff',
          'circle-stroke-width': 2
        },
      });

      map.addLayer({
        id: 'data-json-layer-text',
        type: 'symbol',
        source: 'data-json', // reference the data source
        layout: {
          'text-field': decodeURI(params.userLocName),
          'text-font': [
            'Ubuntu Mono Bold',
            'Arial Unicode MS Bold'
          ],
          'text-size': 18,
          'text-offset': [0, 1],
          'text-anchor': 'top'
        }
      });

      map.addSource('data-json-fire', {
        type: 'geojson',
        data: customDataFire
      });

      // Add a symbol layer
      map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'data-json-fire',
        'layout': {
          'icon-image': 'orange-x-box2',
          // get the title name from the source's "title" property
          'text-field': decodeURI(params.fireLocName),
          'text-font': [
            'Ubuntu Mono Bold',
            'Arial Unicode MS Bold'
          ],
          'text-size': 18,
          'text-offset': [0, 1.25],
          'text-anchor': 'top'
        }
      });

      const bboxJson = {
        "type": "FeatureCollection",
        "features": [
          customData.features[0],
          customDataFire.features[0]
        ]
      }
          
      const bounds = turf.bbox(bboxJson);
      map.fitBounds(bounds, { padding: 120, duration: 0 });
      setTimeout(function(){
        console.log('posting div');
        postDiv();
      }, 5000)
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

const Screenshotter = (props) => {
   return(
    <Map />
   )
}
 
export default Screenshotter;