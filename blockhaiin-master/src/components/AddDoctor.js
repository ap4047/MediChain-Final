import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Home from './Home';
// import Doctor from "./Doctor";
import {abi, contractAddress} from "./constants";
import { ethers } from "ethers";
import { useHistory } from 'react-router-dom';
import NavBar from './NavBar';

function AddDoctor() {
  const history=useHistory();
  const Registerdoctor= async (event) =>{
    event.preventDefault();
  
    const name=event.target.name.value;
    const address=event.target.address.value;
    const doctorid=event.target.doctorid.value;
    const specification=event.target.specification.value;
    const contact=event.target.contact.value;
    const location=event.target.location.value; 
    const password=event.target.password.value;
    console.log("getting contract");
    const contract = await getcontract();
    console.log("adding doctor");
     const result =  contract.docotorOfId(doctorid);
    //  const resultPromise = Promise.resolve(result);
    //  resultPromise.then(result => {
    //   console.log(result[0],result[1],result[2],result[3],result[4],result[5],result[6]);
    //   console.log(result.contact._hex);
    //   console.log(parseInt(result.contact,16));
    //   } );
    
    // if(doctorid===parseInt(result.id._hex,16).toString())
    // {
    //   console.log("add doctor try to reguster")
    //     window.alert("doctor is already registered")
    //     history.push("/adddoctor");
    // }

    const  transaction = await contract.addDoctor(name,address,doctorid,specification,contact,location,password);
    console.log("added doctor");
    console.log(transaction);
    window.alert("registration  successfull");
    history.push("/doctorlogin");
    

  }

  async function getcontract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    return contract;
  }


  

  
  return (
    <div className='container'>
      <NavBar/>
   
    <div className='container w-50'>
    <Form onSubmit={Registerdoctor} >
    <Form.Group className="mb-6" controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control name="name"  size="sm"  type="text" placeholder="Enter Name" />
    </Form.Group>
    <Form.Group className="mb-6" controlId="Address">
      <Form.Label>account address </Form.Label>
      <Form.Control name="address" size="sm" type="text" placeholder="Enter account address" />
    </Form.Group>
    <Form.Group className="mb-6" controlId="doctorid">
      <Form.Label>Enter Doctor Id</Form.Label>
      <Form.Control name="doctorid" size="sm" type="number" placeholder="Enter id" />
    </Form.Group>
    <Form.Group className="mb-6" controlId="specification">
      <Form.Label>specification</Form.Label>
      <Form.Control name="specification" size="sm" type="text" placeholder="specification" />
    </Form.Group>
    <Form.Group className="mb-6" controlId="contact">
      <Form.Label>contact</Form.Label>
      <Form.Control name="contact" size="sm" type="number" placeholder="Enter contact" />
    </Form.Group>
    <Form.Group className="mb-6" controlId="location">
      <Form.Label>Location</Form.Label>
      <Form.Control name="location" size="sm" type="text" placeholder="Enter location" />
    </Form.Group>
    <Form.Group className="mb-6" controlId="BasicPassword">
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

export default AddDoctor;