import { useState, useEffect } from "react";

export default function CollegeDepartmentSelector({ collegeData, onSelect, selectedPreferences }) {
    const [selectedCollege, setSelectedCollege] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [availableDepartments, setAvailableDepartments] = useState({});

    useEffect(() => {
        // Function to filter available departments properly
        const getAvailableDepartments = (data, selected) => {
            return Object.entries(data).reduce((acc, [college, departments]) => {
                acc[college] = departments.filter(
                    (dept) => !selected?.some((pref) => pref.college === college && pref.department === dept)
                );
                return acc;
            }, {});
        };

        // Update the filtered departments whenever selectedPreferences change
        setAvailableDepartments(getAvailableDepartments(collegeData, selectedPreferences));
    }, [collegeData, selectedPreferences]);

    const handleCollegeChange = (e) => {
        setSelectedCollege(e.target.value);
        setSelectedDepartment(""); // Reset department when changing college
    };

    const handleDepartmentChange = (e) => {
        setSelectedDepartment(e.target.value);
    };

    const handleAddPreference = () => {
        if (selectedCollege && selectedDepartment) {
            onSelect(selectedCollege, selectedDepartment);
            setSelectedCollege("");
            setSelectedDepartment("");
        }
    };

    return (
        <div className="mt-4">
            <p className="h-1 bg-gray-200"></p>
            <h3 className="font-semibold mt-4 mb-2 text-gray-600 text-[1.3rem]">Select College & Department:</h3>

            <div className="mb-2 w-full flex items-center">
                <label className="block font-semibold w-[30%]">College</label>
                <select value={selectedCollege} onChange={handleCollegeChange} className=" border-2 px-3 py-2 rounded border-gray-200 w-[70%]">
                    <option value="">-- Select College --</option>
                    {Object.keys(availableDepartments).map((college) => (
                        <option key={college} value={college}>
                            {college}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-2 flex items-center">
                <label className="block font-semibold w-[30%]">Department</label>
                <select value={selectedDepartment} onChange={handleDepartmentChange} className=" border-2 px-3 py-2 rounded border-gray-200 w-[70%]" disabled={!selectedCollege}>
                    <option value="">-- Select Department--</option>
                    {selectedCollege &&
                        availableDepartments[selectedCollege]?.map((dept) => (
                            <option key={dept} value={dept}>
                                {dept}
                            </option>
                        ))}
                </select>
            </div>

            <button onClick={handleAddPreference} className="bg-green-500 text-white px-4 py-2 rounded" type="button" disabled={!selectedCollege || !selectedDepartment}>
                Add Preference
            </button>
        </div>
    );
}
