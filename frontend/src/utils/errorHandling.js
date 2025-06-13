/**
 * Utility functions for error handling in API requests
 */

/**
 * Extract error message from API response
 * @param {Error|Response|Object} error - Error object or response
 * @returns {string} Formatted error message
 */
export const extractErrorMessage = (error) => {
  // If it's a fetch Response object
  if (error && error instanceof Response) {
    // Try to parse JSON response if available
    return error.json()
      .then(data => data.message || data.error || `Erreur ${error.status}: ${error.statusText}`)
      .catch(() => `Erreur ${error.status}: ${error.statusText}`);
  }
  
  // If it's an error with a response property (axios-like)
  if (error && error.response) {
    const { response } = error;
    if (response.data) {
      if (typeof response.data === 'string') {
        return response.data;
      }
      return response.data.message || response.data.error || `Erreur ${response.status}: ${response.statusText}`;
    }
    return `Erreur ${response.status}: ${response.statusText}`;
  }
  
  // If it's a regular Error object
  if (error && error.message) {
    return error.message;
  }
  
  // Fallback for unknown error format
  return "Une erreur s'est produite";
};

/**
 * Handle API request errors
 * @param {Error|Response|Object} error - Error object or response
 * @param {Function} errorCallback - Callback to handle the extracted error message
 * @returns {string} Formatted error message
 */
export const handleApiError = async (error, errorCallback = console.error) => {
  let errorMessage;
  
  if (error && error instanceof Response) {
    errorMessage = await extractErrorMessage(error);
  } else {
    errorMessage = extractErrorMessage(error);
  }
  
  if (errorCallback && typeof errorCallback === 'function') {
    errorCallback(errorMessage);
  }
  
  return errorMessage;
};

/**
 * Check if an HTTP status code indicates success
 * @param {number} status - HTTP status code
 * @returns {boolean} True if status is a success code (2xx)
 */
export const isSuccessStatus = (status) => {
  return status >= 200 && status < 300;
};
