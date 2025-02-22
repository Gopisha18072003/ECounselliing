export default function CollegeDetails({data}) {
    return (
        <div className="text-center">
            <img
              src={data?.logo}
              alt="College Logo"
              className="w-24 h-24 mx-auto mb-4 rounded-full"
            />
            <h2 className="text-2xl font-bold">{data?.collegeName}</h2>
            <p className="text-gray-500">{data?.mailId}</p>
            <p className="text-gray-500">
              <span className="font-semibold">NIRF Rank:</span> {data?.nirfRank}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold">Contact:</span>{" "}
              {data?.contactInfo}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold">Address:</span> {data?.address}
            </p>
            <div className="text-start">
              <h3 className="text-xl font-bold mt-4">Departments</h3>
              <table className="w-full border mt-2">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2">Department</th>
                    <th className="border px-4 py-2">Seats</th>
                    <th className="border px-4 py-2">Cutoff Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.departments?.map((dept, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">
                        {dept.departmentName}
                      </td>
                      <td className="border px-4 py-2">{dept.noOfSeats}</td>
                      <td className="border px-4 py-2">{dept.cutoffRank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="font-bold mt-4">
                Total Seats:{" "}
                {data.departments?.reduce(
                  (sum, dept) => sum + dept.noOfSeats,
                  0
                )}
              </p>
            </div>
          </div>
    )
}