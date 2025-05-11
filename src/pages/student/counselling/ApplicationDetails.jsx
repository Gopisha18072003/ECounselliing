import React from "react";
export default function ApplicationDetails({ data }) {
  return (
    <div className=" w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 flex flex-col overflow-auto">
      <h1 className="text-center text-3xl font-bold text-blue-600 mb-6">
        Application Details
      </h1>

      {/* Student Name */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <label className="font-medium text-gray-700 w-[30%]">
            Student Name
          </label>
          <input
            type="text"
            name="studentName"
            value={data.studentName}
            disabled
            className="w-[70%] border px-4 py-2 rounded-md bg-gray-100 border-gray-300 text-gray-700"
          />
        </div>

        {/* E-Rank */}
        <div className="flex items-center justify-between">
          <label className="font-medium text-gray-700 w-[30%]">E-Rank</label>
          <input
            type="number"
            name="erank"
            value={data.erank}
            disabled
            className="w-[70%] border px-4 py-2 rounded-md bg-gray-100 border-gray-300 text-gray-700"
          />
        </div>
      </div>

      {/* Preferences Section */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 text-xl mb-3">
          Selected Preferences:
        </h3>
        <div className="space-y-3">
          <div className="border border-gray-300 bg-gray-50 px-4 py-2 rounded-md shadow-sm">
            <span className="font-medium text-gray-700">1. </span>
            <span className="text-gray-800">
              {data.firstPreference.collegeName} -{" "}
              {data.firstPreference.departmentName}
            </span>
          </div>
          <div className="border border-gray-300 bg-gray-50 px-4 py-2 rounded-md shadow-sm">
            <span className="font-medium text-gray-700">3. </span>
            {data.secondPreference?.collegeName ? (
              <span className="text-gray-800">
                {data.secondPreference.collegeName} -{" "}
                {data.secondPreference.departmentName}
              </span>
            ) : (
              <span className="text-gray-800">
                -- No Preference selected --
              </span>
            )}
          </div>

          <div className="border border-gray-300 bg-gray-50 px-4 py-2 rounded-md shadow-sm">
            <span className="font-medium text-gray-700">3. </span>
            {data.thirdPreference?.collegeName ? (
              <span className="text-gray-800">
                {data.thirdPreference.collegeName} -{" "}
                {data.thirdPreference.departmentName}
              </span>
            ) : (
              <span className="text-gray-800">
                -- No Preference selected --
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
