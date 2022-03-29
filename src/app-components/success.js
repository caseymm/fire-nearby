import React from 'react';
import { Link } from "react-router-dom";

class Response extends React.Component {
  render() {
    return (
      <div className="success">
        <h1>Success!</h1>
        <p>You are now signed up to receive alerts. Please reply with "unsubscribe" or "stop" to stop receiving messages.</p>
        <p>Feel free to close this page or
        <Link className="home" to="/">
         view the map of current fires
        </Link>.
        </p>
      </div>
    );
  }
}

const Success = () => {
   return(
    <Response />
   )
}
 
export default Success;