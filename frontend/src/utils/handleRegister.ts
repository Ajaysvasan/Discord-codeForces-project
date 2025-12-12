export const validateEmail = (email: string): string | null => {
  if (!email) return "Email is required";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) ? null : "Invalid email format";
};

export const validatePassword = (password: string): string | null => {
  const lowercasePattern = /[a-z]/;
  const uppercasePattern = /[A-Z]/;
  const numberPattern = /[0-9]/;
  const minLength = 8;
  if (!password) return "Enter the password";
  if (password.length < minLength) {
    return "Password must be at least " + minLength + " characters long.";
  }
  if (!lowercasePattern.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!uppercasePattern.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!numberPattern.test(password)) {
    return "Password must contain at least one number.";
  }

  return null;
};
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  const lowercasePattern = /[a-z]/;
  const uppercasePattern = /[A-Z]/;
  const numberPattern = /[0-9]/;
  const minLength = 8;
  if (!password) return "Enter the password";
  if (password.length < minLength) {
    return "Password must be at least " + minLength + " characters long.";
  }
  if (!lowercasePattern.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!uppercasePattern.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!numberPattern.test(password)) {
    return "Password must contain at least one number.";
  }
  if (password != confirmPassword) {
    return "Passwords dont match";
  }
  return null;
};
