import { useEffect } from "react";
import Input from "../../../components/Input";
import { useInput } from "../../../hooks/useInput";
import { useActionState } from "react";
import { requestOtpCollege } from "../../../utils/http";
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
      const response = await requestOtpCollege(mailId);
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

  // Use `useEffect` to update `setStep` after state is updated
  useEffect(() => {
    if (formState?.mailId) {
      setStep(2);
      onOtpSent(formState.mailId);
    }
  }, [formState, setStep, onOtpSent]);

  return (
    <div className="h-2/3 flex flex-col justify-center border-2 rounded-md px-4">
      <h3 className="text-[16px] font-semibold text-gray-600">
        Send OTP to your registered email.
      </h3>
      <div className=" my-4 w-full">
        <form action={sendOtpFormAction} className="w-full">
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
              className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md text-white font-semibold w-[80px]"
              type="submit"
              disabled={sendOtpIsPending}
            >
              {sendOtpIsPending ? (
                <CircularProgress color="white" size={20}  />
              ) : (
                "Send"
              )}
            </button>
            <button
              className="font-semibold"
              onClick={() => navigate('/login/student')}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestOtpForm;
