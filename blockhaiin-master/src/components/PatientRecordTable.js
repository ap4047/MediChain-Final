import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import Table from 'react-bootstrap/Table';


function PatientRecordTable(props) {
  return (
    <Table responsive striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Record Id</th>
          <th>Patient Id</th>
          <th>Doctor Id</th>
          <th>Diagnosis</th>
          <th>Prescription</th>
          <th>Tests</th>
          <th>treatment</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {props.record.map((item, index) => (
          <tr key={index}>
          <td>{item.recordId ? parseInt(item.recordId._hex, 16) : '-'}</td>
          <td>{item.patientId ? parseInt(item.patientId._hex,16) : '-'}</td>
          <td>{item.docotorsId? parseInt(item.docotorsId._hex,16) : '-'}</td>
           
          
            <td>{item.digonsis}</td>
            <td>{item.prescreption}</td>
            <td>{item.tests}</td>
            <td>{item.treatment}</td>
            <td>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
export default PatientRecordTable;