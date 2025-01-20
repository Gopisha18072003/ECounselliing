const validators = {
  /**
   * Validates an email address.
   * @param {string} email - The email address to validate.
   * @returns {string|null} - Error message if invalid, otherwise null.
   */
  emailValidator: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required.";
    if (!emailRegex.test(email)) return "Invalid email format.";
    return null;
  },

  /**
   * Validates a password.
   * @param {string} password - The password to validate.
   * @returns {string|null} - Error message if invalid, otherwise null.
   */
  passwordValidator: (password) => {
    const minLength = 8;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!password) return "Password is required.";
    if (password.length < minLength)
      return `Password must be at least ${minLength} characters long.`;
    if (!passwordRegex.test(password))
      return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    return null;
  },

  /**
   * Validates confirm password input.
   * @param {string} password - The original password.
   * @param {string} confirmPassword - The password to confirm.
   * @returns {string|null} - Error message if invalid, otherwise null.
   */
  confirmPasswordValidator: (password, confirmPassword) => {
    if (!confirmPassword) return "Confirm Password is required.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return null;
  },

  requiredValidator: (fieldValues, didEditValues) => {
    const validationResult = {};
  
    for (let key in fieldValues) {
      if (Object.hasOwn(fieldValues, key)) {
        const value = fieldValues[key]?.trim(); // Trim the value to remove extra spaces
        validationResult[key] =
          (!value && didEditValues[key]) ? "This field is required" : null;
      }
    }
  
    return validationResult;
  },

  checkError : (validationResults) => {
        console.log(validationResults)
        let hasError = false;
        for (let key in validationResults) {
            if (validationResults[key]) {
                hasError = true
                return hasError
            }
        }
        return hasError
  }
};

export default validators;
