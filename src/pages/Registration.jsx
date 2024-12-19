import Header from "../components/Header";
import Footer from "../components/Footer";
import Input from "../components/Input";
import { useState } from "react";
import Dropdown from "../components/DropdownInput";
import boardOptions from "../assets/data/boardOfEducation";
import { GoHomeFill } from "react-icons/go";
import HorizontalStepper from "../components/Stepper";
import CheckboxInput from "../components/CheckboxInput";
import stateCityData from "../assets/data/states&city";

export default function Registration() {
  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity(''); // Reset city when state changes
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };
  // Move to Next Step
  const nextStep = () => setStep(step + 1);

  // Move to Previous Step
  const prevStep = () => setStep(step - 1);
  return (
    <div className="container">
      {/* Header Section */}
      <Header />

      {/*Nav Bar*/}
      <nav className="h-[2.5rem] w-full bg-blue-500 text-white text-p py-1 px-[1rem]">
        <ul>
          <li>
            <a className="flex items-center cursor-pointer" href="#">
              <GoHomeFill />
              <span className="text-p font-semibold">Home</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen  flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-2/5 my-12">
          <h1 className="text-h3 font-bold text-center mb-6 uppercase">
            Registration Of New Candidate
          </h1>
          <HorizontalStepper activeStep={step - 1} />
          <div className="h-[2rem]"></div>
          <form>
            <div
              className={`transition-transform duration-500 ease-in-out ${
                step === 1 ? " flex flex-col gap-4" : "hidden"
              }`}
            >
              {/* Step 1: Personal Information */}
              {/* <h2 className="text-h4 font-semibold mb-4">
                Step 1: Personal Information
              </h2> */}
              {/* Inputs */}
              <Input
                name="fullName"
                id="fullName"
                label="Full Name"
                placeholder="Gopi Kumar Shaw"
                onChange={() => {}}
                required
              />
              <Input
                type="number"
                name="contactNumber"
                id="contactNumber"
                label="Contact Number"
                placeholder="98XXXXXXXX"
                onChange={() => {}}
                required
                maxLength={10}
              />
              <Input
                type="number"
                name="House Number"
                id="houseNumber"
                label="House Number"
                placeholder="21"
                onChange={() => {}}
              />
              <Input
                name="streetName"
                id="streetName"
                label="Street Name"
                placeholder="Gandhi Marg"
                onChange={() => {}}
                required
              />
              <Dropdown
                label="State"
                options={Object.keys(stateCityData)}
                value={selectedState}
                onChange={handleStateChange}
              />
              <Dropdown
                label="City"
                options={selectedState ? stateCityData[selectedState] : []}
                value={selectedCity}
                onChange={handleCityChange}
              />
              <Input
                name="email"
                id="email"
                label="Email"
                placeholder="gopi123@dummy.com"
                onChange={() => {}}
                required
              />
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full text-p"
              >
                Next
              </button>
            </div>

            <div
              className={`transition-transform duration-500 ease-in-out ${
                step === 2 ? " flex flex-col gap-4 " : "hidden"
              }`}
            >
              {/* Step 2: Academic Information */}
              {/* <h2 className="text-xl font-semibold mb-4">
                Step 2: Academic Information
              </h2> */}
              <Input
                type="number"
                name="tenthMarks"
                id="tenthMarks"
                label="10th Marks"
                placeholder="In Percentage"
                onChange={() => {}}
                required
              />

              <Input
                type="number"
                name="passingYear10"
                id="passingYear10"
                label="Year of Passing"
                placeholder="2019"
                onChange={() => {}}
              />
              <Dropdown
                name="boardOfEducation10"
                id="boardOfEducation10"
                label="Board of Education"
                options={boardOptions}
                required
              />
              <div className="h-1 bg-gray-300"></div>
              <Input
                name="twelthMarks"
                id="twelthMarks"
                label="12th Marks"
                placeholder="In Percentage "
                onChange={() => {}}
                required
              />

              <Input
                type="number"
                name="passingYear12"
                id="passingYear12"
                label="Year of Passing"
                placeholder="2021"
                onChange={() => {}}
              />
              <Dropdown
                name="boardOfEducation12"
                id="boardOfEducation12"
                label="Board of Education"
                options={boardOptions}
                required
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-500 text-white text-p px-4 py-2 rounded hover:bg-gray-600"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-500 text-white text-p px-4 py-2 rounded hover:bg-blue-600"
                >
                  Next
                </button>
              </div>
            </div>

            <div
              className={`transition-transform duration-500 ease-in-out ${
                step === 3 ? " flex flex-col gap-4 " : "hidden"
              }`}
            >
              {/* Step 3: Password Creation */}
              {/* <h2 className="text-xl font-semibold mb-4">
                Step 3: Password Creation
              </h2> */}
              <Input
                type="password"
                name="password"
                id="password"
                label="Password"
                onChange={() => {}}
                required
              />

              <Input
                type="confirmPassword"
                name="confirmPassword"
                id="confirmPassword"
                label="Confirm Password"
                onChange={() => {}}
                required
              />

              <div id="instructions">
                <ul className="text-sm text-gray-500">
                  <li>Your password must be at least 8 characters long.</li>
                  <li>Include both uppercase and lowercase letters.</li>
                  <li>Use at least one numerical digit (0-9).</li>
                  <li>
                    Include at least one special character (e.g., @, #, $, %).
                  </li>
                  <li>
                    Avoid using common words or easily guessable information.
                  </li>
                  <li>Your password should not contain spaces.</li>
                </ul>
              </div>

              <div className="h-1 bg-gray-300"></div>
              <CheckboxInput label="Verified all the informations (You will not able to change it later)" />
              <CheckboxInput label="All the informations provided by you are correct" />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-500 text-white text-p px-4 py-2 rounded hover:bg-gray-600"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white text-p px-4 py-2 rounded hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Footer Section */}
      <Footer />
    </div>
  );
}
