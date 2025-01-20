import { useState } from "react";
import { useSelector } from "react-redux";
import Input from "../../components/Input";
import AllColleges from '../administration/dashboard/AllColleges'
import AllStudents from '../administration/dashboard/AllStudents'
import AddNotices from '../administration/dashboard/AddNotices'
import Accounts from '../administration/dashboard/Accounts';
import Counselling from "../administration/dashboard/CounsellingProcess";
export default function CollegeDashboard() {
  const userData = useSelector((state) => state.auth.user);
  const [selectedSection, setSelectedSection] = useState("participatedColleges");

  function handleSelectSection(identifier) {
    setSelectedSection(identifier);
  }

  let dashboardComponent = null;
    if(selectedSection == "participatedColleges"){
      dashboardComponent = <AllColleges/>
    }else if(selectedSection == "participatedStudents"){
      dashboardComponent = <AllStudents/>
    }else if(selectedSection == "addNotices"){
      dashboardComponent = <AddNotices/>
    }
    else if(selectedSection == "counsellingProcess") {
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
                selectedSection === "participatedColleges" ? "border-b-2 border-blue-500" : ""
              }`}
            >
              <button onClick={() => handleSelectSection("participatedColleges")}>
                Participated Colleges
              </button>
            </li>
            <li
              className={`px-2 py-4 ${
                selectedSection === "participatedStudents" ? "border-b-2 border-blue-500" : ""
              }`}
            >
              <button onClick={() => handleSelectSection("participatedStudents")}>
                Participated Students
              </button>
            </li>
            <li
              className={`px-2 py-4 ${
                selectedSection === "addNotices" ? "border-b-2 border-blue-500" : ""
              }`}
            >
              <button onClick={() => handleSelectSection("addNotices")}>
                Add Notices
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
