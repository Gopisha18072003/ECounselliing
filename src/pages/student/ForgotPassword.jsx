import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestOtpForm from "./resetPassword/RequestOtpForm";
import ValidateOtpForm from "./resetPassword/ValidateOtpForm";
import ResetPasswordForm from "./resetPassword/ResetPasswordForm";
export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [otpEmail, setOtpEmail] = useState("");
  return (
    <div className="container">
      {/* Main Content */}
      <div className="min-h-screen  flex items-center justify-center bg-gray-100 w-full">
        <div className="bg-white shadow-md rounded-l-lg p-8 w-2/5 my-12 h-[24rem]">
          <h1 className="text-h3 font-bold text-center mb-6 uppercase">
            Reset Password
          </h1>

          <div className="h-[2rem]"></div>

          <div className="h-full">
            {step === 1 && (
              <RequestOtpForm onOtpSent={setOtpEmail} setStep={setStep} />
            )}
            {step === 2 && (
              <ValidateOtpForm otpEmail={otpEmail} setStep={setStep} />
            )}
            {step === 3 && (
              <ResetPasswordForm email={otpEmail} setStep={setStep} />
            )}
          </div>
          
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
                It is strongly recommended that the OTP sent to the applicant
                for any activity like reset password etc. must not be shared
                with anyone.
              </li>
              <li>
                For security reasons, after finishing your work, click the
                LOGOUT button and close all the windows related to your session.
              </li>
            </ul>
          </div>
      </div>
    </div>
  );
}
