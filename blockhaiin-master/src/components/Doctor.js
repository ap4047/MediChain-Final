import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Home from "./Home";
import { abi, contractAddress } from "./constants";
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import PatientRecordTable from "./PatientRecordTable";
import DoctorProfile from "./DoctorProfile";
import NavBar from "./NavBar";
import axios from 'axios';
import { saveAs } from 'file-saver';
// /const fs = require('fs');

// Binary buffer containing PDF data

function Doctor(props) {
  const [userid, setuserid] = useState([]);
  const [record, setRecord] = useState([]);
  useEffect(() => {
    setuserid(props.location.state.userid);
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
      const result = await contract.docotorOfId(userid);
      setpdata(result);
      console.log(pdata);
    };

    login();
  }, [userid]);
  const [patientID, setPatientID] = useState('');
  const [birthrecord, setBirthRecord] = useState(null);
  const [deathrecord, setDeathRecord] = useState(null);
  const handleSubmit = (e) => {
    console.log("inside handleSubmit")
    e.preventDefault();

    axios.get(`http://localhost:5000/patients/${patientID}`)
      .then(res => {
        setBirthRecord(res.data);
        console.log("record fetched");
        console.log(res.data);
        console.log("birthrecords fetced")
        console.log(birthrecord);
        console.log(birthrecord.patientID)
      })
      .catch(error => console.error(error));
  };
  const handledeathSubmit = (e) => {
    console.log("inside handleSubmit")
    e.preventDefault();

    axios.get(`http://localhost:5000/deadpatients/${patientID}`)
      .then(res => {
        setDeathRecord(res.data);
        console.log("dead record fetched");
        console.log(res.data);
        console.log("deathrecords fetced")
        console.log(deathrecord);
        console.log(deathrecord.patientID)
      })
      .catch(error => console.error(error));
  };
  const handleDownload = (certificate) => {
    const mimeType = certificate === 'birth' ? birthrecord.birthCertificateMimeType : deathrecord.deathCertificateMimeType;
    const fileData = certificate === 'birth' ? birthrecord.birthCertificate.data : deathrecord.deathCertificate.data;
    console.log(
      "datafetchedsdasfasdasdascfa",fileData
    )

    const binaryData = fileData;

// Save the binary buffer to a file
// fs.writeFileSync('output.pdf', binaryData);
    const buffer = fileData;
    const blob = new Blob([buffer], { type: mimeType });
  
    // Save the Blob object as a file
    saveAs(blob, 'output.pdf');
    // const blob = new Blob([fileData], { type: mimeType });
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = url;
    // link.download = `${patientID}_${certificate}_certificate`;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };
  const [patientId, setPatientId] = useState('');
  

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

    const username = event.target.username.value;
    // const password=event.target.password.value;
    console.log(username);
    console.log("getting contract in doctor login");
    const contract = await getcontract();
    console.log("got contract");

    console.log("Patient  record fetched");
    console.log(
      "================================================================"
    );
    const record = await contract.getPatientRecords(username);
    console.log(record);
    console.log("length=", record.length);
    setRecord(record);
  };

  return (
    <div className="container">
      <NavBar />
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Add Record</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Records</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="four"> birth Certificate</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="five"> Death Certificate</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <DoctorProfile record={pdata} />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
              <a  className="btn btn-info m-3" href="/addpatient">     
               Patient Registration
              </a>
              <a className="btn btn-info" href="/addrecord">Add Record</a>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <Form onSubmit={getPatientRecords}>
                  <Form.Group className="mb-6" controlId="doctorid">
                    <Form.Label>Enter PatientId</Form.Label>
                    <Form.Control
                      name="username"
                      size="sm"
                      type="number"
                      placeholder="Enter userid"
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
                <PatientRecordTable record={record} />
                {/* <PatientRecordTable record={record} /> */}
              </Tab.Pane>
              <Tab.Pane eventKey="four">
              <div class="form-group w-50">
                            <label htmlFor="patientId">Patient ID:</label>
                            <input class="form-control form-control-sm mb-3"
                              type="number"
                              id="patientId"
                              value={patientId}
                              onChange={(e) => setPatientId(e.target.value)}
                            />
                          </div>
              <div class="form-group">
                            <button class=" btn btn-primary" onClick={handleDownloadfun}>Download</button>
                          </div>
                    </Tab.Pane>
             <Tab.Pane eventKey="five">
             <div class="form-group w-50">
                            <label for="patientId">Patient ID:</label>
                            <br></br>
                            <input class="form-control form-control-sm mb-3"
                              type="number"
                              id="patientId"
                              value={patientId}
                              onChange={(e) => setPatientId(e.target.value)}
                            />
                          </div>
              <div class="form-group">
                            <button class=" btn btn-primary" onClick={handleDownloaddeath}>Download</button>
                          </div>
                     
             </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default Doctor;
