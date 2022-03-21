import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      location: '',
      phone: '',
      radius: '',
      coordinates: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const address = this.state.location;
    
    async function loadData(address) {
      const token = process.env.REACT_APP_MAPBOX_KEY;
      console.log(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=place%2Cpostcode%2Caddress&access_token=${token}`)
      const resp = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=place%2Cpostcode%2Caddress&access_token=${token}`);
      const json = await resp.json();
      return json;
    }

    loadData(address).then(json => {
      this.state.coordinates = json.features[0].center;
      // POST
      fetch(process.env.REACT_APP_API_URL, {
        method: 'POST',
        body: JSON.stringify(this.state),
      }).then((response) => {
        // console.log(response);
        alert('Your information has been submitted');
      });
    })
    event.preventDefault();
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
            Phone number:
            <input type="text" name='phone' value={this.state.phone} onChange={this.handleChange} />
          </label>
          <label>
            Address (please include city and state):
            <input type="text" name='location' value={this.state.location} onChange={this.handleChange} />
          </label>
          <label>
            Max distance (in miles):
            <input type="text" name='radius' value={this.state.radius} onChange={this.handleChange} />
          </label>
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