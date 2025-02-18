import { useState } from "react";
import { useSelector } from "react-redux";
import BasicInformation from "./dashboard/BasicInformation";
import AcademicInformation from "./dashboard/AcademicInformation";
import Counselling from "./dashboard/Counselling";
import Accounts from "./dashboard/Accounts";

export default function StudentDashboard() {
  const userData = useSelector((state) => state.auth.user);
  const [selectedSection, setSelectedSection] = useState("basicInformation");
  
  function handleSelectSection(identifier) {
    setSelectedSection(identifier);
  }

  let dashboardComponent = null;
  if(selectedSection == "basicInformation"){
    dashboardComponent = <BasicInformation/>
  }else if(selectedSection == "academicInformation"){
    dashboardComponent = <AcademicInformation/>
  }else if(selectedSection == "counsellingProcess") {
    dashboardComponent = <Counselling/>
  }else if(selectedSection == "settings"){
    dashboardComponent = <Accounts />
  }

  return (
    <>
      <main className="p-6 flex flex-col">
        <div className="w-full">
          <ul className="flex flex-row justify-between items-center text-center rounded-t-lg text-black text-h4 border-b-2 border-gray-200">
            <li className={`px-2 py-4 ${selectedSection === "basicInformation" ? "border-b-2 border-blue-500" : ""}`}>
              <button onClick={() => handleSelectSection("basicInformation")}>Basic Information</button>
            </li>
            <li className={`px-2 py-4 ${selectedSection === "academicInformation" ? "border-b-2 border-blue-500" : ""}`}>
              <button onClick={() => handleSelectSection("academicInformation")}>Academic Information</button>
            </li>
            <li className={`px-2 py-4 ${selectedSection === "counsellingProcess" ? "border-b-2 border-blue-500" : ""}`}>
              <button onClick={() => handleSelectSection("counsellingProcess")}>Counselling Process</button>
            </li>
            <li className={`px-2 py-4 ${selectedSection === "settings" ? "border-b-2 border-blue-500" : ""}`}>
              <button onClick={() => handleSelectSection("settings")}>Account Settings</button>
            </li>
          </ul>
        </div>
        <div className="w-full rounded-b-lg border-2 ">
          {/* Content for the selected section */}
          {
            dashboardComponent
          }
        </div>
      </main>
    </>
  );
}
