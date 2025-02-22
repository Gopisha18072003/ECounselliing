export default function StudentDetails({ data }) {
    return (
      <div className="text-center">
        <img
          src={data?.img}
          alt="Student Profile"
          className="w-24 h-24 mx-auto mb-4 rounded-full object-cover"
        />
        <h2 className="text-2xl font-bold">{data?.studentName}</h2>
        <p className="text-gray-500">{data?.mailId}</p>
        <p className="text-gray-500">
          <span className="font-semibold">Address:</span> {data?.address}
        </p>
        <div className="text-start">
          <h3 className="text-xl font-bold mt-4">Academic Details</h3>
          <table className="w-full border mt-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Exam</th>
                <th className="border px-4 py-2">Marks</th>
                <th className="border px-4 py-2">Board</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">10th</td>
                <td className="border px-4 py-2">{data?.tenthMarks}</td>
                <td className="border px-4 py-2">{data?.tenthboard}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">12th</td>
                <td className="border px-4 py-2">{data?.twelveMarks}</td>
                <td className="border px-4 py-2">{data?.twelfthboard}</td>
              </tr>
            </tbody>
          </table>
          <p className="font-bold mt-4">
            <span className="font-semibold">Rank:</span> {data?.erank}
          </p>
          <p className="font-bold mt-2">
            <span className="font-semibold">School Name:</span> {data?.schoolName}
          </p>
        </div>
      </div>
    );
  }
  