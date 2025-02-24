import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { getEligibleCollegesByRank, submitApplication } from "../../../utils/http.js";
import CollegeDepartmentSelector from "./Dropdown.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../../store/authSlice.js";
import { uiActions } from "../../../store/uiSlice.js";
import { queryClient } from "../../../utils/queryClient.js";

const transformResponse = (response) => {
  const result = {};
  response.forEach(({ departmentName, collegeName }) => {
    if (!result[collegeName]) result[collegeName] = [];
    if (!result[collegeName].includes(departmentName)) result[collegeName].push(departmentName);
  });
  return result;
};

export default function ApplicationForm() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    studentName: user?.studentName || "",
    erank: user?.erank || "",
    preferences: [],
  });

  const [errors, setErrors] = useState({});
  const [collegeData, setCollegeData] = useState({});
  const [availableDepartments, setAvailableDepartments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["eligibleColleges", formData.erank],
    queryFn: () => getEligibleCollegesByRank(formData.erank),
    enabled: !!formData.erank,
  });

  useEffect(() => {
    if (data) {
      const transformedData = transformResponse(data);
      setCollegeData(transformedData);

      const allDepartments = Object.values(transformedData)
        .flat()
        .filter((dept, index, self) => self.indexOf(dept) === index);
      setAvailableDepartments(allDepartments);
    }
  }, [data]);

  useEffect(() => {
    if (isError && error && !isFetching) {
      console.error("Error fetching colleges:", error?.message);
      dispatch(uiActions.showErrorNotification({
        status: "fail",
        message: "Invalid or expired Token. Please login again!",
      }));
      navigate("/login/student");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      dispatch(authActions.logout());
    }
  }, [isError, error, isFetching]);

  const handlePreferenceSelect = (college, department) => {
    setFormData((prev) => {
      if (prev.preferences.some((p) => p.college === college && p.department === department)) return prev;
      return {
        ...prev,
        preferences: [...prev.preferences, { collegeName:college, departmentName: department }],
      };
    });

    setAvailableDepartments((prev) => prev.filter((dept) => dept !== department));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.preferences.length === 0) {
      setErrors({ preferences: "At least one preference is required" });
      return;
    }

    const updatedFormData = {
      ...formData,
      firstPreference: formData.preferences[0] || null,
      secondPreference: formData.preferences[1] || null,
      thirdPreference: formData.preferences[2] || null,
    };

    try {
      setIsSubmitting(true);
      const response = await submitApplication(updatedFormData);
      if (response.statusCode === 200) {
        dispatch(uiActions.showSuccessNotification({
          status: "Success",
          message: response.message,
        }));
        queryClient.invalidateQueries("applicationData");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      dispatch(uiActions.showErrorNotification({
        status: "Error",
        message: error.message || "Something went wrong",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto bg-white p-6 rounded shadow-md w-[600px]">
      <h2 className="text-3xl font-bold text-center mb-4">Application Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block font-semibold w-[30%]">Student Name</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            disabled
            className="w-[70%] border-2 px-3 py-2 rounded-md bg-gray-100 border-gray-200"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="block font-semibold w-[30%]">E-Rank</label>
          <input
            type="number"
            name="erank"
            value={formData.erank}
            disabled
            className="w-[70%] border-2 px-3 py-2 rounded bg-gray-100 border-gray-200"
          />
        </div>

        {isFetching && (
          <div className="flex justify-center">
            <CircularProgress color="primary" />
          </div>
        )}

        {!isFetching && Object.keys(collegeData).length > 0 && (
          <>
            {formData.preferences.length < 3 && (
              <CollegeDepartmentSelector
                collegeData={collegeData}
                onSelect={handlePreferenceSelect}
                availableDepartments={availableDepartments}
              />
            )}

            <div>
              <h3 className="font-semibold mt-4 mb-2 text-gray-600 text-[1.3rem]">
                Selected Preferences:
              </h3>
              {formData.preferences.length > 0 ? (
                formData.preferences.map((pref, index) => (
                  <div key={index} className="border p-2 mt-2 rounded">
                    {index + 1}. {pref.collegeName} - {pref.departmentName}
                  </div>
                ))
              ) : (
                <p className="">No preferences selected yet.</p>
              )}
            </div>
          </>
        )}

        {errors.preferences && <p className="text-red-500 text-sm">{errors.preferences}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={formData.preferences.length === 0 || isSubmitting}
        >
          {isSubmitting ? <CircularProgress color="white" size={18} /> : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
