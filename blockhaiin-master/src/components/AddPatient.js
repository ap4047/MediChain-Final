import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Home from './Home';
import {abi, contractAddress} from "./constants";
import { ethers } from "ethers";
import { useHistory } from 'react-router-dom';
import NavBar from './NavBar';
function AddPatient() {

  const history=useHistory();
  const Registerpatient=async(event)=>{
    event.preventDefault();
  
    // console.log(event.target.name);
    const name=event.target.name.value;
    const patientid=event.target.patientid.value;
    const age=event.target.age.value;
    const gender=event.target.gender.value;
    const height=event.target.height.value;
    const weight=event.target.weight.value;
    const location=event.target.location.value;
    const contact=event.target.contact.value;
    const email=event.target.email.value;
    const password=event.target.password.value;
    console.log(name,patientid,age,gender,height,weight,location,contact,email,password);
    console.log("getting contract for addpatient");
    const contract = await getcontract();
    const result = contract.getPatient(patientid);
    const resultPromise = Promise.resolve(result);
    resultPromise.then(result => {
     console.log(result[0],result[1],result[2],result[3],result[4],result[5],result[6]);
     
     } );
    console.log(result);
    if(patientid=== parseInt(result.id._hex,16).toString())
    {
      window.alert("patient is alredy registered");
      history.push("/addpatient");
    }
    else{
      console.log("adding patient");
      const  transaction = await contract.addPatinet(name,patientid,age,gender,height,weight,location,contact,email,password);
      console.log("added patient");
      console.log(transaction);
      window.alert("patient registration successfull");
      history.push("/patientlogin");
    }
   


  }
  async function getcontract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    return contract;
  }

  
  return (
    <div className='container w-50'>
    <NavBar/>
    <div className='Patient'>
    <Form onSubmit={Registerpatient}>
    <Form.Group className="mb-6" controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control name="name"  size="sm" type="text" placeholder="Enter Name" />
    </Form.Group>
    <Form.Group className="mb-6" controlId="patientid">
      <Form.Label>Enter Patient Id</Form.Label>
      <Form.Control name="patientid" size="sm" type="number" placeholder="Enter id" />
    </Form.Group>
    <Form.Group className="mb-6" controlId="age">
      <Form.Label>Enter Age</Form.Label>
      <Form.Control name="age" size="sm" type="number" placeholder="Enter age" />
    </Form.Group>
    <Form.Group className="mb-6" controlId="gender">
      <Form.Label>Enter gender</Form.Label>
      <Form.Control name="gender" size="sm" type="text" placeholder="Enter gender" />
    </Form.Group>
    <Form.Group className="mb-6" controlId="height">
      <Form.Label>"Enter height"</Form.Label>
      <Form.Control name="height" size="sm" type="number" placeholder="Enter height" />
    </Form.Group>
    <Form.Group className="mb-6" controlId="weight">
      <Form.Label>Enter weight</Form.Label>
      <Form.Control name="weight" size="sm" type="number" placeholder="Enter weight" />
    </Form.Group>
   
  
  
    <Form.Group className="mb-6" controlId="location">
      <Form.Label>Location</Form.Label>
      <Form.Control name="location" size="sm" type="text" placeholder="Enter location" />
    </Form.Group> 
    <Form.Group className="mb-6" controlId="contact">
      <Form.Label>contact</Form.Label>
      <Form.Control name="contact" size="sm" type="number" placeholder="Enter contact" />
    </Form.Group>
    <Form.Group className="mb-6" controlId="Email">
      <Form.Label>contact</Form.Label>
      <Form.Control name="email" size="sm" type="email" placeholder="Enter Email" />
    </Form.Group>
    <Form.Group className="mb-6" controlId="Password">
      <Form.Label>Password</Form.Label>
      <Form.Control name="password" size="sm" type="password" placeholder="Password" />
    </Form.Group>
   
    <Button  variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  </div>
  </div>
  );
}

export default AddPatient;