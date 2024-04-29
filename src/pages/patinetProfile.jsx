import React from 'react'
import PersonCard from '../components/PersonalCard'
import MedicationTable from '../components/MedicationTable';
import fakeData from '../components/fakeData';
import PersonalInfo from '../components/PersonalInfo';
import Tabs from '../components/Tabs';
import Tab from '../components/Tab';

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
    <div className="container mx-auto">
    <h1 className="text-2xl font-bold mb-4">Patient Profile</h1>
    <Tabs>
      <Tab title="Personal Info">
        <PersonalInfo {...sampleData}/>
      </Tab>
      <Tab title="Medication Table">
        <MedicationTable data={fakeData} />
      </Tab>
      {/* <Tab title="Third Tab">
        <p>This is the content of the third tab.</p>
      </Tab> */}
    </Tabs>
  </div>

  )
}

export default PatinetProfile




