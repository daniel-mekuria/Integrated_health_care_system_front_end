import React from 'react';

const DrugDispensalForm = () => {
  return (
    
    <div className="container mt-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <form>
            <div className="mb-4">
              <label htmlFor="date" className="block mb-1">Date:</label>
              <input type="date" id="date" className="form-input min-w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="Enter date" />
            </div>
            <div className="mb-4">
              <label htmlFor="fullName" className="block mb-1">Full Name:</label>
              <input type="text" id="fullName" className="form-input w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="Enter full name" />
            </div>
            <div className="mb-4">
              <label htmlFor="drugName" className="block mb-1">Drug Name:</label>
              <input type="text" id="drugName" className="form-input w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="Enter drug name" />
            </div>
            
          </form>
        </div>
        <div>
          <div className="mb-4">
            <label htmlFor="address" className="block mb-1">Address Health Facilities:</label>
            <input type="text" id="address" className="form-input w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="Enter address" />
          </div>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block mb-1">Card Number:</label>
            <input type="text" id="cardNumber" className="form-input w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="Enter card number" />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-1">Quantity:</label>
            <input type="number" id="quantity" className="form-input w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="Enter quantity" />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button className="bg-green-500 text-white px-8 py-2 rounded-lg">Done</button>
      </div>
    </div>
  );
};

export default DrugDispensalForm;
