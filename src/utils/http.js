const API_BASE_URL = "https://ecounselling-production.up.railway.app/api"; // Replace with your actual API base URL

// Helper function for sending HTTP requests
const sendRequest = async (url, method, body = null, headers = {}) => {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5173",
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `HTTP Error: ${response.status}`);
  }

  return response.json();
};

// Register a student
export const registerStudent = async (studentData) => {
  const url = `${API_BASE_URL}/student/add`;
  return sendRequest(url, "POST", studentData);
};

// Register a college
export const registerCollege = async (collegeData) => {
  const url = `${API_BASE_URL}/college/add`;
  
  return sendRequest(url, "POST", collegeData);
};

// Student login
export const loginStudent = async (loginData) => {
  const url = `${API_BASE_URL}/student/login`;
  return sendRequest(url, "POST", loginData);
};

// College login
export const loginCollege = async (loginData) => {
  const url = `${API_BASE_URL}/college/login`;
  return sendRequest(url, "POST", loginData);
};
// Admin login
export const loginAdmin = async (loginData) => {
  const url = `${API_BASE_URL}/admin/login`;
  return sendRequest(url, "POST", loginData);
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
export const updateStudent = async (studentId, updatedData) => {
  const url = `${API_BASE_URL}/students/${studentId}`;
  return sendRequest(url, "PUT", updatedData);
};

// Update college data
export const updateCollege = async (collegeId, updatedData) => {
  const url = `${API_BASE_URL}/colleges/${collegeId}`;
  return sendRequest(url, "PUT", updatedData);
};

