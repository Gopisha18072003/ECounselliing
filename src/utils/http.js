const API_BASE_URL = "https://ecounselling-production.up.railway.app/api"; // Replace with your actual API base URL

// Helper function for sending HTTP requests
const sendRequest = async (url, method, body = null, headers = {}) => {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `HTTP Error: ${response.status}`);
  }
  if (response.status == 204) {
    return { statusCode: 204, message: "Deleted Sucessfully" };
  }

  return response.json();
};

// Register a student
export const registerStudent = async (studentData) => {
  const url = `${API_BASE_URL}/public/signup-student`;
  return sendRequest(url, "POST", studentData);
};

// Register a college
export const registerCollege = async (collegeData) => {
  const url = `${API_BASE_URL}/public/signup-college`;
  return sendRequest(url, "POST", collegeData);
};

// Student login
export const loginStudent = async (loginData) => {
  const url = `${API_BASE_URL}/public/login`;
  return sendRequest(url, "POST", loginData);
};

// Get student details
export const getStudentDetails = async () => {
  const storedToken = localStorage.getItem("token"); // Get token from localStorage

  if (!storedToken) {
    throw new Error({
      statusCode: "401",
      message: "No authentication token found",
    });
  }
  const url = `${API_BASE_URL}/student/get-details`;
  return sendRequest(url, "GET", null, {
    Authorization: `Bearer ${storedToken}`, // Attach token as Bearer token
  });
};

// College login
export const loginCollege = async (loginData) => {
  const url = `${API_BASE_URL}/public/login`;
  return sendRequest(url, "POST", loginData);
};
// Get student details
export const getCollegeDetails = async () => {
  const storedToken = localStorage.getItem("token"); // Get token from localStorage

  if (!storedToken) {
    throw new Error({
      statusCode: "401",
      message: "No authentication token found",
    });
  }
  const url = `${API_BASE_URL}/college/get-details`;
  return sendRequest(url, "GET", null, {
    Authorization: `Bearer ${storedToken}`, // Attach token as Bearer token
  });
};

// Admin login
export const loginAdmin = async (loginData) => {
  const url = `${API_BASE_URL}/public/login`;
  return sendRequest(url, "POST", loginData);
};

// Fetch all students
export const fetchAllStudents = async () => {
  const url = `${API_BASE_URL}/admin/all-student`;
  const storedToken = localStorage.getItem("token"); // Get token from localStorage
  if (!storedToken) {
    throw new Error({
      statusCode: "401",
      message: "No authentication token found",
    });
  }
  return sendRequest(url, "GET", null, {
    Authorization: `Bearer ${storedToken}`,
  });
};

// Fetch all colleges
export const fetchAllColleges = async () => {
  const url = `${API_BASE_URL}/admin/all-college`;
  const storedToken = localStorage.getItem("token"); // Get token from localStorage
  if (!storedToken) {
    throw new Error({
      statusCode: "401",
      message: "No authentication token found",
    });
  }
  return sendRequest(url, "GET", null, {
    Authorization: `Bearer ${storedToken}`,
  });
};

// Fetch college details
export const fetchCollegeDetails = async (id) => {
  const url = `${API_BASE_URL}/admin/college-details/${id}`;
  const storedToken = localStorage.getItem("token"); // Get token from localStorage
  if (!storedToken) {
    throw new Error({
      statusCode: "401",
      message: "No authentication token found",
    });
  }
  return sendRequest(url, "GET", null, {
    Authorization: `Bearer ${storedToken}`,
  });
};
export const fetchStudentDetails = async (id) => {
  const url = `${API_BASE_URL}/admin/student-details/${id}`;
  const storedToken = localStorage.getItem("token"); // Get token from localStorage
  if (!storedToken) {
    throw new Error({
      statusCode: "401",
      message: "No authentication token found",
    });
  }
  return sendRequest(url, "GET", null, {
    Authorization: `Bearer ${storedToken}`,
  });
};

// Update student data
export const updateStudent = async (updatedData) => {
  const url = `${API_BASE_URL}/student/update`;
  const storedToken = localStorage.getItem("token"); // Get token from localStorage
  if (!storedToken) {
    throw new Error({
      statusCode: "401",
      message: "No authentication token found",
    });
  }
  return sendRequest(url, "PUT", updatedData, {
    Authorization: `Bearer ${storedToken}`,
  });
};

export const deleteStudent = async () => {
  const url = `${API_BASE_URL}/student/delete`;
  const storedToken = localStorage.getItem("token"); // Get token from localStorage

  if (!storedToken) {
    throw new Error({
      statusCode: "401",
      message: "No authentication token found",
    });
  }
  return sendRequest(url, "DELETE", null, {
    Authorization: `Bearer ${storedToken}`,
  });
};

// Update college data
export const updateCollege = async (updatedData) => {
  const url = `${API_BASE_URL}/college/update`;
  const storedToken = localStorage.getItem("token"); // Get token from localStorage

  if (!storedToken) {
    throw new Error({
      statusCode: "401",
      message: "No authentication token found",
    });
  }
  return sendRequest(url, "PUT", updatedData, {
    Authorization: `Bearer ${storedToken}`,
  });
};

// request otp for password reset for college
export const requestOtpCollege = async (mailId) => {
  const url = `${API_BASE_URL}/college/forgot-password`;
  return sendRequest(url, "POST", { mailId });
};
// validate otp and reset password
export const validateOtpCollege = async (mailId, otp) => {
  const url = `${API_BASE_URL}/college/validate-otp`;
  return sendRequest(url, "POST", { mailId, otp });
};

export const resetPasswordCollege = async (mailId, newPassword) => {
  const url = `${API_BASE_URL}/college/reset-password`;
  return sendRequest(url, "POST", { mailId, newPassword });
};

// request otp for password reset for student
export const requestOtpStudent = async (mailId) => {
  const url = `${API_BASE_URL}/student/forgot-password`;
  return sendRequest(url, "POST", { mailId });
};
// validate otp and reset password
export const validateOtpStudent = async (mailId, otp) => {
  const url = `${API_BASE_URL}/student/validate-otp`;
  return sendRequest(url, "POST", { mailId, otp });
};

export const resetPasswordStudent = async (mailId, newPassword) => {
  const url = `${API_BASE_URL}/student/reset-password`;
  return sendRequest(url, "POST", { mailId, newPassword });
};

export const addDepartment = async (mailId, newDepartment) => {
  const url = `${API_BASE_URL}/college/add-department`;
  const storedToken = localStorage.getItem("token"); // Get token from localStorage

  if (!storedToken) {
    throw new Error({
      statusCode: "401",
      message: "No authentication token found",
    });
  }
  return sendRequest(url, "POST", newDepartment, {
    Authorization: `Bearer ${storedToken}`,
  });
};

// Counselling Process



// 3. Give Allocation Result
export const giveAllocationResult = async () => {
    const url = `${API_BASE_URL}/admin/give-result`;
    const storedToken = localStorage.getItem("token"); // Get token from localStorage
    if(!storedToken){
        throw new Error({
            statusCode: "401",
            message: "No authentication token found"
        })
    }
    return sendRequest(url, "POST", null, {
        Authorization: `Bearer ${storedToken}`
    });
}