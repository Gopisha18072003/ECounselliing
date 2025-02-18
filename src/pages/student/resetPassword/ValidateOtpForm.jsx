import { useEffect } from "react";
import { validateOtpStudent } from "../../../utils/http"; // API function to validate OTP
import { useActionState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/uiSlice";
import CircularProgress from "@mui/material/CircularProgress";

const ValidateOtpForm = ({ otpEmail, setStep }) => {
  const dispatch = useDispatch();

  async function validateOtpAction(prev, formData) {
    const otp = formData.get("otp");
    try {
      const response = await validateOtpStudent(otpEmail, otp);

      if (response.statusCode === 200) {
        dispatch(
          uiActions.showSuccessNotification({
            status: "success",
            message: [response.message],
          })
        );
        return { success: true };
      }
    } catch (err) {
      dispatch(
        uiActions.showErrorNotification({
          status: "fail",
          message: [err.message] || "Invalid OTP",
        })
      );
    }
    return null;
  }

  const [formState, validateFormAction, validateOtpIsPending] =
    useActionState(validateOtpAction);

  // Use `useEffect` to update `setStep(3)` after validation succeeds
  useEffect(() => {
    if (formState?.success) {
      setStep(3);
    }
  }, [formState, setStep]);

  return (
    <div className="h-2/3 flex flex-col justify-center border-2 rounded-md px-4">
      <h3 className="text-[16px] font-semibold text-gray-600">
        Enter OTP sent to your registered email.
      </h3>
      <form action={validateFormAction}>
        <input
          type="number"
          placeholder="Enter OTP"
          className="border-2 p-2 rounded-md w-full mt-4 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="otp"
          required
        />

        <button
          className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md text-white font-semibold mt-4 w-[110px]"
          type="submit"
          disabled={validateOtpIsPending}
        >
          {validateOtpIsPending ? (
            <CircularProgress color="inherit" size={22} />
          ) : (
            "Validate"
          )}
        </button>
      </form>
    </div>
  );
};

export default ValidateOtpForm;
