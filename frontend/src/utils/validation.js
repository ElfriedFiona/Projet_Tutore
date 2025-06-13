/**
 * Form validation helper functions
 */

// Check if a value is empty
export const isEmpty = value => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

// Email validation
export const isValidEmail = email => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

// Password validation - at least 6 characters, 1 uppercase, 1 lowercase, 1 number
export const isStrongPassword = password => {
  const minLength = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  
  return {
    isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers,
    requirements: {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers
    }
  };
};

// Check if passwords match
export const doPasswordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

// ISBN validation (ISBN-10 or ISBN-13)
export const isValidISBN = isbn => {
  // Remove dashes and spaces
  isbn = isbn.replace(/[-\s]/g, '');
  
  // ISBN-10 check
  if (isbn.length === 10) {
    let sum = 0;
    
    for (let i = 0; i < 9; i++) {
      const digit = parseInt(isbn[i], 10);
      if (isNaN(digit)) return false;
      sum += (10 - i) * digit;
    }
    
    // Check digit can be 'X'
    const lastChar = isbn[9].toUpperCase();
    const lastDigit = lastChar === 'X' ? 10 : parseInt(lastChar, 10);
    if (isNaN(lastDigit) && lastChar !== 'X') return false;
    
    sum += lastDigit;
    
    return sum % 11 === 0;
  }
  
  // ISBN-13 check
  if (isbn.length === 13) {
    let sum = 0;
    
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(isbn[i], 10);
      if (isNaN(digit)) return false;
      sum += (i % 2 === 0 ? digit : digit * 3);
    }
    
    const lastDigit = parseInt(isbn[12], 10);
    if (isNaN(lastDigit)) return false;
    
    return (10 - (sum % 10)) % 10 === lastDigit;
  }
  
  return false;
};

// Date validation
export const isValidDate = date => {
  const dateObj = new Date(date);
  return !isNaN(dateObj.getTime());
};

// Check if a date is in the future
export const isDateInFuture = date => {
  const now = new Date();
  const dateObj = new Date(date);
  return dateObj > now;
};

// Check if a date is in the past
export const isDateInPast = date => {
  const now = new Date();
  const dateObj = new Date(date);
  return dateObj < now;
};

// Phone number validation
export const isValidPhoneNumber = phone => {
  const phoneRegex = /^(\+\d{1,3}\s?)?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/;
  return phoneRegex.test(phone);
};

// Generic form validator
export const validateForm = (formData, validationRules) => {
  const errors = {};
  
  Object.keys(validationRules).forEach(field => {
    const fieldRules = validationRules[field];
    const value = formData[field];
    
    // Required check
    if (fieldRules.required && isEmpty(value)) {
      errors[field] = fieldRules.requiredMessage || `${field} est requis`;
      return;
    }
    
    // Skip other validations if field is empty and not required
    if (isEmpty(value) && !fieldRules.required) {
      return;
    }
    
    // Email validation
    if (fieldRules.isEmail && !isValidEmail(value)) {
      errors[field] = fieldRules.emailMessage || 'Email invalide';
    }
    
    // Minimum length
    if (fieldRules.minLength && value.length < fieldRules.minLength) {
      errors[field] = fieldRules.minLengthMessage || 
        `${field} doit contenir au moins ${fieldRules.minLength} caractères`;
    }
    
    // Maximum length
    if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
      errors[field] = fieldRules.maxLengthMessage || 
        `${field} ne peut pas dépasser ${fieldRules.maxLength} caractères`;
    }
    
    // Pattern validation
    if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
      errors[field] = fieldRules.patternMessage || `${field} est invalide`;
    }
    
    // Custom validation
    if (fieldRules.custom && typeof fieldRules.custom === 'function') {
      const customError = fieldRules.custom(value, formData);
      if (customError) {
        errors[field] = customError;
      }
    }
  });
  
  return errors;
};
