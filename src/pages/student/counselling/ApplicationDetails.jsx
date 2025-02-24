export default function ApplicationDetails({ data }) {
  return (
    <div className="shadow-md p-4 rounded-md bg-white flex flex-col justify-center items-center gap-4">
      <h1 className="text-center text-2xl mb-4 font-semibold">Application Details</h1>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block font-semibold w-[30%]">Student Name</label>
          <input
            type="text"
            name="studentName"
            value={data.studentName}
            disabled
            className="w-[70%] border-2 px-3 py-2 rounded-md bg-gray-100  border-gray-200"
            placeholder="Enter your name"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="block font-semibold w-[30%]">E-Rank</label>
          <input
            type="number"
            name="erank"
            value={data.erank}
            disabled
            className="w-[70%] border-2 px-3 py-2 rounded bg-gray-100  border-gray-200"
            placeholder="Enter your e-rank"
          />
        </div>
        <div>
          <h3 className="font-semibold mt-4 mb-2 text-gray-600 text-[1.3rem]">
            Selected Preferences:
          </h3>
          <div>
            <div className="border p-2 mt-2 rounded">
              {1}. {data.firstPreference.collegeName} -{" "}
              {data.firstPreference.departmentName}
            </div>
            <div className="border p-2 mt-2 rounded">
              {2}. {data.secondPreference.collegeName} -{" "}
              {data.secondPreference.departmentName}
            </div>
            <div className="border p-2 mt-2 rounded">
              {3}. {data.thirdPreference.collegeName} -{" "}
              {data.thirdPreference.departmentName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
