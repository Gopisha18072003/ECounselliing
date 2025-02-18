import wbjee_logo from "../assets/images/logo.png";
import eCounsellingLogo from "../assets/images/e-counselling.png";
import SuccessNotification from "./successNotification";
import ErrorNotification from "./ErrorNotification";
import { useSelector } from "react-redux";
export default function Header() {
    const year = new Date().getFullYear();
    const successNotification = useSelector((state) => state.ui.successNotification)
    const errorNotification = useSelector((state) => state.ui.errorNotification)
    const user = useSelector((state) => state.auth.user);
    console.log(user);
  return (
    <>
    <header className="header flex justify-between items-center h-[12rem] w-full px-[1rem] ">
      <div className="w-1/4 h-full flex items-center">
        <img
          src={wbjee_logo}
          alt="WBJEE Logo"
          className="w-[50%] max-w-[150px] object-contain"
        />
      </div>

      <div className="w-2/4 flex flex-col justify-center items-center">
        <h1 className="text-h2 font-bold text-center">
          Engineering Entrance Examinations Board
        </h1>
        <h2 className="text-h4">B-Tech Counselling {year}</h2>
      </div>

      <div className="counselling-services w-1/4 flex justify-end items-center">
        <img src={eCounsellingLogo} alt="e-Counselling Services Logo" />
      </div>
    </header>
    {
      successNotification && <SuccessNotification message={successNotification.message} />
    }
    {
      errorNotification && <ErrorNotification message={errorNotification.message} />
    }
    
    </>
  );
}
