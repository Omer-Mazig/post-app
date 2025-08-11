import axios from "axios";

/**
 * API client
 * @description API client for the application
 * @returns {AxiosInstance} API client
 */

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// We are using json-server as a mock API server
// So we cannot use the /api prefix
// Add: /api prefix to the baseURL if we decide to use a real API server
export const apiClient = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Dummy delay for development
if (import.meta.env.DEV) {
  apiClient.interceptors.request.use((config) => {
    return new Promise((resolve) => setTimeout(() => resolve(config), 1000));
  });
}

// Global error logger for development
if (import.meta.env.DEV) {
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      // For development, log the error
      if (import.meta.env.DEV) {
        console.error("API Error:", error);
      }
      return Promise.reject(error);
    }
  );
}
