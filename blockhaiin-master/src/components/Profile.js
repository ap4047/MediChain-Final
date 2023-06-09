
import 'bootstrap/dist/css/bootstrap.min.css';

// import Home from './Home';
import React  from 'react';
function Profile(props) {
 
    return (
      <>
      <div>
     
        <h2>Profile Information:</h2>
        <ul>
        <li>Name:{props.record.name}</li>
        <li>Patient ID:{props.record.id? parseInt(props.record.id._hex, 16):'-'}</li>
        <li>Age:{props.record.age}</li>
        <li>Gender:{props.record.gender}</li>
        <li>Height:{props.record.height? parseInt(props.record.height._hex, 16):'-'}</li>
        <li>Weight:{props.record.weight? parseInt(props.record.weight._hex, 16):'-'}</li>
        <li>Location:{props.record.location}</li>
        <li>Contact:{props.record.contact? parseInt(props.record.contact._hex, 16):'-'}</li>
        <li>Email:{props.record.email}</li>
         
        </ul>
        
      </div>
      </>
    );
  }

  export default Profile;