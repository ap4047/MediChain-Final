import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Home from './Home';
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import {abi, contractAddress} from "./constants";
import { ethers } from "ethers";
import NavBar from './NavBar';
import { useState } from 'react';
import axios from 'axios';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

import firebaseConfig from '../firebaseConfig';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
function AddRecord() {
  async function getcontract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    return contract;
  }
  // const [patientID, setPatientID] = useState('');
  // const [birthCertificate, setBirthCertificate] = useState(null);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('patientID', patientID);
  //   formData.append('birthCertificate', birthCertificate);

  //   axios.post('http://localhost:5000/patients', formData)
  //     .then(res => {
  //       console.log(res.data);
  //       setPatientID('');
  //       setBirthCertificate(null);
  //     })
  //     .catch(error => console.error(error));
  // };

  // const handleFileChange = (e) => {
  //   setBirthCertificate(e.target.files[0]);
  // };
  // const [deathCertificate, setDeathCertificate] = useState(null);
  // const handleDeathSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('patientID', patientID);
  //   formData.append('deathCertificate', deathCertificate);

  //   axios.post('http://localhost:5000/deadpatients', formData)
  //     .then(res => {
  //       console.log(res.data);
  //       setPatientID('');
  //       setDeathCertificate(null);
  //     })
  //     .catch(error => console.error(error));
  // };
  // const handleDeathFileChange = (e) => {
  //   setDeathCertificate(e.target.files[0]);
  // };

  const registerrecord = async(event)=>{
    event.preventDefault();
    console.log("inside registerrecord");
    // const address=event.target.address.value;
    console.log(event.target.doctorid);
    const doctorid=event.target.doctorid.value;
    const patientid=event.target.patientid.value;
    const recordid=event.target.recordid.value;
    const diagnosis=event.target.diagnosis.value;
    const treatment=event.target.treatment.value;
    const prescription=event.target.prescription.value;
    const tests=event.target.tests.value;
    const date=event.target.date.value;
    console.log("health record values are: ")
    console.log("=====================================");
    console.log("="+doctorid+"="+patientid+"="+recordid+"="+diagnosis+"="+treatment+"="+prescription+"="+tests+"="+date);
    console.log("=====================================");
try{
    const response = await fetch(`http://localhost:3001/checkdeadoralive/${patientid}`);
    console.log("response is ",response)
    if (response.ok) {
      console.log("getting contract for addrecord");
      const contract = await getcontract();
      console.log("adding record");
      const  transaction = await contract.addRecord(recordid,patientid,doctorid,diagnosis,treatment,prescription,tests,date);
      console.log("added record");
      console.log(transaction); 
      
    } else {
      console.error("person is dead");
      window.alert("person is birth or death data is not found");
 
    }
  }catch(error) {
    console.error(error);
  }

   
  }
  
  // const [birthCertificate, setBirthCertificate] = useState(null);
  // const [patientID, setPatientID] = useState('');
  // const [selectedCertificate, setSelectedCertificate] = useState(null);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setBirthCertificate(file);
  // };

  // const handlePatientIDChange = (event) => {
  //   const value = event.target.value;
  //   setPatientID(value);
  // };

  // const handleFormSubmit = async(event) => {
  //   event.preventDefault();

  //   console.log(birthCertificate, patientID);

  //   // await fetch("http://localhost:5000/patients")

  //   setBirthCertificate(null);
  //   setPatientID(0);

    // if (birthCertificate && patientID) {
    //   // Upload birth certificate
    //   const birthCertificateRef = firebase.storage().ref().child('birthCertificates/' + birthCertificate.name);
    //   birthCertificateRef.put(birthCertificate);

    //   // Upload patient ID (as a text file)
    //   const patientIDRef = firebase.storage().ref().child('patientIDs/patientID.txt');
    //   patientIDRef.putString(patientID);

    //   // Reset form
    //   setBirthCertificate(null);
    //   setPatientID('');
    // }
  // };

  // const handleDownload = (event) => {
  //   event.preventDefault();

  //   if (selectedCertificate) {
  //     // Download the selected certificate
  //     const certificateRef = firebase.storage().ref().child(`birthCertificates/${selectedCertificate}`);
  //     certificateRef.getDownloadURL().then((url) => {
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.setAttribute('download', selectedCertificate);
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     });
  //   }
  // };
  const [patientId, setPatientId] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('patientId', patientId);
    formData.append('file', file);
    console.log(patientId);
    console.log(file)
    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully!');
        window.alert('File uploaded successfully!');
      } else {
        console.error('File upload failed!');
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleUploaddeath = async () => {
    const formData = new FormData();
    formData.append('patientId', patientId);
    formData.append('file', file);
    console.log(patientId);
    console.log(file)
    try {
      const response = await fetch('http://localhost:3001/uploaddeath', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        window.alert('File uploaded successfully!');
        console.log('File uploaded successfully!');
        
      } else {
        console.error('File upload failed!');
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleDownload = async () => {
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
        link.download = `BirthCertificate_${patientId}.png`;
        link.click();
      } else {
        console.error('Failed to download birth certificate!');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="container">

   <NavBar/>
   <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Add Record</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Upload Birth Certificate</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Upload Death Certificate</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
                     <Tab.Pane eventKey="first" >
                     <div class="w-50">
                    <Form   onSubmit= {registerrecord}>
          <Form.Group className="mb-6" controlId="doctorid">
            <Form.Label>Enter Doctor Id</Form.Label>
            <Form.Control  name="doctorid" size="sm"  type="number" placeholder="Enter id" />
          </Form.Group>
          
      
          <Form.Group className="mb-6" controlId="Patientid">
            <Form.Label>Enter Patient Id</Form.Label>
            <Form.Control  name="patientid" size="sm"  type="number" placeholder="Enter id" />
          </Form.Group>
          <Form.Group className="mb-6" controlId="recordid">
            <Form.Label>Enter record Id</Form.Label>
            <Form.Control  name="recordid" size="sm"  type="number" placeholder="Enter id" />
          </Form.Group>
          <Form.Group className="mb-6" controlId="Diagnosis">
            <Form.Label>Diagnosis</Form.Label>
            <Form.Control name="diagnosis" size="sm" type="text" placeholder="Enter Diagnosis" />
          </Form.Group>
          <Form.Group className="mb-6" controlId="treatment">
            <Form.Label>treatment</Form.Label>
            <Form.Control name="treatment" size="sm"  type="text" placeholder="treatment" />
          </Form.Group>
          <Form.Group className="mb-6" controlId="prescription">
            <Form.Label>prescription</Form.Label>
            <Form.Control   name="prescription"size="sm" type="text" placeholder="prescription" />
          </Form.Group>
          <Form.Group className="mb-6" controlId="tests">
            <Form.Label>tests</Form.Label>
            <Form.Control   name="tests" size="sm" type="text" placeholder="tests" />
          </Form.Group>    <Form.Group className="mb-6" controlId="date">
            <Form.Label>date</Form.Label>
            <Form.Control   name="date"size="sm"  type="text" placeholder="date" />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Submit
          </Button>
                      </Form> 
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                       <div class="w-50">
                          <h1>Birth Certificate</h1>
                          <div class="form-group">
                            <label htmlFor="patientId">Patient ID:</label>
                            <input class="form-control form-control-sm mb-3"
                              type="number"
                              id="patientId"
                              value={patientId}
                              onChange={(e) => setPatientId(e.target.value)}
                            />
                          </div>
                          <div class="form-group mb-3">
                            <label htmlFor="file">Upload Birth Certificate:</label>
                            <br></br>
                            <input class="form-control-file " type="file" id="file" onChange={handleFileChange} />
                          </div>
                          <div>
                            <button class=" btn btn-primary"onClick={handleUpload}>Upload</button>
                           
                          </div>
                        </div>
                    {/* <form onSubmit={handleFormSubmit}>
                      <div>
                        <label>Patient ID:</label>
                        <input
                          type="text"
                          value={patientID}
                          onChange={(e) => setPatientID(e.target.value)}
                        />
                      </div>
                      <div>
                        <label>Birth Certificate:</label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          file={birthCertificate}
                          onChange={handleFileChange}
                        />
                      </div>
                      <button type="submit">Add Patient</button>
                    </form>
                     */}
                     </Tab.Pane>
                    <Tab.Pane eventKey="third">
                    <div class="w-50">
                          <h1>DEATH Certificate</h1>
                          <div class="form-group">
                            <label htmlFor="patientId">Patient ID:</label>
                            <input class="form-control form-control-sm mb-3"
                              type="number"
                              id="patientId"
                              value={patientId}
                              onChange={(e) => setPatientId(e.target.value)}
                            />
                          </div>
                          <div class="form-group">
                            <label htmlFor="file">upload Death Certificate:</label>
                            <br></br>
                            <input class="form-control-file mb-3" type="file" id="file" onChange={handleFileChange} />
                          </div>
                          <div>
                            <button  class=" btn btn-primary" onClick={handleUploaddeath}>Upload</button>
                            
                          </div>
                        </div>
                    {/* <form onSubmit={handleDeathSubmit}>
                      <div>
                        <label>Patient ID:</label>
                        <input
                          type="text"
                          value={patientID}
                          onChange={(e) => setPatientID(e.target.value)}
                        />
                      </div>
                      <div>
                        <label>Death Certificate:</label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleDeathFileChange}
                        />
                      </div>
                      <button type="submit">Add Patient</button>
                    </form> */}
                    </Tab.Pane>
                    
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
   
  </div>
  );
}

export default AddRecord;