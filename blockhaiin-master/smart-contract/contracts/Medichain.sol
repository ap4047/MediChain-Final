//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Medichain{

    address private owner;

    constructor(){
        owner = msg.sender;
    }


   struct doctor{
        string name;
        address add;
        uint256 id;
        string specification;
        uint256 contact;
        string location;
        string password;
    }

    struct patient{
        string name;
        uint256 id;
        uint8 age;
        string gender;
        uint256 height;
        uint256 weight;
        string location;
        uint256 contact;
        string email;
        string password;
    }

    struct record{
        uint256 recordId;
        uint256 patientId;
        uint256 docotorsId;
        string digonsis;
        string treatment;
        string prescreption;
        string tests;
        string date;
    }

    mapping(uint256 => record[]) public recordsOf;
    mapping(uint256 => patient) public patientOfId;
    mapping(uint256 => doctor) public docotorOfId;
    mapping(address => bool) public isAccessOf;

    modifier onlyDoctor{
        require(isAccessOf[msg.sender]);
        _;
    }

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

    function addDoctor(string memory _name, address _address,uint256 _id, string memory _specification,uint256 _contact,string memory _location,string memory _password) public onlyOwner{
        docotorOfId[_id] = doctor(_name,_address,_id,_specification,_contact,_location,_password);
        isAccessOf[_address] = true;
    }

    function addPatinet(string memory _name,uint256 _id, uint8 _age,string memory _gender,uint256 _height, uint256 _weight, string memory _location,uint256 _contact,string memory _email, string memory _password
    ) public onlyDoctor{
        patientOfId[_id] = patient(_name,_id,_age,_gender,_height,_weight,_location,_contact,_email,_password);
    }

    function addRecord(uint256 _recordId,uint256 _patientId, uint256 _doctorsId,  string memory _dignosis, string memory _treatment, string memory _prescreption, string memory _tests, string memory _date) public onlyDoctor{
        recordsOf[_patientId].push(record(_recordId,_patientId,_doctorsId,_dignosis,_treatment,_prescreption,_tests,_date));
    }

    function getPatient(uint256 _id) public view onlyDoctor returns (patient memory){
        return patientOfId[_id];
    }

    function getPatientRecords(uint256 _id) public view onlyDoctor returns (record[] memory){
        return recordsOf[_id];
    }
}