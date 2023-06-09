import Home from "./Home";
import React, { useEffect, useState } from "react";
import { abi, contractAddress } from "./constants";
import { ethers } from "ethers";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import PatientRecordTable from "./PatientRecordTable";
import Profile from "./Profile";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import img1 from './img1.jpg';
import 'animate.css/animate.min.css';
// import Button from 'react-bootstrap/esm/Button';
// import { useHistory } from 'react-router-dom';
function NavBar({ isLoggedIn }) {
  
  const {loggedin,setLoggedIn}=useState('false')

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
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        
        <Navbar.Brand href="/">MediChain</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
           
            <NavDropdown title="Patient" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/patientlogin">Patient Login</NavDropdown.Item>
            
            
            </NavDropdown>
        
           
           <NavDropdown title="Doctor" id="collasible-nav-dropdown">
             <NavDropdown.Item href="/doctorlogin">Doctor Login</NavDropdown.Item>
        
             <NavDropdown.Item href="/adddoctor">Register Doctor</NavDropdown.Item>
            
           </NavDropdown>
           
         </Nav>
         <Nav className="d-flex m-3">
         <Button variant="outline-success" onClick={connect} id="connectbtn">Connect</Button>
         </Nav>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}
export default NavBar;

