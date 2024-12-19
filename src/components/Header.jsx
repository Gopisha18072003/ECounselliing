import wbjee_logo from "../assets/images/West_Bengal_Joint_Entrance_Examinations_Board_Logo.svg";
import eCounsellingLogo from "../assets/images/e-counselling.png";
export default function Header() {
    const year = new Date().getFullYear();
  return (
    <header className="header flex justify-between items-center h-[12rem] w-full px-[1rem] ">
      <div className="w-1/4 h-full flex items-center">
        <img
          src={wbjee_logo}
          alt="WBJEE Logo"
          className="w-1/3 object-contain"
        />
      </div>

      <div className="w-2/4 flex flex-col justify-center items-center">
        <h1 className="text-h2 font-bold text-center">
          West Bengal Joint Entrance Examinations Board
        </h1>
        <h2 className="text-h4">WBJEE B-Tech Counselling {year}</h2>
      </div>

      <div className="counselling-services w-1/4 flex justify-end items-center">
        <img src={eCounsellingLogo} alt="e-Counselling Services Logo" />
      </div>
    </header>
  );
}
