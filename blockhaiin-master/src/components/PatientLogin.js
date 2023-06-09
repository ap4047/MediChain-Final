import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Home from './Home';
import {abi,contractAddress} from './constants';
import { ethers } from "ethers";
import { useHistory } from 'react-router-dom';
import NavBar from './NavBar';
function PatientLogin() {
  async function getcontract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    return contract;
  }
  const history=useHistory();
  const Login = async(event)=>{
    event.preventDefault();
    
    const userid=event.target.userid.value;
    const password=event.target.password.value;
    console.log(userid,password);
    const contract = await getcontract();
    const result = contract.getPatient(userid);
    if(result)
    {
      const resultPromise = Promise.resolve(result);
      resultPromise.then(result => {
        // console.log(result[0],result[1],result[2],result[3],result[4],result[5],result[6]);
        // console.log(result.contact._hex);
        // console.log(parseInt(result.contact._hex,16));
        // console.log(result.password);
        // console.log(parseInt(result.id._hex,16));
        if((result.password===password) && (parseInt(result.id._hex,16).toString()===userid))
        {
          window.alert("patient login successfull");
          history.push({pathname:"/patient",state:{userid:userid}});
        }else{
          window.alert("patient login unsuccessfull");
        }
      });
    }
   
    
    console.log(result);


    

    
  }
  

  
  return (
    <div >

   <NavBar/>
   <div class="container w-25">
   <Form   onSubmit={Login}>
   

   <Form.Group className="mb-6" controlId="doctorid">
     <Form.Label>Enter UserId</Form.Label>
     <Form.Control  name="userid" size="sm"  type="number" placeholder="Enter userid" autoComplete="off" />
   </Form.Group>
  
   <Form.Group className="mb-6" controlId="tests">
     <Form.Label>password</Form.Label>
     <Form.Control   name="password" size="sm" type="password" placeholder="password" autoComplete="off" />
   </Form.Group>    
   
   <Button variant="primary" type="submit">
     Submit
   </Button>
 </Form>
   </div>
    
  </div>
  );
}

export default PatientLogin;