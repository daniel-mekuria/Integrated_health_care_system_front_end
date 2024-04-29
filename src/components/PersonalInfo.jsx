import React from 'react';

function PersonalDetails({ fullName, sex, dateEligible, dateOfBirth, patientAddress, kebele, subCityWoreda, houseNo, telephoneNo, weightOnStart }) {
  return (
    <div className="bg-white rounded-lg  overflow-hidden">
      <div className="px-6 ">
        <h3 className="text-2xl font-medium text-gray-800 text-center">Personal Details</h3>
      </div>
      <div className="flex flex-wrap px-6 pt-4">
        <div className="w-full md:w-1/4">
          <div className="mb-4">
            <dt className="text-sm font-medium text-gray-500">Full Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{fullName}</dd>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <div className="mb-4">
            <dt className="text-sm font-medium text-gray-500">Sex</dt>
            <dd className="mt-1 text-sm text-gray-900">{sex}</dd>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <div className="mb-4">
            <dt className="text-sm font-medium text-gray-500">Date Eligible</dt>
            <dd className="mt-1 text-sm text-gray-900">{dateEligible}</dd>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <div className="mb-4">
            <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
            <dd className="mt-1 text-sm text-gray-900">{dateOfBirth}</dd>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <div className="mb-4">
            <dt className="text-sm font-medium text-gray-500">Patient Address</dt>
            <dd className="mt-1 text-sm text-gray-900">{patientAddress}</dd>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <div className="mb-4">
            <dt className="text-sm font-medium text-gray-500">Kebele</dt>
            <dd className="mt-1 text-sm text-gray-900">{kebele}</dd>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <div className="mb-4">
            <dt className="text-sm font-medium text-gray-500">Sub City/Woreda</dt>
            <dd className="mt-1 text-sm text-gray-900">{subCityWoreda}</dd>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <div className="mb-4">
            <dt className="text-sm font-medium text-gray-500">House No.</dt>
            <dd className="mt-1 text-sm text-gray-900">{houseNo}</dd>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <div className="mb-4">
            <dt className="text-sm font-medium text-gray-500">Telephone No.</dt>
            <dd className="mt-1 text-sm text-gray-900">{telephoneNo}</dd>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <div className="mb-4">
            <dt className="text-sm font-medium text-gray-500">Weight on Start</dt>
            <dd className="mt-1 text-sm text-gray-900">{weightOnStart}</dd>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetails;
