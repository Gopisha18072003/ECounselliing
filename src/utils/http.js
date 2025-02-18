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
  if(response.status == 204) {
    return {statusCode: 204, message: "Deleted Sucessfully"}
  }

  return response.json();
};

// Register a student
export const registerStudent = async (studentData) => {
  const url = `${API_BASE_URL}/public/create-student`;
  return sendRequest(url, "POST", studentData);
};

// Register a college
export const registerCollege = async (collegeData) => {
  const url = `${API_BASE_URL}/public/create-college`;
  return sendRequest(url, "POST", collegeData);
};

// Student login
export const loginStudent = async (loginData) => {
  const url = `${API_BASE_URL}/student/login`;
  const credentials = btoa(`${loginData.mailId}:${loginData.password}`);
  return sendRequest(url, "POST", loginData, {"Authorization": `Basic ${credentials}`});
};

// College login
export const loginCollege = async (loginData) => {
  const url = `${API_BASE_URL}/college/login`;

  const credentials = btoa(`${loginData.mailId}:${loginData.password}`);
  return sendRequest(url, "POST", loginData,{"Authorization": `Basic ${credentials}`});
};
// Admin login
export const loginAdmin = async (loginData) => {
  const url = `${API_BASE_URL}/admin/login`;
  const credentials = btoa(`${loginData.mailId}:${loginData.password}`);
  return sendRequest(url, "POST", loginData, {"Authorization": `Basic ${credentials}`});
};

// Fetch all students
export const fetchAllStudents = async () => {
  const url = `${API_BASE_URL}/student/all`;
  return sendRequest(url, "GET");
};

// Fetch all colleges
export const fetchAllColleges = async () => {
  const url = `${API_BASE_URL}/college/all`;
  return sendRequest(url, "GET");
};

// Update student data
export const updateStudent = async (studentEmailId, updatedData) => {
    const url = `${API_BASE_URL}/student/update`;
    const credentials = btoa(`${updatedData.mailId}:${"India@2021"}`);
  return sendRequest(url, "PUT", updatedData, {"Authorization": `Basic ${credentials}`});
};

export const deleteStudent = async(studentEmailId) => {
    const url = `${API_BASE_URL}/student/delete`;
    const credentials = btoa(`${studentEmailId}:${"India@2021"}`);
    return sendRequest(url, "DELETE", null, {"Authorization": `Basic ${credentials}`})
}

// Update college data
export const updateCollege = async (updatedData) => {
  const url = `${API_BASE_URL}/college/update`;
  const credentials = btoa(`${updatedData.mailId}:${"India@2021"}`);
  return sendRequest(url, "PUT", updatedData, {"Authorization": `Basic ${credentials}`});
};

// request otp for password reset for college
export const requestOtpCollege = async (mailId) => {
    const url = `${API_BASE_URL}/college/forgot-password`;
    return sendRequest(url, "POST", {mailId});
}
// validate otp and reset password
export const validateOtpCollege = async (mailId, otp ) => {
    const url = `${API_BASE_URL}/college/validate-otp`;
    return sendRequest(url, "POST", {mailId, otp});
}

export const resetPasswordCollege = async (mailId, newPassword) => {
    const url = `${API_BASE_URL}/college/reset-password`;
    return sendRequest(url, "POST", {mailId, newPassword});
}

// request otp for password reset for student
export const requestOtpStudent = async (mailId) => {
    const url = `${API_BASE_URL}/student/forgot-password`;
    return sendRequest(url, "POST", {mailId});
}
// validate otp and reset password
export const validateOtpStudent = async (mailId, otp ) => {
    const url = `${API_BASE_URL}/student/validate-otp`;
    return sendRequest(url, "POST", {mailId, otp});
}

export const resetPasswordStudent = async (mailId, newPassword) => {
    const url = `${API_BASE_URL}/student/reset-password`;
    return sendRequest(url, "POST", {mailId, newPassword});
}

export const addDepartment = async (mailId, newDepartment) => {
    const url = `${API_BASE_URL}/college/add-department`;
    const credentials = btoa(`${mailId}:${"India@2021"}`);
    return sendRequest(url, "POST", newDepartment, {"Authorization": `Basic ${credentials}`});
}
