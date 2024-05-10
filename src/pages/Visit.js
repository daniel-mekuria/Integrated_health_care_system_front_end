import React, { useState } from "react";
import axios from "axios";

const Visit = () => {
  const [formData, setFormData] = useState({
    atrNumber: "",
    patientName: "",
    drug: [],
    otherDrug: "",
    pillNumber: 0,
    visitDate: "",
    onTime: false,
    nextAppointmentDate: "",
  });

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      if (checked) {
        return { ...prevData, drug: [...prevData.drug, value] };
      } else {
        return {
          ...prevData,
          drug: prevData.drug.filter((drug) => drug !== value),
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://integrated-healthcare-system.onrender.com/v1/visit/createVisitHistory", formData);
      console.log(response.data.message); // Handle success message
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h1 className="flex justify-center text-lg font-semibold mb-4">
        Create Visit History
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row gap-80">
          <div className="mb-4">
            <label
              htmlFor="atrNumber"
              className="block text-lg font-medium text-gray-700"
            >
              ATR Number
            </label>
            <input
              type="text"
              id="atrNumber"
              name="atrNumber"
              value={formData.atrNumber}
              onChange={handleChange}
              className="border rounded p-2 w-96 outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="patientName"
              className="block text-lg font-medium text-gray-700"
            >
              User Id
            </label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="border rounded p-2 w-96 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-row gap-16">
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Drug
            </label>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="drug"
                  value="TDF/3TC/DTG"
                  onChange={handleCheckboxChange}
                  className="form-checkbox text-blue-500 h-4 w-4"
                />
                <span className="ml-2 text-lg">TDF/3TC/DTG</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="checkbox"
                  name="drug"
                  value="TDF/3TC/DTG 600"
                  onChange={handleCheckboxChange}
                  className="form-checkbox text-blue-500 h-4 w-4"
                />
                <span className="ml-2 text-lg">TDF/3TC/DTG 600</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="checkbox"
                  name="drug"
                  value="TDF/3TC/DTG 400"
                  onChange={handleCheckboxChange}
                  className="form-checkbox text-blue-500 h-4 w-4"
                />
                <span className="ml-2 text-lg">TDF/3TC/DTG 400</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="checkbox"
                  name="drug"
                  value="ZDV/3TC/DTG"
                  onChange={handleCheckboxChange}
                  className="form-checkbox text-blue-500 h-4 w-4"
                />
                <span className="ml-2 text-lg">ZDV/3TC/DTG</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="otherDrug"
              className="block text-lg font-medium text-gray-700"
            >
              Other Drug
            </label>
            <input
              type="text"
              id="otherDrug"
              name="otherDrug"
              value={formData.otherDrug}
              onChange={handleChange}
              className="border rounded p-2 w-96 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-row gap-80">
          <div className="mb-4">
            <label
              htmlFor="pillNumber"
              className="block text-lg font-medium text-gray-700"
            >
              Pill Number
            </label>
            <input
              type="number"
              id="pillNumber"
              name="pillNumber"
              value={formData.pillNumber}
              onChange={handleChange}
              className="border rounded p-2 w-96 outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="visitDate"
              className="block text-lg font-medium text-gray-700"
            >
              Visit Date
            </label>
            <input
              type="date"
              id="visitDate"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleChange}
              className="border rounded text-lg p-2 w-96 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-row gap-96">
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              On Time
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="onTime"
                checked={formData.onTime}
                onChange={(e) =>
                  setFormData({ ...formData, onTime: e.target.checked })
                }
                className="form-checkbox text-blue-500 h-4 w-4"
              />
              <span className="ml-2 text-lg">Yes</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                name="onTime"
                onChange={(e) =>
                  setFormData({ ...formData, onTime: !e.target.checked })
                }
                className="form-checkbox text-blue-500 h-4 w-4"
              />
              <span className="ml-2 text-lg">No</span>
            </label>
          </div>
          <div className="mb-4 ml-48">
            <label
              htmlFor="nextAppointmentDate"
              className="block text-lg font-medium text-gray-700"
            >
              Next Appointment Date
            </label>
            <input
              type="date"
              id="nextAppointmentDate"
              name="nextAppointmentDate"
              value={formData.nextAppointmentDate}
              onChange={handleChange}
              className="border rounded text-lg p-2 w-96 outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className=" bg-green-800 text-lg text-white py-2 px-8 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Visit;
