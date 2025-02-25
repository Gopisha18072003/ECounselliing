import Input from "../../components/Input";
import { useInput } from "../../hooks/useInput";
import validators from "../../utils/validators";
import { Link } from "react-router-dom";
import { useActionState } from "react";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../utils/http";
import { uiActions } from "../../store/uiSlice";
import { authActions } from "../../store/authSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import React from "react";
export default function AdminLogin() {
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

  const dispatch = useDispatch();

  const navigate = useNavigate();

  async function loginAction(prev, formData) {
    const enteredData = {
      mailId: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      // Attempt to log the user in
      // console.log(enteredData);
      const response = await loginAdmin(enteredData);

      // Handle successful login
      if (response.token) {
        localStorage.setItem('token', response.token);
        dispatch(authActions.addToken(response.token));
        localStorage.setItem('user', JSON.stringify({role: 'ADMIN'}));
        dispatch(authActions.login({role: 'ADMIN'}));
        dispatch(
          uiActions.showSuccessNotification({
            status: "success",
            message: ["Login Successful"],
          })
        );
        navigate("/dashboard"); // Redirect to homepage after successful login
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
      // Handle error and show error notification
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: [error.message],
        })
      );
      return { errors: error.message };
    }
  }
  const [formState, formAction, isPending] = useActionState(loginAction, {
    errors: null,
  });
  return (
    <div className="container">
      {/* Main Content */}
      <div className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 w-full">
        <div className="bg-white shadow-md rounded-l-lg p-8 w-2/5 my-12 h-[24rem]">
          <h1 className="text-h3 font-bold text-center mb-6 uppercase">
            Sign-In for Administrator
          </h1>

          <div className="h-[2rem]"></div>

          <form action={formAction}>
            <div
              className={`transition-transform duration-500 ease-in-out flex flex-col gap-4`}
            >
              {/* Login Credentials */}
              {/* Inputs */}
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
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full text-p disabled:cursor-not-allowed disabled:bg-gray-500 flex items-center justify-center"
                disabled={
                  emailError ||
                  passwordError ||
                  !enteredEmail ||
                  !enteredPassword
                }
              >
                {isPending && <CircularProgress color="white" size="1.5rem" />}
                {!isPending && <span>Sign-in</span>}
              </button>
            </div>
          </form>
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
    </div>
  );
}
