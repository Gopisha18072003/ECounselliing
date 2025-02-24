import eCounsellingLogo from "../assets/images/e-counselling.png";
import SuccessNotification from "./successNotification";
import ErrorNotification from "./ErrorNotification";
import { useSelector } from "react-redux";

export default function Header() {
  const year = new Date().getFullYear();
  const successNotification = useSelector((state) => state.ui.successNotification);
  const errorNotification = useSelector((state) => state.ui.errorNotification);

  return (
    <>
      <header className="bg-blue-600 text-white shadow-md py-6 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Left Empty Space (Can be used for future content) */}
        <div className="md:w-1/4 w-full flex items-center justify-center md:justify-start"></div>

        {/* Center Title Section */}
        <div className="md:w-2/4 w-full flex flex-col justify-center items-center text-center">
          <h1 className="text-2xl md:text-3xl font-bold uppercase">
            Engineering Entrance Examinations Board
          </h1>
          <h2 className="text-lg md:text-xl mt-2 font-semibold">B-Tech Counselling {year}</h2>
        </div>

        {/* Logo Section */}
        <div className="md:w-1/4 w-full flex justify-center md:justify-end mt-4 md:mt-0">
          <img src={eCounsellingLogo} alt="e-Counselling Services Logo" className="h-14 md:h-16" />
        </div>
      </header>

      {/* Notifications */}
      {successNotification && <SuccessNotification message={successNotification.message} />}
      {errorNotification && <ErrorNotification message={errorNotification.message} />}
    </>
  );
}
