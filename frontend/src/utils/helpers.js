export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('fr-FR');
};

export const calculateDaysRemaining = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const calculateFine = (dueDate, returnDate = null, ratePerDay = 0.5) => {
  // If no return date provided, use current date
  const returnTimestamp = returnDate ? new Date(returnDate).getTime() : new Date().getTime();
  const dueTimestamp = new Date(dueDate).getTime();
  
  // If returned before or on due date, no fine
  if (returnTimestamp <= dueTimestamp) {
    return 0;
  }
  
  // Calculate days overdue
  const daysOverdue = Math.ceil((returnTimestamp - dueTimestamp) / (1000 * 60 * 60 * 24));
  
  // Calculate fine amount
  const fineAmount = daysOverdue * ratePerDay;
  
  return fineAmount;
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getFullName = (user) => {
  if (!user) return '';
  return `${user.firstName} ${user.lastName}`;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  // Password must be at least 8 characters long and contain at least one number, one uppercase letter, and one lowercase letter
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
};

export const validatePhoneNumber = (phoneNumber) => {
  // Simple validation for French phone numbers
  const re = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return re.test(phoneNumber);
};
