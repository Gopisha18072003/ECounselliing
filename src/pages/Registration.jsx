import Header from "../components/Header";
import Footer from "../components/Footer";
import Input from "../components/Input";
import { useState,useActionState } from "react";
import Dropdown from "../components/DropdownInput";
import boardOptions from "../assets/data/boardOfEducation";
import { GoHomeFill } from "react-icons/go";
import HorizontalStepper from "../components/Stepper";
import CheckboxInput from "../components/CheckboxInput";
import stateCityData from "../assets/data/states&city";
import { useInput } from "../hooks/useInput";
import validators from "../utils/validators";
import { useRequiredInput } from "../hooks/useRequieredInput";
import ImageUpload from "../components/ImageUpload";

export default function Registration() {
  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBOE10, setSelectedBOE10] = useState("");
  const [selectedBOE12, setSelectedBOE12] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);


  const uploadImageToCloudinary = async () => {
    if (!selectedImage) {
      throw new Error("No image selected for upload.");
    }

    const uploadData = new FormData();
    uploadData.append("file", selectedImage);
    uploadData.append("upload_preset", "E_Counselling");
    uploadData.append("cloud_name", "dsnqj4rrr");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dsnqj4rrr/image/upload",
        {
          method: "POST",
          body: uploadData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  async function signupAction(prev,formData) {
    try{
      // Step 1: Upload the image to Cloudinary
      const uploadedImageUrl = await uploadImageToCloudinary();

      // Step 2: Add Cloudinary URL to the form data

      const completeFormData = {
        ...Object.fromEntries(formData.entries()),
        imageUrl: uploadedImageUrl,
      };
      console.log(completeFormData);

      // // Step 3: Send form data to the backend
      // const response = await fetch("your_api_endpoint", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(completeFormData),
      // });

    }catch(error){
      console.error("Error uploading image:", error);
    } 
  };
  const [formState, formAction, isPending] = useActionState(signupAction, {});

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  

  

  const {
    value: enteredEmail,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailError,
  } = useInput("", validators.emailValidator);
  const {
    value: enteredPassword,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordError,
  } = useInput("", validators.passwordValidator);
  const {
    value: enteredConfirmPassword,
    handleInputChange: handleConfirmPasswordChange,
    handleInputBlur: handleConfirmPasswordBlur,
    hasError: confirmPasswordError,
  } = useInput("", (confirmPassword) =>
    validators.confirmPasswordValidator(enteredPassword, confirmPassword)
  );

  const requiredFieldsDefaultValues = {
    fullName: "",
    contactNumber: "",
    streetName: "",
    tenthMarks: "",
    twelthMarks: "",
  };
  const requiredFieldsDidEditValues = {
    fullName: false,
    contactNumber: false,
    streetName: false,
    tenthMarks: false,
    twelthMarks: false,
  };

  const {
    values: enteredRequiredValues,
    handleInputChange,
    handleInputBlur,
    hasErrors,
  } = useRequiredInput(
    requiredFieldsDefaultValues,
    requiredFieldsDidEditValues,
    validators.requiredValidator
  );

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity(""); // Reset city when state changes
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };
  const handleBOE10Change = (e) => {
    setSelectedBOE10(e.target.value);
  };
  const handleBOE12Change = (e) => {
    setSelectedBOE12(e.target.value);
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
          <form action={formAction}>
            <div
              className={`transition-transform duration-500 ease-in-out ${
                step === 1 ? " flex flex-col gap-4" : "hidden"
              }`}
            >
              {/* Image Picker */}
              <ImageUpload onImageChange={handleImageChange} previewImage={imagePreview} />
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
                value={enteredRequiredValues.fullName}
                onChange={(event) => handleInputChange(event, "fullName")}
                onBlur={() => handleInputBlur("fullName")}
                errorMessage={hasErrors.fullName}
                required
              />
              <Input
                type="number"
                name="contactNumber"
                id="contactNumber"
                label="Contact Number"
                placeholder="98XXXXXXXX"
                value={enteredRequiredValues.contactNumber}
                onChange={(event) => handleInputChange(event, "contactNumber")}
                onBlur={() => handleInputBlur("contactNumber")}
                errorMessage={hasErrors.contactNumber}
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
                value={enteredRequiredValues.streetName}
                onChange={(event) => handleInputChange(event, "streetName")}
                onBlur={() => handleInputBlur("streetName")}
                errorMessage={hasErrors.streetName}
                required
              />
              <Dropdown
                label="State"
                options={Object.keys(stateCityData)}
                value={selectedState}
                onChange={handleStateChange}
                required
              />
              <Dropdown
                label="City"
                options={selectedState ? stateCityData[selectedState] : []}
                value={selectedCity}
                onChange={handleCityChange}
                required
              />
              <Input
                name="email"
                id="email"
                label="Email"
                placeholder="gopi123@dummy.com"
                value={enteredEmail}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                errorMessage={emailError}
                required
              />
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full text-p disabled:cursor-not-allowed"
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
                value={enteredRequiredValues.tenthMarks}
                onChange={(event) => handleInputChange(event, "tenthMarks")}
                onBlur={() => handleInputBlur("tenthMarks")}
                errorMessage={hasErrors.tenthMarks}
                required
              />

              <Input
                type="number"
                name="passingYear10"
                id="passingYear10"
                label="Year of Passing"
                
                onChange={() => {}}
              />
              <Dropdown
                name="boardOfEducation10"
                id="boardOfEducation10"
                label="Board of Education"
                options={boardOptions}
                value={selectedBOE10}
                onChange={handleBOE10Change}
                required
              />
              <div className="h-1 bg-gray-300"></div>
              <Input
                name="twelthMarks"
                id="twelthMarks"
                label="12th Marks"
                placeholder="In Percentage "
                value={enteredRequiredValues.twelthMarks}
                onChange={(event) => handleInputChange(event, "twelthMarks")}
                onBlur={() => handleInputBlur("twelthMarks")}
                errorMessage={hasErrors.twelthMarks}
                required
              />

              <Input
                type="number"
                name="passingYear12"
                id="passingYear12"
                label="Year of Passing"
                
                onChange={() => {}}
              />
              <Dropdown
                name="boardOfEducation12"
                id="boardOfEducation12"
                label="Board of Education"
                options={boardOptions}
                value={selectedBOE12}
                onChange={handleBOE12Change}
                required
              />
              <div className="h-1 bg-gray-300"></div>
              <Input
                type="number"
                name="erank"
                id="erank"
                label="Rank"
                required
                onChange={() => {}}
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
                value={enteredPassword}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                errorMessage={passwordError}
                required
              />

              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                label="Confirm Password"
                value={enteredConfirmPassword}
                onChange={handleConfirmPasswordChange}
                onBlur={handleConfirmPasswordBlur}
                errorMessage={confirmPasswordError}
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
