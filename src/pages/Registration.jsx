import React, { useState } from 'react';
import './registration.css'

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    cardNumber: '',
    weightOnStart: '',
    sex: '',
    patientAddress: '',
    subCityWoreda: '',
    telephoneNo: '',
    kebele: '',
    houseNo: '',
    dateEligible: '',
    dateOfBirth: '',
    supportPersonFullName: '',
    supportPersonSubCityWoreda: '',
    supportPersonKebele: '',
    supportPersonHouseNo: '',
    supportPersonTelephoneNo: '',
    previousExposure: '',
    previousRegiment: '',
    currentStatus: '',
    historyADR: '',
    concomitantDiseases: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <div className="container mx-auto m-20">
      <h1 className="text-2xl font-bold mb-4">Register Patient</h1>
      <form onSubmit={handleSubmit} className="space-y-4 ">
{/* Personal Information Section */}
        <div className="form-section flex flex-col">
            <h2 className="text-medium text-gray-500 font-bold">Personal Information</h2>
            <div className="flex mt-1.5 space-x-6">
                <div className="mt-4">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="mt-4">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card/ART/Number</label>
                    <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="mt-4 ">
                    <label htmlFor="weightOnStart" className="block text-sm font-medium text-gray-700">Weight on Start</label>
                    <input type="text" id="weightOnStart" name="weightOnStart" value={formData.weightOnStart} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="mt-4">
                    <label htmlFor="sex" className="block text-sm font-medium mb-2 text-gray-700">Sex</label>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="male" name="sex" value="male" onChange={handleChange} className="radio" />
                        <label htmlFor="male" className="radio-label">Male</label>
                        <input type="radio" id="female" name="sex" value="female" onChange={handleChange} className="radio" />
                        <label htmlFor="female" className="radio-label">Female</label>
                    </div>
                </div>
            </div>
            <div className="flex mt-1.5 space-x-6">
                <div>
                    <label htmlFor="patientAddress" className="block text-sm font-medium text-gray-700">Patient Address</label>
                    <input type="text" id="patientAddress" name="patientAddress" value={formData.patientAddress} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="subCityWoreda" className="block text-sm font-medium text-gray-700">Sub City/Woreda</label>
                    <input type="text" id="subCityWoreda" name="subCityWoreda" value={formData.subCityWoreda} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="telephoneNo" className="block text-sm font-medium text-gray-700">Telephone No.</label>
                    <input type="text" id="telephoneNo" name="telephoneNo" value={formData.telephoneNo} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="kebele" className="block text-sm font-medium text-gray-700">Kebele</label>
                    <input type="text" id="kebele" name="kebele" value={formData.kebele} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>   
            </div>
            <div className="mt-1.5 flex space-x-6">
                <div>
                    <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700">House No.</label>
                    <input type="text" id="houseNo" name="houseNo" value={formData.houseNo} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="dateEligible" className="block text-sm font-medium text-gray-700">Date Eligible</label>
                    <input type="date" id="dateEligible" name="dateEligible" value={formData.dateEligible} onChange={handleChange} className="mt-1 mr-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="mt-1  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

            </div>
            
            
        

