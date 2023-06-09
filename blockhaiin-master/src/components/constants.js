export const abi =  [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_specification",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_contact",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_location",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_password",
          "type": "string"
        }
      ],
      "name": "addDoctor",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "_age",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "_gender",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_height",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_weight",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_location",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_contact",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_password",
          "type": "string"
        }
      ],
      "name": "addPatinet",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_recordId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_patientId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_doctorsId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_dignosis",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_treatment",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_prescreption",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_tests",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_date",
          "type": "string"
        }
      ],
      "name": "addRecord",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "docotorOfId",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "add",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "specification",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "contact",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "location",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "password",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getPatient",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint8",
              "name": "age",
              "type": "uint8"
            },
            {
              "internalType": "string",
              "name": "gender",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "height",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "weight",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "location",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "contact",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "email",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "password",
              "type": "string"
            }
          ],
          "internalType": "struct Medichain.patient",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getPatientRecords",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "recordId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "patientId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "docotorsId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "digonsis",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "treatment",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "prescreption",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "tests",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "date",
              "type": "string"
            }
          ],
          "internalType": "struct Medichain.record[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isAccessOf",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "patientOfId",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "age",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "gender",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "height",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "weight",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "location",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "contact",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "password",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "recordsOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "recordId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "patientId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "docotorsId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "digonsis",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "treatment",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "prescreption",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "tests",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "date",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  export const contractAddress = "0x73dd5f44CF24F2AA197cB74a2e59CC7908bb3A53";