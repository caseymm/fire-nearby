import React from 'react';

class Details extends React.Component {
  render() {
    return (
      <div className="about">
        <h1>About this project</h1>
        <p>The data for this page is provided by NIFC's Wildland Fire Interagency Geospatial Services. The <a href="https://data-nifc.opendata.arcgis.com/datasets/nifc::wfigs-last-24-hour-wildland-fire-locations/about">
        WFIGS - Last 24 Hour Wildland Fire Locations data set</a><span>*</span> is displayed on the main map and used to generate
        text alerts. The image generation and text alerts are powered by <a href="https://github.com/caseymm/firenearby-service">
        github actions</a> and twilio.</p>
        <p className="note"><span>*</span>This dataset does not include prescribed fires. Additionally, in an attempt to only capture 
        fires worthy of a notice, I have filtered the data set to only include points listed as having the "DiscoveryAcres" 
        attribute greater than or equal to 1.</p>
        <p>This project is a prototype. It does not yet (and may no ever, tbd) have a user management system. For now, 
        if you'd like to stop receiving alerts, please email [caseymm @ gmail] or <a href="https://twitter.com/caseymmiller">
        DM me</a> and I'll remove those alerts for you.</p>
        <p>I'm hoping to keep working on this and improving it, so please let me know if you find any bugs or have any 
        ideas for improvment. Firenearby is definitely <a href="https://github.com/caseymm/fire-nearby">still a wip</a>.</p>
      </div>
    );
  }
}

const About = () => {
   return(
    <Details />
   )
}
 
export default About;