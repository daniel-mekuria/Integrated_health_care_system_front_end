import React from 'react'
import PersonCard from '../components/PersonalCard'
import MedicationTable from '../components/MedicationTable';
import fakeData from '../components/fakeData';
import PersonalInfo from '../components/PersonalInfo';

const personData = {
    name: 'Peter Viscaal',
    isActive: true,
    gender: 'Male',
    age: 20,
    language: 'English',
    height: '5" 20',
    tags: ['young', 'blackhair', 'male', 'allergies +12'],
  };
  const sampleData = {
    fullName: "John Doe",
    sex: "Male",
    dateEligible: "2024-04-28",
    dateOfBirth: "1990-05-15",
    patientAddress: "123 Main St",
    kebele: "Kebele 12",
    subCityWoreda: "Sub City A",
    houseNo: "A1",
    telephoneNo: "123-456-7890",
    weightOnStart: "70 kg"
  };
  

const PatinetProfile = () => {
  return (
    <div className='flex flex-col '>
        <div className="card">
            <PersonalInfo  {...sampleData}/>
        </div>
        <div className="table">
            
            <MedicationTable data = {fakeData}/>
        </div>
        

    </div>
  )
}

export default PatinetProfile




