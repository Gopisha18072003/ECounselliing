import { useState } from "react";
import { useSelector } from "react-redux";
import Input from "../../components/Input";
import BasicInformation from "./dashboard/BasicInformtion";
import Accounts from '../college/dashboard/Accounts';
import Counselling from "../college/dashboard/Counselling";
import AddDepartments from "./dashboard/AddDepartments";
export default function CollegeDashboard() {
  const userData = useSelector((state) => state.auth.user);
  const [selectedSection, setSelectedSection] = useState("basicInformation");

  function handleSelectSection(identifier) {
    setSelectedSection(identifier);
  }

  let dashboardComponent = null;
    if(selectedSection == "basicInformation"){
      dashboardComponent = <BasicInformation/>
    }else if(selectedSection == "addDepartments"){
      dashboardComponent = <AddDepartments/>
    }else if(selectedSection == "counsellingProcess") {
      dashboardComponent = <Counselling/>
    }else if(selectedSection == "accounts"){
      dashboardComponent = <Accounts />
    }
  return (
    <>
      <main className="p-6 flex flex-col">
        <div className="w-full">
          <ul className="flex flex-row justify-between items-center text-center rounded-t-lg text-black text-h4 border-b-2 border-gray-200">
            <li
              className={`px-2 py-4 ${
                selectedSection === "basicInformation" ? "border-b-2 border-blue-500" : ""
              }`}
            >
              <button onClick={() => handleSelectSection("basicInformation")}>
                Basic Information
              </button>
            </li>
            <li
              className={`px-2 py-4 ${
                selectedSection === "addDepartments" ? "border-b-2 border-blue-500" : ""
              }`}
            >
              <button onClick={() => handleSelectSection("addDepartments")}>
                Add Department
              </button>
            </li>
            <li
              className={`px-2 py-4 ${
                selectedSection === "counsellingProcess" ? "border-b-2 border-blue-500" : ""
              }`}
            >
              <button onClick={() => handleSelectSection("counsellingProcess")}>
                Counselling Process
              </button>
            </li>
            <li
              className={`px-2 py-4 ${
                selectedSection === "accounts" ? "border-b-2 border-blue-500" : ""
              }`}
            >
              <button onClick={() => handleSelectSection("accounts")}>
                Accounts
              </button>
            </li>
          </ul>
        </div>
        <div className="w-full rounded-b-lg border-2">
          {/* Content for each section goes here */}
          {dashboardComponent}
        </div>
      </main>
    </>
  );
}
