import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
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
                <TextField
                  id="date"
                  label="Date"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ width: "20rem", p: 1 }}
                />
              </div>
              <div className="flex flex-col">
                <TextField
                  id="prescription_number"
                  label="Prescription Number"
                  placeholder="prescription number"
                  type="text"
                  variant="outlined"
                  sx={{ width: "20rem", p: 1 }}
                />
              </div>
            </div>

            <div className="flex flex-row gap-15">
              <div className="flex flex-col h">
                <Typography variant="subtitle1">Reason to Revisit</Typography>
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

              <div className="flex flex-col ml-10 ">
                <TextField
                  id="weight"
                  label="Weight"
                  placeholder="weight"
                  type="text"
                  variant="outlined"
                  sx={{ width: "20rem", p: 1 }}
                />
              </div>

              <div className="flex flex-col ml-10">
                <TextField
                  id="month_of_supply"
                  label="Month of supply"
                  placeholder="month of supply"
                  type="text"
                  variant="outlined"
                  sx={{ width: "20rem", p: 1 }}
                />
              </div>
            </div>

            <div className="flex flex-row gap-20">
              <div className="flex flex-col gap-0">
                <Typography variant="subtitle1">In/Out Patient</Typography>
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
                <TextField
                  id="prescription_name"
                  label="Prescription Name"
                  placeholder="prescription name"
                  type="text"
                  variant="outlined"
                  sx={{ width: "20rem", p: 1 }}
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

            <div className="flex flex-row gap-10">
              <div className="flex flex-col">
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
              </div>
              <div className="flex flex-col">
                <TextField
                  id="strength"
                  label="Strength"
                  placeholder="strength"
                  type="text"
                  variant="outlined"
                  sx={{ width: "10rem", p: 1 }}
                />
              </div>

              <div className="flex flex-col">
                <TextField
                  id="Quality"
                  label="Quality"
                  placeholder="Quality"
                  type="text"
                  variant="outlined"
                  sx={{ width: "10rem", p: 1 }}
                />
              </div>

              <div className="flex flex-col">
                <TextField
                  id="Brand"
                  label="Brand"
                  placeholder="brand"
                  type="text"
                  variant="outlined"
                  sx={{ width: "10rem", p: 1 }}
                />
              </div>
            </div>

            <div className="flex flex-row gap-20">
              <div className="flex flex-col">
                <div className="flex flex-col pt-6">
                  <TextField
                    id="service_delivery"
                    label="Service Delivery (Other, ASM, FTR, CAG, etc)"
                    placeholder="strength"
                    type="text"
                    variant="outlined"
                    sx={{ width: "24rem", p: 1 }}
                  />
                </div>
              </div>
              <div className="flex flex-col pt-6">
                <TextField
                  id="other_drug_dispensed"
                  label="Other Drugs dispensed"
                  placeholder="Drug dispensed"
                  type="text"
                  variant="outlined"
                  sx={{ width: "24rem", p: 1 }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-center m-5">
          <TextField
            id="nextapt"
            label="Next Appointment"
            type="date"
            variant="outlined"
            sx={{ width: "24rem", p: 1 }}
            InputLabelProps={{
              shrink: true,
            }}
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
