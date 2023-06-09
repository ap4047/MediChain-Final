
import './App.css';
import Home from './components/Home';
import {Switch} from "react-router-dom";
import {Route} from "react-router-dom";
import AddDoctor from './components/AddDoctor';
import AddPatient from './components/AddPatient';
import AddRecord from './components/AddRecord';
import DoctorLogin from './components/DoctorLogin';
import PatientLogin from './components/PatientLogin';
import Doctor from "./components/Doctor";
import Patient from "./components/Patient";
// import { Switch } from 'react-router-dom';
function App() {
  return (
    <>
      
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/adddoctor" component={AddDoctor}/>
        <Route exact path="/addpatient" component={AddPatient}/>
        <Route exact path="/addrecord" component={AddRecord}/>
        <Route exact path="/doctorlogin" component={DoctorLogin}/>
        <Route exact path="/patientlogin" component={PatientLogin}/>
        <Route exact path="/doctor" component={Doctor}/>
        <Route exact path="/patient" component={Patient}/>
        <Route exact path="/records" component={Patient}/>
        </Switch>
        
     
    </>
  );
}

export default App;
