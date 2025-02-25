import Input from "../../components/Input";
import { useState, useActionState } from "react";
import Dropdown from "../../components/DropdownInput";
import HorizontalStepper from "../../components/Stepper";
import stateCityData from "../../assets/data/states&city";
import { useInput } from "../../hooks/useInput";
import validators from "../../utils/validators";
import { useRequiredInput } from "../../hooks/useRequieredInput";
import ImageUpload from "../../components/ImageUpload";
import uploadImageToS3 from "../../utils/uploadImage";
import DepartmentsInputForm from "../../components/DepartmentsInputForm";
import CustomCheckbox from "../../components/CustomCheckbox";
import { registerCollege } from "../../utils/http";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { uiActions } from "../../store/uiSlice";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
const steps = [
  "Basic Information",
  "Deparetment Information",
  "Password Creation",
];
export default function CollegeRegistration() {
  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [aggremant, setAggremant] = useState({
    verified: false,
    correct: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleAddDepartment({ departmentName, noOfSeats, cutoffRank }) {
    setDepartments([
      ...departments,
      {
        departmentName,
        noOfSeats,
        cutoffRank,
      },
    ]);
  }
  async function signupAction(prev, formData) {
    const enteredData = {
      collegeName: formData.get("collegeName"),
      contactInfo: formData.get("contactNumber"),
      address: `${formData.get(
        "streetName"
      )}, ${selectedCity}, ${selectedState}`,
      nirfRank: formData.get("nirfRank"),
      mailId: formData.get("email"),
      password: enteredPassword,
      status: true,
    };
    try {
      // Step 1: Upload the image to Cloudinary
      const uploadedImageUrl = await uploadImageToS3(selectedImage);

      // Step 2: Add Cloudinary URL to the form data

      const completeFormData = {
        ...enteredData,
        logo: uploadedImageUrl,
        departments,
      };
      const response = await registerCollege(completeFormData);
      if (response.statusCode == 201) {
        dispatch(
          uiActions.showSuccessNotification({
            status: "success",
            message: [response.message],
          })
        );
        // dispatch(authActions.login(response.data));
        // localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/login/college');
      } else {
        dispatch(
          uiActions.showErrorNotification({
            status: "fail",
            message: [response.message],
          })
        );
      }
      return {errors: null};
      
    } catch (error) {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: [error.message],
        })
      );
    }
  }
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
    collegeName: "",
    contactNumber: "",
    streetName: "",
    nirfRank: "",
  };
  const requiredFieldsDidEditValues = {
    collegeName: false,
    contactNumber: false,
    streetName: false,
    nirfRank: false,
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

  // Move to Next Step
  const nextStep = () => setStep(step + 1);

  // Move to Previous Step
  const prevStep = () => setStep(step - 1);

  return (
    <div className="">
      {/* Main Content */}
      <div className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
        <div className="bg-white shadow-md rounded-lg p-8 w-2/5 my-12">
          <h1 className="text-h3 font-bold text-center mb-6 uppercase">
            Registration Of New College
          </h1>
          <HorizontalStepper activeStep={step - 1} steps={steps} />
          <div className="h-[2rem]"></div>
          <form action={formAction}>
            <div
              className={`transition-transform duration-500 ease-in-out ${
                step === 1 ? " flex flex-col gap-4" : "hidden"
              }`}
            >
              {/* Image Picker */}
              <ImageUpload
                onImageChange={handleImageChange}
                previewImage={imagePreview}
              />
              {/* Step 1: Personal Information */}
              {/* <h2 className="text-h4 font-semibold mb-4">
                Step 1: Personal Information
              </h2> */}
              {/* Inputs */}
              <Input
                name="collegeName"
                id="collegeName"
                label="College Name"
                placeholder="ABC Institute of Technology"
                value={enteredRequiredValues.collegeName}
                onChange={(event) => handleInputChange(event, "collegeName")}
                onBlur={() => handleInputBlur("collegeName")}
                errorMessage={hasErrors.collegeName}
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
                placeholder="abc.institute121@gmail.com"
                value={enteredEmail}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                errorMessage={emailError}
                required
              />
              <Input
                type="number"
                name="nirfRank"
                id="nirfRank"
                label="NIRF Rank"
                value={enteredRequiredValues.nirfRank}
                onChange={(event) => handleInputChange(event, "nirfRank")}
                onBlur={() => handleInputBlur("nirfRank")}
                errorMessage={hasErrors.nirfRank}
                required
                maxLength={5}
              />
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full text-p disabled:cursor-not-allowed disabled:bg-gray-500"
                disabled={
                  hasErrors.collegeName ||
                  hasErrors.contactNumber ||
                  hasErrors.streetName ||
                  hasErrors.nirfRank ||
                  selectedImage === null ||
                  selectedCity === "" ||
                  selectedState === "" ||
                  enteredRequiredValues.collegeName === "" ||
                  enteredRequiredValues.contactNumber === "" ||
                  enteredRequiredValues.streetName === "" ||
                  enteredRequiredValues.nirfRank === "" ||
                  enteredEmail === ""
                }
              >
                Next
              </button>
            </div>
            <div
              className={`transition-transform duration-500 ease-in-out ${
                step === 2 ? " flex flex-col gap-4 " : "hidden"
              }`}
            >
              <DepartmentsInputForm
                departments={departments}
                setDepartments={handleAddDepartment}
              />

              <div className="flex justify-between mt-8 border-t-4 border-slate-100 pt-2">
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
                  className="bg-blue-500 text-white text-p px-4 py-2 rounded hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-500"
                  disabled={departments.length === 0}
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
              <CustomCheckbox
                label="Verified all the informations (You will not able to change it later)"
                onChange={() => {
                  setAggremant((prev) => ({
                    ...prev,
                    verified: !prev.verified,
                  }));
                }}
                name="verified"
              />
              <CustomCheckbox
                label="All the informations provided by you are correct"
                onChange={() => {
                  setAggremant((prev) => ({ ...prev, correct: !prev.correct }));
                }}
                name="correct"
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
                  type="submit"
                  className="bg-green-500 text-white text-p px-4 py-2 rounded hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-gray-500 w-[6rem]"
                  disabled={
                    passwordError ||
                    confirmPasswordError ||
                    !enteredPassword ||
                    !enteredConfirmPassword ||
                    aggremant.verified === false ||
                    aggremant.correct === false
                  }
                >
                  {isPending && (
                    <CircularProgress size="1.3rem" color="white" />
                  )}
                  {!isPending && <span>Submit</span>}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
