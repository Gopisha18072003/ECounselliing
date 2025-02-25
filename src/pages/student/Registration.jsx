import Input from "../../components/Input";
import { useState, useActionState, useEffect } from "react";
import Dropdown from "../../components/DropdownInput";
import boardOptions from "../../assets/data/boardOfEducation";
import HorizontalStepper from "../../components/Stepper";
import stateCityData from "../../assets/data/states&city";
import { useInput } from "../../hooks/useInput";
import validators from "../../utils/validators";
import { useRequiredInput } from "../../hooks/useRequieredInput";
import ImageUpload from "../../components/ImageUpload";
import uploadImageToCloudinary from "../../utils/uploadImage";
import CustomCheckbox from "../../components/CustomCheckbox";
import { registerStudent } from "../../utils/http";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { uiActions } from "../../store/uiSlice";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function StudentRegistration() {
  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBOE10, setSelectedBOE10] = useState("");
  const [selectedBOE12, setSelectedBOE12] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [aggremant, setAggremant] = useState({
    verified: false,
    correct: false,
  });

  const steps = [
    "Personal Information",
    "Academics Information",
    "Password Creation",
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function signupAction(prev, formData) {
    const enteredData = {
      studentName: formData.get("fullName"),
      contactNumber: formData.get("contactNumber"),
      address: `${formData.get(
        "streetName"
      )}, ${selectedCity}, ${selectedState}`,
      schoolName: formData.get("schoolName"),
      mailId: formData.get("email"),
      tenthMarks: formData.get("tenthMarks"),
      twelveMarks: formData.get("twelthMarks"),
      erank: formData.get("erank"),
      password: formData.get("password"),
      tenthboard: selectedBOE10,
      twelfthboard: selectedBOE12,
    };
    try {
      // If no errors, proceed with image upload and form submission
      const uploadedImageUrl = await uploadImageToCloudinary(selectedImage);

      const completeFormData = {
        ...enteredData,
        img: uploadedImageUrl,
      };

      const response = await registerStudent(completeFormData);

      // Email already exits
      if (response.statusCode == 201) {
        dispatch(
          uiActions.showSuccessNotification({
            status: "success",
            message: [response.message],
          })
        );
        // dispatch(authActions.login(response.data));
        // localStorage.setItem('user', JSON.stringify(response.data));
        navigate("/login/student");
      } else {
        dispatch(
          uiActions.showErrorNotification({
            status: "fail",
            message: [response.message],
          })
        );
      }
      return { errors: null };
    } catch (error) {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: [error.message],
        })
      );
    }
  }

  const [formState, formAction, isPending] = useActionState(signupAction, {
    errors: null,
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  {
    /* Email, Password and Confirm Password Handlers */
  }
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
    erank: "",
    schoolName: "",
  };
  const requiredFieldsDidEditValues = {
    fullName: false,
    contactNumber: false,
    streetName: false,
    tenthMarks: false,
    twelthMarks: false,
    erank: false,
    schoolName: false,
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
      {/* Main Content */}
      <div className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
        <div className="bg-white shadow-md rounded-lg p-8 w-2/5 my-12">
          <h1 className="text-h3 font-bold text-center mb-6 uppercase">
            Registration Of New Candidate
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
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full text-p disabled:cursor-not-allowed disabled:bg-gray-500"
                disabled={
                  hasErrors.fullName ||
                  hasErrors.contactNumber ||
                  hasErrors.streetName ||
                  hasErrors.email ||
                  !selectedCity ||
                  !selectedState ||
                  !selectedImage ||
                  enteredRequiredValues.contactNumber.length !== 10 ||
                  enteredRequiredValues.fullName.length < 3 ||
                  enteredRequiredValues.streetName.length < 3
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
                value={enteredRequiredValues.erank}
                onChange={(event) => handleInputChange(event, "erank")}
                onBlur={() => handleInputBlur("erank")}
                errorMessage={hasErrors.erank}
              />
              <Input
                name="schoolName"
                id="schoolName"
                label="School Name"
                required
                value={enteredRequiredValues.schoolName}
                onChange={(event) => handleInputChange(event, "schoolName")}
                onBlur={() => handleInputBlur("schoolName")}
                errorMessage={hasErrors.schoolName}
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
                  className="bg-blue-500 text-white text-p px-4 py-2 rounded hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-500"
                  disabled={
                    hasErrors.tenthMarks ||
                    hasErrors.twelthMarks ||
                    hasErrors.erank ||
                    !selectedBOE10 ||
                    !selectedBOE12 ||
                    enteredRequiredValues.tenthMarks < 0 ||
                    enteredRequiredValues.tenthMarks > 100 ||
                    enteredRequiredValues.twelthMarks < 0 ||
                    enteredRequiredValues.twelthMarks > 100 ||
                    enteredRequiredValues.erank < 0 ||
                    !enteredRequiredValues.erank ||
                    !enteredRequiredValues.schoolName
                  }
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
                  className="bg-green-500 text-white text-p px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed flex justify-center items-center w-[6rem]"
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
                    <CircularProgress size="1.5rem" color="white" />
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
