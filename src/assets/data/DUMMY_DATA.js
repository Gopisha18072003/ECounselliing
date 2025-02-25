const studentResponse = {
    statusCode: 200,
    message: "Student registered successfully",
    data: {
      studentName: "John Doe",
      studentId: "STU123456",
      contactNumber: "+1234567890",
      address: "123 Main Street, Springfield, IL",
      tenthboard: "CBSE",
      twelthboard: "ICSE",
      schoolName: "Springfield High School",
      mailId: "johndoe@example.com",
      tenthMarks: 85,
      twelthMarks: 90,
      img: "https://example.com/path/to/student/image.jpg",
      erank: 1500,
      password: "hashedPassword123", // Usually, password should be hashed
      role: "STUDENT"
    }
  };
  const collegeResponse = {
    statusCode: 200,
    message: "College registered successfully",
    data: {
      collegeId: "COL12345",
      collegeName: "Springfield University",
      mailId: "contact@springfielduni.edu",
      password: "hashedPassword456", // Usually, password should be hashed
      address: "456 College Avenue, Springfield, IL",
      contactInfo: "+1234567890",
      nirfRank: 35,
      logo: "https://example.com/path/to/college/logo.jpg",
      role: "COLLEGE",
      departments: [
        { departmentId: "CS", departmentName: "Computer Science" },
        { departmentId: "EE", departmentName: "Electrical Engineering" },
        { departmentId: "ME", departmentName: "Mechanical Engineering" },
        // Add more departments as needed
      ]
    }
  };
export {studentResponse, collegeResponse}    