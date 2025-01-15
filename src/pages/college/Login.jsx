import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Input from "../../components/Input";
import { useInput } from "../../hooks/useInput";
import { GoHomeFill } from "react-icons/go";
import validators from "../../utils/validators";

export default function CollegeLogin() {
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
      <div className="min-h-screen  flex items-center justify-center bg-gray-100 w-full">
        <div className="bg-white shadow-md rounded-l-lg p-8 w-2/5 my-12 h-[24rem]">
          <h1 className="text-h3 font-bold text-center mb-6 uppercase">
            Sign-In for Candidates
          </h1>

          <div className="h-[2rem]"></div>

          <form>
            <div className={`transition-transform duration-500 ease-in-out flex flex-col gap-4`}>
              {/* Login Credentials */}
              {/* Inputs */}
              <Input
                name="applicationId"
                id="applicationId"
                label="Application ID"
                onChange={() => {}}
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

              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full text-p disabled:cursor-not-allowed"
                disabled = {emailError || passwordError}
              >
                Sign-In
              </button>
            </div>
          </form>
          <span className="block text-center w-full mt-2 text-sm">
            Don't have account?
            <a href="#" className="cursor-pointer hover:text-blue-500">
              {" "}
              Register
            </a>
          </span>
        </div>
        <div className="w-2/5 bg-blue-500 text-white rounded-r-lg  h-[24rem] p-4 flex flex-col gap-2">
          <h2 className="text-h3">Important Instructions</h2>
          <div className="h-1 bg-white"></div>
          <ul className="list-disc px-4 text-base">
            <li>
              Confidentiality of Password is solely responsibility of the
              candidate and all care must be taken to protect the password.
            </li>
            <li>
              Candidates are advised to keep changing the Password at frequent
              intervals.
            </li>
            <li>
              Never share your password and do not respond to any mail which
              asks you for your Login-ID/Password.
            </li>
            <li>
              It is strongly recommended that the OTP sent to the applicant for
              any activity like reset password etc. must not be shared with
              anyone.
            </li>
            <li>
              For security reasons, after finishing your work, click the LOGOUT
              button and close all the windows related to your session.
            </li>
          </ul>
        </div>
      </div>
      {/* Footer Section */}
      <Footer />
    </div>
  );
}
