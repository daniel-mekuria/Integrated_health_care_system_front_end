import React from 'react';

function MedicationTable({ data }) {
  return (
    <div className="pl-5">

   
    <table className="min-w-full shadow-md w-auto divide-y divide-gray-200">
      <caption className="text-xl font-bold text-center mb-4">Used Drugs History</caption>
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-5 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand Name</th>
          <th scope="col" className="px-5 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generic Name</th>
          <th scope="col" className="px-5 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">On Time</th>
          <th scope="col" className="px-5 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TB Preventive Therapy</th>
          <th scope="col" className="px-5 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cotrimoxazole Prophylaxis</th>
          <th scope="col" className="px-5 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month of Supply</th>
          <th scope="col" className="px-5 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th scope="col" className="px-5 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((medication) => (
          <tr key={medication.id}>
            <td className="px-5 py-2 whitespace-nowrap">{medication.brandName}</td>
            <td className="px-5 py-2 whitespace-nowrap">{medication.genericName}</td>
            <td className="px-5 py-2 whitespace-nowrap">{medication.onTime}</td>
            <td className="px-5 py-2 whitespace-nowrap">{medication.tbPreventiveTherapy}</td>
            <td className="px-5 py-2 whitespace-nowrap">{medication.cotrimoxazoleProphylaxis}</td>
            <td className="px-5 py-2 whitespace-nowrap">{medication.monthOfSupply}</td>
            <td className="px-5 py-2 whitespace-nowrap">{medication.date}</td>
            <td className="px-5 py-2 whitespace-nowrap">{medication.weight}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default MedicationTable;
