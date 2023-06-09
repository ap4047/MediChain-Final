import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Home from './Home';
import {abi,contractAddress} from './constants';
import { ethers } from "ethers";
// import Doctor from "./Doctor";
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import NavBar from './NavBar';
function DoctorLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  async function getcontract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    return contract;
  }
  function handleLogin() {
    setIsLoggedIn(true);
  }
  const history=useHistory();
  const Login = async(event)=>{
    event.preventDefault();
  
    const userid=event.target.userid.value;
    const password=event.target.password.value;
    console.log(userid,password);
    console.log("getting contract in doctor login");
    const contract = await getcontract();
    console.log("got contract");
    const result = await contract.docotorOfId(userid);
    if(result)
    {
      console.log("doctor record fetched",result);
      console.log("password is=",typeof result.password,result.password)
      console.log(typeof password,password);
      console.log("user id  is=",typeof parseInt(result.id._hex,16),parseInt(result.id._hex,16))
      console.log(typeof userid,userid);
      const resultPromise = Promise.resolve(result);
      resultPromise.then(result => {
        console.log(result[0],result[1],result[2],result[3],result[4],result[5],result[6]);
        console.log(result.contact._hex);
        console.log(parseInt(result.contact._hex,16));
        console.log(result.password);
        console.log(parseInt(result.id._hex,16));
        if((result.password===password) && (parseInt(result.id._hex,16).toString()===userid))
        {
          window.alert("doctor login succefull")
          handleLogin();
          history.push({pathname:"/doctor",state:{userid:userid}});
        }
        else{
          window.alert("login unsuccessfull");
         
        }
      });
      

    }
   

    
  }
  

  
  return (
    <div >

   <NavBar />
   <div className="container w-25">
    <Form  class="w-25" onSubmit={Login}>
   

    <Form.Group className="mb-6" controlId="doctorid">
      <Form.Label>Enter UserId</Form.Label>
      <Form.Control  name="userid" size="sm"  type="number" placeholder="Enter userid" autoComplete="off" />
    </Form.Group>
   
    <Form.Group className="mb-6" controlId="tests">
      <Form.Label>password</Form.Label>
      <Form.Control   name="password" size="sm" type="password" placeholder="password" autoComplete="off"  />
    </Form.Group>    
    
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  </div>
  </div>
  );
}

export default DoctorLogin;