import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as turf from '@turf/turf';

let mapProps = {
  location: '',
  radius: '20',
  coordinates: '',
  rangeDrawn: false,
  dotDrawn: false
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      location: '',
      phoneNumber: '',
      radius: '20',
      coordinates: '',
      phoneInvalid: ''
    };

    this.mapContainerLocation = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // console.log(event.target.className)
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    this.state.phoneNumber = this.state.phoneNumber.replace(/[^+\d]+/g, "");
    this.state.location = mapProps.location;
    this.state.coordinates = mapProps.coordinates;
    this.state.radius = mapProps.radius;
    if(this.state.phoneNumber.length !== 10){
      console.log('invalid phone number')
      this.setState({
        'phoneInvalid': 'invalid'
      });
    } else {
      this.setState({
        'phoneInvalid': 'valid'
      });
      // console.log(this.state)
      fetch(process.env.REACT_APP_API_URL, {
        method: 'POST',
        body: JSON.stringify(this.state),
      }).then((response) => {
        window.location = `${window.location.origin}${window.location.pathname}#/success`;
      });
    }
    event.preventDefault();
  }

  componentDidMount() {
    const { lng, lat, zoom } = {
      lng: -96,
      lat: 38.9, 
      zoom: 2.35
    };
    const map = new mapboxgl.Map({
      container: this.mapContainerLocation.current,
      style: 'mapbox://styles/caseymmiler/cl11818ga000216ng2az1efhm',
      center: [lng, lat],
      zoom: zoom,
      cooperativeGestures: true,
    });
    map.scrollZoom.disable();

    const scale = new mapboxgl.ScaleControl({
      maxWidth: 150,
      unit: 'imperial'
    });
    map.addControl(scale);
    scale.setUnit('imperial');

    const token = process.env.REACT_APP_MAPBOX_KEY;
    const geocoder = new MapboxGeocoder({
      accessToken: token,
      mapboxgl: mapboxgl,
      countries: 'us, ca, mx',
      marker: false
    });

    const testRangeDrawn = () => {
      if(mapProps.rangeDrawn){
        map.removeLayer("circle-fill");
        map.removeSource("circleData");
        drawRange();
      } else {
        mapProps.rangeDrawn = true;
        drawRange();
      }
    }

    const drawRange = () => {
      const radius = parseInt(mapProps.radius);
      const options = {
        steps: 300,
        units: "miles",
      };

      const circle = turf.circle(mapProps.coordinates, radius, options);
      map.addSource("circleData", {
        type: "geojson",
        data: circle
      });

      map.addLayer({
          id: "circle-fill",
          type: "fill",
          source: "circleData",
          paint: {
            "fill-color": "blue",
            "fill-opacity": 0.15
          }
      });

      const bounds = turf.bbox(circle);
      map.fitBounds(bounds, { padding: 10, duration: 0 });
    }

    const drawDot = (results) => {
      mapProps.coordinates = results.result.center;
      mapProps.location = results.result.place_name.replace(', United States', '');
      
      map.addSource('data-json', {
        type: 'geojson',
        data: {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": mapProps.coordinates
              }
            }
          ]
        }
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
      map.flyTo({
        center: mapProps.coordinates,
      });
      testRangeDrawn();
    }

    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    geocoder.on('result', function(results){
      // console.log('result', results);
      if(mapProps.dotDrawn){
        map.removeLayer('data-json-layer');
        map.removeSource("data-json");
        drawDot(results);
      } else {
        mapProps.dotDrawn = true;
        drawDot(results);
      }
    })

    const range = document.querySelector('.range');
    range.addEventListener('change', function(event){
      mapProps.radius = event.target.value;
      if(mapProps.coordinates.length > 0){
        testRangeDrawn();
      }
    });

    // map.on('load', function () {
    //   console.log('ran load')
    // });
  }

  render() {
    return (
      <div className="signup">
        <h1>Sign up for alerts</h1>
        <p>Please submit this form to sign up for text alerts of fires near your specified location.</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name='username' value={this.state.username} onChange={this.handleChange} />
          </label>
          <label>
            Phone number (10 digit US):
            <input type="text" name='phoneNumber' className={this.state.phoneInvalid} value={this.state.phoneNumber} onChange={this.handleChange} />
          </label>
          <label>
            Address:
            <div name='location' id="geocoder" className="geocoder" />
          </label>
          <label>
            <div style={{'position': 'relative'}}>
              Max distance:
              <div className="range-label">{this.state.radius} {this.state.radius === '1' ? 'mile' : 'miles'}</div>
            </div> 
            <input type="range" className="range" name="radius" min="1" max="100" value={this.state.radius} onChange={this.handleChange} step="1"></input>
          </label>
          <div ref={this.mapContainerLocation} className="map-container-location" />
          <input className="submit" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const SignUpForm = (props) => {
   return(
    <Form />
   )
}
 
export default SignUpForm;