{/* Support Person Information */}
        <div>
            <h2 className="text-sm text-gray-500 my-4 font-bold">Support Person Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex space-x-6 mt-1.5">
                    <div>
                        <label htmlFor="supportPersonFullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" name="supportPersonFullName" id="supportPersonFullName" value={formData.supportPersonFullName} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="supportPersonSubCityWoreda" className="block text-sm font-medium text-gray-700">Sub city/Woreda</label>
                        <input type="text" name="supportPersonSubCityWoreda" id="supportPersonSubCityWoreda" value={formData.supportPersonSubCityWoreda} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="supportPersonKebele" className="block text-sm font-medium text-gray-700">Kebele</label>
                        <input type="text" name="supportPersonKebele" id="supportPersonKebele" value={formData.supportPersonKebele} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                </div>
                <div className="flex space-x-6 mt-1.5">
                    <div>
                        <label htmlFor="supportPersonHouseNo" className="block text-sm font-medium text-gray-700">House No.</label>
                        <input type="text" name="supportPersonHouseNo" id="supportPersonHouseNo" value={formData.supportPersonHouseNo} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="supportPersonTelephoneNo" className="block text-sm font-medium text-gray-700">Telephone No.</label>
                        <input type="text" name="supportPersonTelephoneNo" id="supportPersonTelephoneNo" value={formData.supportPersonTelephoneNo} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>


                </div>

            <div>
                
              {/* Add other support person information fields */}
            </div>
          </div>
        </div>
        <div className="flex space-x-6 mt-1.5">
    {/* Previous Exposure to ARVs */}
            <div className="form-section">
            <h2 className="text-sm text-gray-500 mr-6 my-4 font-bold">Previous Exposure to ARVs</h2>
            <div className="flex items-center space-x-4">
                <div>
                <input type="radio" id="naive" name="previousExposure" value="naive" onChange={handleChange} />
                <label htmlFor="naive" className="ml-2 text-sm font-medium text-gray-700">Naive</label>
                </div>
                <div>
                <input type="radio" id="nonNaive" name="previousExposure" value="nonNaive" onChange={handleChange} />
                <label htmlFor="nonNaive" className="ml-2 text-sm font-medium text-gray-700">Non Naive</label>
                </div>
            </div>
            {formData.previousExposure === 'nonNaive' && (
                <div>
                <label htmlFor="previousRegiment" className="block text-sm font-medium text-gray-700 mt-4">Previous Regiment</label>
                <input type="text" name="previousRegiment" id="previousRegiment" value={formData.previousRegiment} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
            )}
            </div>
    {/* Current Status */}
            <div className="form-section">
                <h2 className="text-sm text-gray-500 my-4 font-bold">Current Status</h2>
                <div className="flex items-center space-x-4">
                    <input type="radio" id="onActiveTreatment" name="currentStatus" value="onActiveTreatment" onChange={handleChange} />
                    <label htmlFor="onActiveTreatment" className="text-sm font-medium text-gray-700">On Active Treatment</label>
                </div>
                <div className="flex items-center space-x-4">
                    <input type="radio" id="stoppedTreatment" name="currentStatus" value="stoppedTreatment" onChange={handleChange} />
                    <label htmlFor="stoppedTreatment" className="text-sm font-medium text-gray-700">Stopped treatment by physician</label>
                </div>
                <div className="flex items-center space-x-4">
                    <input type="radio" id="lostForFollowUp" name="currentStatus" value="lostForFollowUp" onChange={handleChange} className="text-sm font-medium text-gray-700" />
                    <label htmlFor="lostForFollowUp" className="text-sm font-medium text-gray-700">Lost for follow up</label>
                </div>
                <div className="flex items-center space-x-4">
                    <input type="radio" id="deceased" name="currentStatus" value="deceased" onChange={handleChange} className="text-sm font-medium text-gray-700" />
                    <label htmlFor="deceased" className="text-sm font-medium text-gray-700">Deceased</label>
                </div>
            </div>

            {/* Additional Information */}
        <div>
            <h2 className="text-sm text-gray-500 my-4 font-bold">Additional Information</h2>
            <div className="flex space-x-6 mt-1.5">
                <div>
                    <label htmlFor="historyADR" className="block text-sm font-medium text-gray-700">History of ADR or Side Effects</label>
                    <textarea name="historyADR" id="historyADR" value={formData.historyADR} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="concomitantDiseases" className="block text-sm font-medium text-gray-700">Concomitant Diseases</label>
                    <textarea name="concomitantDiseases" id="concomitantDiseases" value={formData.concomitantDiseases} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
            </div>
            
        </div>


        </div>


        <button type="submit" className="bg-green text-white py-2 px-8 mt-8 self-center max-w-60  rounded hover:bg-blue-600">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
