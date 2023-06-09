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
import NavBar from "./NavBar";
// import Button from 'react-bootstrap/esm/Button';
// import { useHistory } from 'react-router-dom';
function Patient(props) {
  // function async getpatientdetails
  // window.alert("hii");
  const [userid, setuserid] = useState([]);
  const [record, setRecord] = useState([]);
  const [patientId, setPatientId] = useState('');
  useEffect(() => {
    setuserid(props.location.state.userid);
    setPatientId(props.location.state.userid)
  }, []);

  console.log(userid);

  const [pdata, setpdata] = useState([]);

  async function getcontract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    return contract;
  }
  useEffect(() => {
    const login = async () => {
      const contract = await getcontract();
      const result = await contract.getPatient(userid);
      setpdata(result);
    };

    login();
  }, [userid]);
  
  const handleDownloadfun = async () => {
    try {
      const response = await fetch(`http://localhost:3001/download/${patientId}`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `BirthCertificate_${patientId}.png`;
        link.click();
      } else {
        console.error('Failed to download birth certificate!');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDownloaddeath = async () => {
    try {
      const response = await fetch(`http://localhost:3001/downloaddeath/${patientId}`);

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `DeathCertificate_${patientId}.png`;
        link.click();
      } else {
        console.error('Failed to download death certificate!');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getPatientRecords = async (event) => {
    event.preventDefault();

    console.log("nside get patient records");
    // const password=event.target.password.value;
    console.log(userid);
    console.log("getting contract in doctor login");
    const contract = await getcontract();
    console.log("got contract");

    console.log("Patient  record fetched");
    console.log(
      "================================================================"
    );
    const record = await contract.getPatientRecords(userid);
    console.log(record);
    console.log("length=", record.length);
    setRecord(record);
  };
  return (
    <>
      <NavBar/>

      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" onClick={getPatientRecords}>
                  Records
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third"> Certificates</Nav.Link>
              </Nav.Item>
            
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Profile record={pdata} />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <PatientRecordTable record={record} />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
              <div class="form-group w-50 m-3">
                            <button class=" btn btn-primary" onClick={handleDownloadfun}>Download birth certificate </button>
                          </div>
                          <div class="form-group w-50 m-3">
                            <button class=" btn btn-primary" onClick={handleDownloaddeath}>Download Death Certificate</button>
                          </div>
              </Tab.Pane>
             
             
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}
export default Patient;
/* <Profile 
  id={123}
  name="John Doe"
  height={170}
  weight={70}
  age={32}
  location="123 Main St, Anytown, USA"
  email="johndoe@example.com"
  password="12345"
/> */
