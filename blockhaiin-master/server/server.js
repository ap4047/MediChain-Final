// app.js
const express = require('express');
const fileUpload = require('express-fileupload');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(cors());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'patilashish2205',
  database: 'medicyl',
});

// API endpoint to handle file upload
app.post('/upload', (req, res) => {
  const { patientId } = req.body;
  const file = req.files.file;
  console.log("inside upload for birth")
  const filePath = `D:/Projects/blockhaiin-master/uploads/${file.name}`;
  console.log(filePath);
  console.log(patientId);
  file.mv(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    const query = 'INSERT INTO birth_certificates (patient_id, file_path) VALUES (?, ?)';
    db.query(query, [patientId, filePath], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.send('File uploaded successfully!');
    });
  });
});
// API endpoint to handle file upload
app.post('/uploaddeath', (req, res) => {
  const { patientId } = req.body;
  const file = req.files.file;
  console.log("inside upload for death")
  const filePath = `D:/Projects/blockhaiin-master/uploads/${file.name}`;
  console.log(filePath);
  console.log(patientId);
  file.mv(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    const query = 'INSERT INTO death_certificates (patient_id, file_path) VALUES (?, ?)';
    db.query(query, [patientId, filePath], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.send('File uploaded successfully!');
    });
  });
});

// API endpoint to retrieve file path by patient ID
app.get('/download/:patientId', (req, res) => {
  const patientId = req.params.patientId;
  console.log(patientId)
  const query = 'SELECT file_path FROM birth_certificates WHERE patient_id = ?';
  db.query(query, patientId, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    if (result.length === 0) {
      return res.status(404).send('Birth certificate not found!');
    }

   
    const filePath = result[0].file_path;
    console.log(filePath)
    res.download(filePath);
  });
});
app.get('/downloaddeath/:patientId', (req, res) => {
  const patientId = req.params.patientId;
  console.log(patientId)
  const query = 'SELECT file_path FROM death_certificates WHERE patient_id = ?';
  db.query(query, patientId, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    if (result.length === 0) {
      return res.status(404).send('Death certificate not found!');
    }

    const filePath = result[0].file_path;
    console.log(filePath)
    res.download(filePath);
  });
});
function checkbirth(patientId)
{
  const query1='SELECT patient_id FROM birth_certificates WHERE patient_id = ?';
  db.query(query1,patientId,(err,result)=>{
    if(err)
    {
      console.log(err);
      return false;
    }
    if(result.length==0)
    {
      console.log("birth data not found");
      return false;
    }
    console.log("birth data found");
    
  });
  return true;
}
app.get('/checkdeadoralive/:patientid', (req, res) => {
  console.log("inside check deadoralive");
  const patientId = req.params.patientid;
  console.log(patientId);
 x=checkbirth(patientId);
  const query = 'SELECT patient_id FROM death_certificates WHERE patient_id = ?';
  if(x)
  {
  db.query(query, patientId, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    if (result.length === 0) {
      console.log("response is ok");
      return res.send("you can add record");
    }
    console.log("response is dead");
    return res.status(404).send('person is dead');
   
  });
}
});
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

// // mongodb+srv://patilashish2205:patilashish2205@cluster0.nxbpcfo.mongodb.net/records?retryWrites=true&w=majority

// // Connect to MongoDB
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const multer = require('multer');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))


// // Connect to MongoDB
// mongoose.connect('mongodb+srv://patilashish2205:patilashish2205@cluster0.nxbpcfo.mongodb.net/records?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(error => console.error('Error connecting to MongoDB:', error));

// // Define a patient schema
// const patientSchema = new mongoose.Schema({
//   patientID: { type: String, required: true },
//   birthCertificate: { type: Buffer, required: true },
//   birthCertificateMimeType: { type: String, required: true }
// });
// const deadpatientSchema = new mongoose.Schema({
//     patientID: { type: String, required: true },
//     deathCertificate: { type: Buffer, required: true },
//     deathCertificateMimeType: { type: String, required: true }
//   });
//   const DeadPatient = mongoose.model('DeadPatient', deadpatientSchema);
// // Create a patient model
// const Patient = mongoose.model('Patient', patientSchema);

// // Configure multer for file upload
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });


// // Create a new patient
// app.post('/patients', (req, res) => {
//   const data = req.body;
//   res.send(JSON.stringify(data))
// // app.post('/patients', upload.single('birthCertificate'), (req, res) => {
//   // const { patientID } = req.body;
//   // const birthCertificate = req.file.buffer;
//   // const birthCertificateMimeType = req.file.mimetype;

//   // const patient = new Patient({ patientID, birthCertificate, birthCertificateMimeType });
//   // Patient.findOne({ patientID })
//   //     .then(record => {
//   //       if (!record) {
//   //           console.log("record  not found");
//   //           patient.save()
//   //           .then(() => res.status(201).json('Patient added'))
//   //           .catch(error => res.status(400).json('Error: ' + error));
          
//   //       }
//   //       else
//   //       {
//   //           // Return the record data
//   //           console.log("record is already present");
//   //           console.log(record)
//   //           res.json(record);
//   //       }
  
       
//   //     })
//   //     .catch(error => res.status(400).json('Error: ' + error));
  
// });
// app.post('/deadpatients', upload.single('deathCertificate'), (req, res) => {
//     const { patientID } = req.body;
//     const deathCertificate = req.file.buffer;
//     const deathCertificateMimeType = req.file.mimetype;
  
//     const deadpatient = new DeadPatient({ patientID, deathCertificate, deathCertificateMimeType });
//     Patient.findOne({ patientID })
//     .then(record => {
//       if (!record) {
//           console.log("death record  not found");
//           deadpatient.save()
//           .then(() => res.status(201).json('death record  added'))
//           .catch(error => res.status(400).json('Error: ' + error));
        
//       }
//       else
//       {
//           // Return the record data
//           console.log("record is already present");
//           console.log(record)
//           res.json(record);
//       }
//     })
//     .catch(error => res.status(400).json('Error: ' + error));
    
//   });
//   app.get('/patients/:patientID', (req, res) => {
//     const { patientID } = req.params;
  
//     Patient.findOne({ patientID })
//       .then(record => {
//         if (!record) {
//             console.log("record  not found");
//           return res.status(404).json('Record not found');
          
//         }
  
//         // Return the record data
//         console.log("record  found");
//         console.log(record)
//         res.json(record);
//       })
//       .catch(error => res.status(400).json('Error: ' + error));
//   });
//   app.get('/deadpatients/:patientID', (req, res) => {
//     const { patientID } = req.params;
  
//     DeadPatient.findOne({ patientID })
//       .then(record => {
//         if (!record) {
//             console.log(" dead record  not found");
//           return res.status(404).json('dead Record not found');
          
//         }
  
//         // Return the record data
//         console.log("dead record  found");
//         console.log(record)
//         res.json(record);
//       })
//       .catch(error => res.status(400).json('Error: ' + error));
//   });

  
// // Start the server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });