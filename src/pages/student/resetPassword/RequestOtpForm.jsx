import { useEffect } from "react";
import Input from "../../../components/Input";
import { useInput } from "../../../hooks/useInput";
import { useActionState } from "react";
import { requestOtpStudent } from "../../../utils/http";
import validators from "../../../utils/validators";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/uiSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const RequestOtpForm = ({ onOtpSent, setStep, cancelForgetPassword }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    value: enteredEmail,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailError,
  } = useInput("", validators.emailValidator);

  async function sendOtpAction(prev, formData) {
    const mailId = formData.get("email");
    try {
      const response = await requestOtpStudent(mailId);
      if (response.statusCode === 200) {
        dispatch(
          uiActions.showSuccessNotification({
            status: "success",
            message: [response.message],
          })
        );
        return { mailId };
      }
    } catch (err) {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: err.message || "Failed to send OTP",
        })
      );
    }
    return null;
  }

  const [formState, sendOtpFormAction, sendOtpIsPending] =
    useActionState(sendOtpAction);

  useEffect(() => {
    if (formState?.mailId) {
      setStep(2);
      onOtpSent(formState.mailId);
    }
  }, [formState, setStep, onOtpSent]);

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700 text-center">
        Send OTP to your registered email
      </h3>
      <form action={sendOtpFormAction} className="mt-4 space-y-4">
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
        <div className="flex justify-between items-center mt-2">
          <button
            className="w-24 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition disabled:bg-gray-400"
            type="submit"
            disabled={sendOtpIsPending}
          >
            {sendOtpIsPending ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Send OTP"
            )}
          </button>
          <button
            className="text-gray-600 hover:text-gray-800 font-semibold transition"
            onClick={() => navigate('/login/student')}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestOtpForm;
