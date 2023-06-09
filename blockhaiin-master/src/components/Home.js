import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import img1 from './img1.jpg';
import 'animate.css/animate.min.css';
import NavBar from './NavBar';
// import {abi,contractAddress} from './constants';
// import { ethers } from "ethers";

function Home() {
  
  const  connect = async ()=>{
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("connected");
        document.getElementById("connectbtn").innerHTML="connected";
      } else {
        console.log("Intall metamask");
      }

     
}






  
  return (
    <div>
    <NavBar/>
    
   
    
    <div className="container">
      <div className="row">
        <div className="col-md-5 p-0 image">
          <img src={img1} alt="Medical Image" className="img-fluid" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <div className="container">
            <h1 className="heading animate__animated animate__fadeIn animate__infinite animate__slower animate__colorChange" style={{ fontSize: '120px' }}>MediChain</h1>
            <p className="description" style={{ fontSize: '25px',color:'green'}}>We give decentricity and security to patient's data and ensure data confidentiality.</p>
          </div>
        </div>
      </div>
    </div>
   
  
   </div>
  );
}

export default Home;