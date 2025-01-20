export const validateInputs = (formData, extraInputs) => {
    const errors = [];
    const correctEnteredValue = {};
  
    const fullName = formData.get("fullName") || "";
    const contactNumber = formData.get("contactNumber") || "";
    const email = formData.get("email") || "";
    const password = formData.get("password") || "";
    const confirmPassword = formData.get("confirmPassword") || "";
    const erank = formData.get("erank") || "";
    const tenthMarks = formData.get("tenthMarks") || "";
    const twelthMarks = formData.get("twelthMarks") || "";
    const boardOfEducation10 = formData.get("boardOfEducation10") || "";
    const boardOfEducation12 = formData.get("boardOfEducation12") || "";
    const houseNumber = formData.get("houseNumber") || "";
    const streetName = formData.get("streetName") || "";
  
    // Validation logic
    if (!fullName.trim()) {
      errors.push({ field: "fullName", message: "Full name is required." });
    } else {
      correctEnteredValue.fullName = fullName.trim();
    }
  
    const phoneRegex = /^[0-9]{10}$/;
    if (!contactNumber.trim() || !phoneRegex.test(contactNumber)) {
      errors.push({
        field: "contactNumber",
        message: "Enter a valid 10-digit contact number.",
      });
    } else {
      correctEnteredValue.contactNumber = contactNumber.trim();
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      errors.push({ field: "email", message: "Enter a valid email address." });
    } else {
      correctEnteredValue.email = email.trim();
    }
  
    if (!password.trim() || password.length < 6) {
      errors.push({
        field: "password",
        message: "Password must be at least 6 characters long.",
      });
    } else {
      correctEnteredValue.password = password.trim();
    }
  
    if (password !== confirmPassword) {
      errors.push({
        field: "confirmPassword",
        message: "Passwords do not match.",
      });
    } else if (confirmPassword) {
      correctEnteredValue.confirmPassword = confirmPassword.trim();
    }
  
    if (!erank.trim() || isNaN(erank)) {
      errors.push("Enter a valid rank." );
    } else {
      correctEnteredValue.erank = erank.trim();
    }
  
    if (!tenthMarks.trim() || isNaN(tenthMarks)) {
      errors.push("Enter valid 10th marks.");
    } else {
      correctEnteredValue.tenthMarks = tenthMarks.trim();
    }
  
    if (!twelthMarks.trim() || isNaN(twelthMarks)) {
      errors.push("Enter valid 12th marks." );
    } else {
      correctEnteredValue.twelthMarks = twelthMarks.trim();
    }
  
    if (!boardOfEducation10.trim()) {
      errors.push("Enter the 10th board of education.");
    } else {
      correctEnteredValue.boardOfEducation10 = boardOfEducation10.trim();
    }
  
    if (!boardOfEducation12.trim()) {
      errors.push("Enter the 12th board of education.");
    } else {
      correctEnteredValue.boardOfEducation12 = boardOfEducation12.trim();
    }
  
    if (!extraInputs.selectedImage) {
      errors.push("Please upload your image.");
    }
  
    if (!streetName.trim() || !extraInputs.state.trim() || !extraInputs.city.trim()) {
      errors.push("Street name, city, and state are required.");
    } else {
      correctEnteredValue.address = `${houseNumber.trim()} ${streetName.trim()} ${extraInputs.city.trim()} ${extraInputs.state.trim()}`;
    }
  
    return { errors, correctEnteredValue };
  };
  