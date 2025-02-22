import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useActionState } from "react";
import { useDispatch } from "react-redux";
import { resetPasswordCollege } from "../../../utils/http";
import validators from "../../../utils/validators";
import { useInput } from "../../../hooks/useInput";
import Input from "../../../components/Input";
import { uiActions } from "../../../store/uiSlice";
import CircularProgress from "@mui/material/CircularProgress";

const ResetPasswordForm = ({ email, setStep }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function resetPasswordAction(prev, formData) {
    const password = formData.get("password");

    try {
      const response = await resetPasswordCollege(email, password);
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
          message: err.message || "Failed to Reset Password",
        })
      );
    }
    return null;
  }

  const {
    value: enteredNewPassword,
    handleInputChange: handleNewPasswordChange,
    handleInputBlur: handleNewPasswordBlur,
    hasError: newPasswordError,
  } = useInput("", validators.passwordValidator);

  const {
    value: enteredConfirmPassword,
    handleInputChange: handleConfirmPasswordChange,
    handleInputBlur: handleConfirmPasswordBlur,
    hasError: confirmPasswordError,
  } = useInput("", (confirmPassword) =>
    validators.confirmPasswordValidator(enteredNewPassword, confirmPassword)
  );

  const [formState, formAction, isPending] = useActionState(resetPasswordAction);

  useEffect(() => {
    if (formState?.success) {
      setStep(1);
      navigate("/login/college");
    }
  }, [formState, setStep, navigate]);

  return (
    <div className="h-2/3 flex flex-col justify-center border-2 rounded-md px-4">
      <h3 className="text-[16px] font-semibold text-gray-600 mb-4">
        Enter new password
      </h3>
      <form action={formAction} className="flex flex-col gap-2">
        <Input
          type="password"
          name="password"
          id="password"
          label="Password"
          value={enteredNewPassword}
          onChange={handleNewPasswordChange}
          onBlur={handleNewPasswordBlur}
          errorMessage={newPasswordError}
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

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md w-full hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed mt-4"
          disabled={newPasswordError || confirmPasswordError || isPending}
        >
          {isPending ? (
            <CircularProgress color="inherit" size={22} />
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
