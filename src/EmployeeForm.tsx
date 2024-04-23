import {
  Form,
  Input,
  Button,
  message,
  DatePicker,
  Select,
  Steps,
  Tabs,
} from "antd";
import { Employee } from "../Models/Employee";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import countryList from "../data/countries.json";
import { cities } from "../data/citiesAndSubcities";

const { Step } = Steps;
const { Option } = Select;

const EmployeeForm: React.FC = () => {
  const [form] = Form.useForm();
  const { key } = useParams<{ key: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [EmployeeList] = useState<Employee[]>(() => {
    const storedEmployee = localStorage.getItem("employees");
    return storedEmployee ? JSON.parse(storedEmployee) : [];
  });
  const [countries, setCountries] = useState(() => {
    return countryList.map((country) => country.en_short_name);
  });
  const [nationalities, setNationalities] = useState(() => {
    return countryList.map((country) => country.nationality);
  });
  const [formFields, setFormFields] = useState<Employee>({} as Employee);

  useEffect(() => {
    if (key) {
      setIsEditing(true);
      const storedData = localStorage.getItem("employees");
      let currentEmployee: Employee[] = [];
      if (storedData) {
        currentEmployee = JSON.parse(storedData);
      }
      const initialData = currentEmployee.find(
        (employee) => employee.key === key
      );
      console.log(initialData!.dateOfBirth);
      form.setFieldsValue({
        ...initialData,
        dateOfBirth: null,
      });
    } else {
      form.resetFields();
    }
  }, [form, key]);

  useEffect(() => {
    console.log(EmployeeList);
  }, [EmployeeList]);

  const handleNext = async () => {
    try {
      await form.validateFields();
      setFormFields((prevValues) => {
        return { ...prevValues, ...form.getFieldsValue() };
      });
      setCurrentStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleCountryChange = (country: string) => {
    setFormFields((formValues) => {
      return {
        ...formValues,
        country,
      };
    });
  };
  const handleCityChange = (city: string) => {
    console.log(form.getFieldsValue());
    setFormFields((formValues) => {
      return {
        ...formValues,
        city,
      };
    });
  };
  const onFinish = () => {
    setFormFields((prevValues) => {
      return { ...prevValues, ...form.getFieldsValue() };
    });
    const employeeForm = { ...formFields, ...form.getFieldsValue() };
    const today = new Date();
    const formattedDate = new Intl.DateTimeFormat("en-us", {
      dateStyle: "short",
    });
    const storedData = localStorage.getItem("employees");
    let currentEmployee: Employee[] = [];
    if (storedData) {
      currentEmployee = JSON.parse(storedData);
    }
    if (isEditing) {
      const employeeIndex = currentEmployee.findIndex(
        (employee) => employee.key === key
      );
      currentEmployee.splice(employeeIndex, 1, {
        ...currentEmployee[employeeIndex],
        ...employeeForm,
      });
      localStorage.setItem("employees", JSON.stringify(currentEmployee));
    } else {
      const employeeData: Employee = {
        ...employeeForm,
        registeredCourses: [],
        key: uuidv4(),
        registerDate: formattedDate.format(today),
      };
      const newEmployeeList: Employee[] = [...currentEmployee, employeeData];
      localStorage.setItem("employees", JSON.stringify(newEmployeeList));
    }
    form.resetFields();
    if (isEditing) {
      message.success("Employee information edited successfully!");
    } else {
      message.success("Employee information added successfully!");
    }
    navigate("/employee/display");
  };

  const steps = [
    {
      title: "Personal Information",
      content: (
        <>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please enter your first name",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item label="Middle Name" name="middleName">
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please enter your last name",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Nationality"
            name="nationality"
            rules={[
              {
                required: true,
                message: "Please select your nationality",
              },
            ]}
          >
            <Select size="large" showSearch optionFilterProp="children">
              {nationalities.map((nationality, index) => (
                <Option key={index} value={nationality.toLowerCase()}>
                  {nationality}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dateOfBirth"
            rules={[
              {
                required: true,
                message: "Please select your date of birth",
              },
            ]}
          >
            <DatePicker size="large" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please select your gender",
              },
            ]}
          >
            <Select size="large">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
        </>
      ),
    },
    {
      title: "Contact Information",
      content: (
        <>
          <Form.Item
            label="Phone Number"
            name="phoneNo"
            rules={[
              {
                required: true,
                message: "Please enter your phone number",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Country"
            name="country"
            rules={[
              {
                required: true,
                message: "Please select your country",
              },
            ]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              onChange={handleCountryChange}
            >
              {countries.map((country, index) => (
                <Option key={index} value={country.toLowerCase()}>
                  {country}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {formFields.country !== "ethiopia" && (
            <Form.Item
              label="City"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please enter your city",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          )}
          {formFields.country === "ethiopia" && (
            <Form.Item
              label="City/State"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please enter your city",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                onChange={handleCityChange}
              >
                {Object.keys(cities).map((city, index) => (
                  <Option key={index} value={city}>
                    {city}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {formFields.city !== "Addis Ababa" && (
            <Form.Item label="Subcity" name="subcity">
              <Input size="large" />
            </Form.Item>
          )}
          {formFields.city === "Addis Ababa" && (
            <Form.Item label="Subcity" name="subcity">
              <Select showSearch optionFilterProp="children">
                {cities[formFields.city].map((subcity, index) => (
                  <Option key={index} value={subcity.toLowerCase()}>
                    {subcity}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <Form.Item
            label="Woreda"
            name="woreda"
            rules={[
              {
                required: true,
                message: "Please enter your woreda",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="House No"
            name="houseNo"
            rules={[
              {
                required: true,
                message: "Please enter your house number",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </>
      ),
    },
    // {
    //   title: "Academic Information",
    //   content: (
    //     <>
    //       <Form.Item
    //         label="High School Name"
    //         name="highSchoolName"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please enter your high school name",
    //           },
    //         ]}
    //       >
    //         <Input size="large" />
    //       </Form.Item>
    //       <Form.Item
    //         label="School City"
    //         name="schoolCity"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please enter your school city",
    //           },
    //         ]}
    //       >
    //         <Input size="large" />
    //       </Form.Item>
    //       <Form.Item label="School Subcity" name="schoolSubcity">
    //         <Input size="large" />
    //       </Form.Item>
    //       <Form.Item
    //         label="School Woreda"
    //         name="schoolWoreda"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please enter your school woreda",
    //           },
    //         ]}
    //       >
    //         <Input type="number" />
    //       </Form.Item>
    //       <Form.Item
    //         label="Academic Year"
    //         name="academicYear"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please enter your academic year",
    //           },
    //         ]}
    //       >
    //         <Input size="large" />
    //       </Form.Item>
    //       <Form.Item label="Extra-Curricular Activities" name="exActivity">
    //         <Input.TextArea />
    //       </Form.Item>
    //       <Form.Item
    //         label="College"
    //         name="college"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please enter your college",
    //           },
    //         ]}
    //       >
    //         <Input size="large" />
    //       </Form.Item>
    //       <Form.Item
    //         label="Department"
    //         name="department"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please enter your department",
    //           },
    //         ]}
    //       >
    //         <Input size="large" />
    //       </Form.Item>
    //     </>
    //   ),
    // },
  ];

  return (
    <>
      <h1 className="pt-20 mb-12 text-4xl font-semibold text-center">
        Employee Registration
      </h1>
      <div className="w-3/5 px-10 py-6 mx-auto mt-10 border border-gray-200 shadow-xl rounded-2xl">
        <Steps current={currentStep} className="w-1/2 mx-auto mb-4">
          {steps.map((step) => (
            <Step key={step.title} title={step.title} />
          ))}
        </Steps>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <div className="steps-content">
            <div className="steps-content-inner">
              <div className="grid grid-cols-3 gap-x-6">
                {steps[currentStep].content}
              </div>
            </div>
          </div>
          <div className="mt-4 steps-action ">
            {currentStep > 0 && (
              <Button
                style={{ margin: "0 8px" }}
                onClick={handlePrev}
                className="text-white bg-blue-500"
                size="large"
              >
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button
                type="primary"
                onClick={handleNext}
                className="bg-blue-500"
                size="large"
              >
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button
                className="bg-blue-500"
                type="primary"
                htmlType="submit"
                size="large"
              >
                {isEditing ? "Update" : "Register"} Employee
              </Button>
            )}
          </div>
        </Form>
      </div>
    </>
  );
};

export default EmployeeForm;
