import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";

const PDDTF = () => {
  const [checkedStart, setCheckedStart] = useState(false);
  const [checkedRefill, setCheckedRefill] = useState(false);
  const [checkedSwitch, setCheckedSwitch] = useState(false);
  const [checkedStart2, setCheckedStart2] = useState(false);
  const [checkedRefill2, setCheckedRefill2] = useState(false);
  const [checkedYes, setCheckedYes] = useState(false);
  const [checkedNo, setCheckedNo] = useState(false);
  const [checkedAnotherYes, setCheckedAnotherYes] = useState(false);
  const [checkedAnotherNo, setCheckedAnotherNo] = useState(false);

  const [options, setOptions] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });

  const [options2, setOptions2] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });

  const [options3, setOptions3] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });
  const handleChangeStart = (event) => {
    setCheckedStart(event.target.checked);
  };

  const handleChangeRefill = (event) => {
    setCheckedRefill(event.target.checked);
  };

  const handleChangeSwitch = (event) => {
    setCheckedSwitch(event.target.checked);
  };

  const handleChangeStart2 = (event) => {
    setCheckedStart2(event.target.checked);
  };

  const handleChangeRefill2 = (event) => {
    setCheckedRefill2(event.target.checked);
  };

  const handleChangeYes = (event) => {
    setCheckedYes(event.target.checked);
  };

  const handleChangeNo = (event) => {
    setCheckedNo(event.target.checked);
  };

  const handleChangeAnotherYes = (event) => {
    setCheckedAnotherYes(event.target.checked);
  };

  const handleChangeAnotherNo = (event) => {
    setCheckedAnotherNo(event.target.checked);
  };

  const handleOptionChange = (event) => {
    setOptions({ ...options, [event.target.name]: event.target.checked });
  };

  const handleOptionChange2 = (event) => {
    setOptions2({ ...options2, [event.target.name]: event.target.checked });
  };

  const handleOptionChange3 = (event) => {
    setOptions3({ ...options3, [event.target.name]: event.target.checked });
  };

  const handleApply = () => {
    console.log("Applied:", options);
    // Add logic to apply selected options
  };

  const handleClear = () => {
    setOptions({
      option1: false,
      option2: false,
      option3: false,
      option4: false,
    });

    setOptions2({
      option1: false,
      option2: false,
      option3: false,
      option4: false,
    });
    setOptions3({
      option1: false,
      option2: false,
      option3: false,
      option4: false,
    });
  };

  return (
    <div className="flex flex-col mt-0 p-5  mr-20">
      <form action="">
        <div className="flex flex-col mb-5">
          <div>
            <label htmlFor="patientName" className="font-bold">
              Patient Name:{" "}
            </label>
            <TextField id="patientName" label="" variant="standard" />
          </div>
          <div>
            <label htmlFor="atrNumber" className="font-bold">
              ATR Number:{" "}
            </label>
            <TextField id="atrNumber" label="" variant="standard" />
          </div>
        </div>

        <div className="flex flex-row">
          <div className="">
            <div className="flex flex-row gap-52">
              <div className="flex flex-col">
                <label htmlFor="date ">Date</label>
                <input
                  type="date"
                  id="date"
                  className="border rounded w-96 p-2 outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Prescription Number</label>
                <input
                  type="text"
                  placeholder="prescription number"
                  id="prescription_number"
                  className="border rounded p-2 w-96 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-row gap-24">
              <div className="flex flex-col h">
                <h3>Reason to Revisit</h3>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedStart}
                      onChange={handleChangeStart}
                      inputProps={{ "aria-label": "Start checkbox" }}
                    />
                  }
                  label="Start"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedRefill}
                      onChange={handleChangeRefill}
                      inputProps={{ "aria-label": "Refill checkbox" }}
                    />
                  }
                  label="Refill"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedSwitch}
                      onChange={handleChangeSwitch}
                      inputProps={{ "aria-label": "Switch checkbox" }}
                    />
                  }
                  label="Switch"
                />
              </div>

              <div className="flex flex-col ">
                <label htmlFor="">Weight</label>
                <input
                  type="text"
                  placeholder="weight"
                  id="weight"
                  className="border rounded p-2 outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col ml-28">
                <label htmlFor="">Month of supply </label>
                <input
                  type="text"
                  id="month_of_supply"
                  placeholder="month of supply"
                  className="border rounded p-2 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-row gap-20">
              <div className="flex flex-col gap-0">
                <h3>In/Out Patient</h3>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedStart2}
                      onChange={handleChangeStart2}
                      inputProps={{ "aria-label": "Start checkbox" }}
                    />
                  }
                  label="Start"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedRefill2}
                      onChange={handleChangeRefill2}
                      inputProps={{ "aria-label": "Refill checkbox" }}
                    />
                  }
                  label="Refill"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="">Prescription Name</label>
                <input
                  type="text"
                  id="prescription_name"
                  placeholder="prescription name"
                  className="border rounded p-2 outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <h3>TB preventive therapy</h3>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedYes}
                      onChange={handleChangeYes}
                      inputProps={{ "aria-label": "Yes checkbox" }}
                    />
                  }
                  label="Yes"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedNo}
                      onChange={handleChangeNo}
                      inputProps={{ "aria-label": "No checkbox" }}
                    />
                  }
                  label="No"
                />
              </div>

              <div className="flex flex-col">
                <h3>Cotrimoxazole Prophylaxis</h3>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedAnotherYes}
                      onChange={handleChangeAnotherYes}
                      inputProps={{ "aria-label": "Another Yes checkbox" }}
                    />
                  }
                  label="Another Yes"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedAnotherNo}
                      onChange={handleChangeAnotherNo}
                      inputProps={{ "aria-label": "Another No checkbox" }}
                    />
                  }
                  label="Another No"
                />
              </div>
            </div>

            <div className="flex flex-row gap-20">
              <div className="flex flex-col">
                <h2 className="font-bold">Drug one</h2>
                <h3>Drug Name</h3>

                <FormControl>
                  <InputLabel>Select Options</InputLabel>
                  <Select
                    multiple
                    value={Object.keys(options).filter((key) => options[key])}
                    onChange={handleOptionChange}
                    renderValue={(selected) => {
                      const drugNames = {
                        option1: "TDF/3TC/DTG",
                        option2: "TDF/3TC/DTG 600",
                        option3: "TDF/3TC/DTG 400",
                        option4: "ZDV/3TC/DTG",
                      };
                      return selected
                        .map((value) => drugNames[value])
                        .join(", ");
                    }}
                    className="w-72"
                  >
                    <MenuItem value="option1">
                      <Checkbox
                        checked={options.option1}
                        onChange={handleOptionChange}
                        name="option1"
                      />
                      TDF/3TC/DTG
                    </MenuItem>
                    <MenuItem value="option2">
                      <Checkbox
                        checked={options.option2}
                        onChange={handleOptionChange}
                        name="option2"
                      />
                      TDF/3TC/DTG 600
                    </MenuItem>
                    <MenuItem value="option3">
                      <Checkbox
                        checked={options.option3}
                        onChange={handleOptionChange}
                        name="option3"
                      />
                      TDF/3TC/DTG 400
                    </MenuItem>
                    <MenuItem value="option4">
                      <Checkbox
                        checked={options.option4}
                        onChange={handleOptionChange}
                        name="option4"
                      />
                      ZDV/3TC/DTG
                    </MenuItem>
                    <div className="flex flex-row">
                      <MenuItem>
                        <Button variant="contained" onClick={handleApply}>
                          Apply
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button variant="contained" onClick={handleClear}>
                          Clear
                        </Button>
                      </MenuItem>
                    </div>
                  </Select>
                </FormControl>

                <div className="flex flex-col">
                  <label htmlFor="">strength </label>
                  <input
                    type="text"
                    id="strength"
                    placeholder="strength"
                    className="border rounded p-2 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="">Quality </label>
                  <input
                    type="text"
                    id="Quality"
                    placeholder="Quality"
                    className="border rounded p-2 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="">Brand </label>
                  <input
                    type="text"
                    id="Brand"
                    placeholder="brand"
                    className="border rounded p-2 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <h2 className="font-bold">Drug two</h2>
                <h3>Drug Name</h3>
                <FormControl>
                  <InputLabel>Select Options</InputLabel>
                  <Select
                    multiple
                    value={Object.keys(options2).filter((key) => options2[key])}
                    onChange={handleOptionChange2}
                    renderValue={(selected) => {
                      const drugNames = {
                        option1: "TDF/3TC/DTG",
                        option2: "TDF/3TC/DTG 600",
                        option3: "TDF/3TC/DTG 400",
                        option4: "ZDV/3TC/DTG",
                      };
                      return selected
                        .map((value) => drugNames[value])
                        .join(", ");
                    }}
                    className="w-72"
                  >
                    <MenuItem value="option1">
                      <Checkbox
                        checked={options.option1}
                        onChange={handleOptionChange}
                        name="option1"
                      />
                      TDF/3TC/DTG
                    </MenuItem>
                    <MenuItem value="option2">
                      <Checkbox
                        checked={options.option2}
                        onChange={handleOptionChange}
                        name="option2"
                      />
                      TDF/3TC/DTG 600
                    </MenuItem>
                    <MenuItem value="option3">
                      <Checkbox
                        checked={options.option3}
                        onChange={handleOptionChange}
                        name="option3"
                      />
                      TDF/3TC/DTG 400
                    </MenuItem>
                    <MenuItem value="option4">
                      <Checkbox
                        checked={options.option4}
                        onChange={handleOptionChange}
                        name="option4"
                      />
                      ZDV/3TC/DTG
                    </MenuItem>
                    <div className="flex flex-row">
                      <MenuItem>
                        <Button variant="contained" onClick={handleApply}>
                          Apply
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button variant="contained" onClick={handleClear}>
                          Clear
                        </Button>
                      </MenuItem>
                    </div>
                  </Select>
                </FormControl>
                <div className="flex flex-col">
                  <label htmlFor="">strength </label>
                  <input
                    type="text"
                    id="strength"
                    placeholder="strength"
                    className="border rounded p-2 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="">Quality </label>
                  <input
                    type="text"
                    id="Quality"
                    placeholder="Quality"
                    className="border rounded p-2 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="">Brand </label>
                  <input
                    type="text"
                    id="Brand"
                    placeholder="brand"
                    className="border rounded p-2 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <h2 className="font-bold">Drug three</h2>
                <h3>Drug Name </h3>
                <FormControl>
                  <InputLabel>Select Options</InputLabel>
                  <Select
                    multiple
                    value={Object.keys(options3).filter((key) => options3[key])}
                    onChange={handleOptionChange3}
                    renderValue={(selected) => {
                      const drugNames = {
                        option1: "TDF/3TC/DTG",
                        option2: "TDF/3TC/DTG 600",
                        option3: "TDF/3TC/DTG 400",
                        option4: "ZDV/3TC/DTG",
                      };
                      return selected
                        .map((value) => drugNames[value])
                        .join(", ");
                    }}
                    className="w-72"
                  >
                    <MenuItem value="option1" className="h-10">
                      <Checkbox
                        checked={options.option1}
                        onChange={handleOptionChange}
                        name="option1"
                      />
                      TDF/3TC/DTG
                    </MenuItem>
                    <MenuItem value="option2">
                      <Checkbox
                        checked={options.option2}
                        onChange={handleOptionChange}
                        name="option2"
                      />
                      TDF/3TC/DTG 600
                    </MenuItem>
                    <MenuItem value="option3">
                      <Checkbox
                        checked={options.option3}
                        onChange={handleOptionChange}
                        name="option3"
                      />
                      TDF/3TC/DTG 400
                    </MenuItem>
                    <MenuItem value="option4">
                      <Checkbox
                        checked={options.option4}
                        onChange={handleOptionChange}
                        name="option4"
                      />
                      ZDV/3TC/DTG
                    </MenuItem>
                    <div className="flex flex-row">
                      <MenuItem>
                        <Button variant="contained" onClick={handleApply}>
                          Apply
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button variant="contained" onClick={handleClear}>
                          Clear
                        </Button>
                      </MenuItem>
                    </div>
                  </Select>
                </FormControl>
                <div className="flex flex-col">
                  <label htmlFor="">strength </label>
                  <input
                    type="text"
                    id="strength"
                    placeholder="strength"
                    className="border rounded p-2 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="">Quality </label>
                  <input
                    type="text"
                    id="Quality"
                    placeholder="Quality"
                    className="border rounded p-2 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="">Brand </label>
                  <input
                    type="text"
                    id="Brand"
                    placeholder="brand"
                    className="border rounded p-2 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-20">
              <div className="flex flex-col">
                <div className="flex flex-col pt-6">
                  <label htmlFor="">
                    Service Delivery(Other, ASM, FTR,CAG,etc){" "}
                  </label>
                  <input
                    type="text"
                    placeholder="strength"
                    id="service_delivery"
                    className="border rounded p-2 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-col pt-6">
                <label htmlFor="">Other Drugs dispensed</label>
                <input
                  type="text"
                  placeholder="Drug dispensed"
                  id="other_drug_dispensed"
                  className="border rounded p-2 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-center ">
          <h2 className="font-bold">Next Appointment</h2>
        </div>
        <div className="flex flex-row justify-center ">
          <input
            type="date"
            id="nextapt"
            className="border rounded w-96 p-2 outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-row justify-center mt-5">
          <button className="bg-green-800 text-white py-2 px-8 rounded-md">
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default PDDTF;
